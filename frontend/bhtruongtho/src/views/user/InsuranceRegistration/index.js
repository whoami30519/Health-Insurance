import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";
// Import only the necessary API function
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
    KH_post_DonDangKy,
    getBenhByMaGBH,
    getGoiBHByMaGBH,
} from "../../../api/connect";
import { useSnackbar } from "../../../context/SnackbarContext";

const InsuranceRegistration = () => {
    const { openSnackbar } = useSnackbar();
    const params = useParams();
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [duration, setDuration] = useState("");
    const [paymentFrequency, setPaymentFrequency] = useState("");
    const [insuranceAmount, setInsuranceAmount] = useState("");
    const [startDate, setStartDate] = useState(dayjs());
    const [selectedBenhs, setSelectedBenhs] = useState([]);
    const [benhData, setBenhData] = useState([]);

    const handleCheckboxChange = (MaBenh) => {
        setSelectedBenhs((prevSelectedBenhs) => {
            if (prevSelectedBenhs.includes(MaBenh)) {
                // If the checkbox is already checked, remove it
                return prevSelectedBenhs.filter((id) => id !== MaBenh);
            } else {
                // If the checkbox is not checked, add it
                return [...prevSelectedBenhs, MaBenh];
            }
        });
    };
    const handleSeverityChange = (MaBenh, TinhTrang) => {
        setSelectedBenhs((prevSelectedBenhs) => {
            const updatedSelectedBenhs = [...prevSelectedBenhs];
            const index = updatedSelectedBenhs.findIndex(
                (item) => item.MaBenh === MaBenh
            );

            if (index !== -1) {
                // If the disease is already selected
                if (TinhTrang === "Cancel") {
                    // If "Cancel" is selected, remove the disease from the list
                    updatedSelectedBenhs.splice(index, 1);
                } else {
                    // Update the TinhTrang level
                    updatedSelectedBenhs[index].TinhTrang = TinhTrang;
                }
            } else {
                // If the disease is not selected and "Cancel" is not chosen, add it with the selected TinhTrang
                if (TinhTrang !== "Cancel") {
                    updatedSelectedBenhs.push({ MaBenh, TinhTrang });
                }
            }

            return updatedSelectedBenhs;
        });
    };
    const fetchDataBenh = async () => {
        try {
            const response = await getBenhByMaGBH(params.id);
            setBenhData(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchDataGoiBH = async () => {
        try {
            const response = await getGoiBHByMaGBH(params.id);
            setSelectedPackage(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchDataBenh();
        fetchDataGoiBH();
    }, [params.id]); // Fetch data whenever params.id changes

    useEffect(() => {
        if (selectedPackage && duration && paymentFrequency) {
            const calculatedAmount = selectedPackage.gia / paymentFrequency;
            setInsuranceAmount(calculatedAmount);
            calculateTotalAmount();
        }
    }, [selectedPackage, duration, paymentFrequency]);
    const calculateTotalAmount = () => {
        if (selectedPackage && duration) {
            return (selectedPackage.gia * parseInt(duration, 10)).toString();
        }
        return "";
    };

    // Khi nhấn nút đăng ký
    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        const currentDate = dayjs();
        const allowedStartDate = currentDate.add(1, "month");

        if (startDate.isAfter(allowedStartDate)) {
            openSnackbar(
                "Ngày bắt đầu gói không quá 1 tháng kể từ thời điểm hiện tại",
                "error"
            );
            return;
        }

        var HoaDonList = calculatePaymentDetails(
            insuranceAmount,
            duration,
            paymentFrequency,
            startDate
        );
        // console.log(HoaDonList);

        var data_DonDangKy = {
            MaGoiBH: selectedPackage.maGoiBH,
            ThoiGianDK: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"), //getdate,
            ThoiGianBD: dayjs(startDate).format("YYYY-MM-DD"),
            ThoiGianHetHan: dayjs(startDate)
                .add(duration, "year")
                .format("YYYY-MM-DD"),
            TinhTrang: "Chờ duyệt",
            TongGia: calculateTotalAmount(),
            SoKyHanThanhToan: duration * paymentFrequency,
            benh: selectedBenhs,
        };
        console.log(data_DonDangKy);
        // console.log(selectedBenhs);

        call_API_post_DonDangKy(localStorage.getItem("token"), data_DonDangKy);
    };

    const call_API_post_DonDangKy = async (token, data) => {
        try {
            const response = await KH_post_DonDangKy(token, data);
            openSnackbar(response, "success");
        } catch (error) {
            // console.error("Error sending request:", error.message);
            openSnackbar(error.message, "error");
        }
    };

    const calculatePaymentDetails = (
        insuranceAmount,
        durationInYears,
        paymentFrequency,
        startDate
    ) => {
        const numberOfPayments = durationInYears * paymentFrequency;
        const monthsInYear = 12;

        const paymentDetails = [];

        for (let i = 1; i <= numberOfPayments; i++) {
            const hanKy = `${i}/${numberOfPayments}`;
            // Tính thời gian hết hạn của từng kỳ hạn
            const thoiGianHetHan = dayjs(startDate)
                .add(i * (monthsInYear / paymentFrequency), "month")
                .format();
            const paymentDetail = {
                SoTien: insuranceAmount,
                HanKy: hanKy,
                TinhTrangThanhToan: "Chưa thanh toán",
                ThoiGianHetHan: thoiGianHetHan,
            };

            paymentDetails.push(paymentDetail);
        }

        return paymentDetails;
    };

    const calculateEndDate = (startDate, duration) => {
        const endDate = dayjs(startDate).add(duration, "year");
        return endDate.format("DD/MM/YYYY");
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "50px 0px 20px 0px" }}
            >
                <Typography component="h1" variant="h5">
                    Đăng ký gói bảo hiểm
                </Typography>
                <form onSubmit={handleRegistrationSubmit}>
                    {selectedPackage ? (
                        <>
                            <Typography variant="subtitle1">
                                Thông tin gói bảo hiểm đã chọn:
                            </Typography>
                            <Typography variant="body1">
                                Tên gói bảo hiểm: {selectedPackage.tenGoiBH}
                            </Typography>
                            <Typography variant="body1">
                                Mô tả: {selectedPackage.motaGoiBH}
                            </Typography>
                            <Typography variant="body1">
                                Giá cơ bản: {selectedPackage.gia}đ
                            </Typography>
                            <Typography variant="body1">
                                Tỉ lệ hoàn tiền: {selectedPackage.tiLeHoanTien}%
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl
                                        fullWidth
                                        style={{ marginTop: "20px" }}
                                    >
                                        <InputLabel id="duration-label">
                                            Thời hạn (năm)
                                        </InputLabel>
                                        <Select
                                            labelId="duration-label"
                                            label="Thời hạn (năm)"
                                            id="duration"
                                            value={duration}
                                            onChange={(e) =>
                                                setDuration(e.target.value)
                                            }
                                            required
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            {/* Thêm các giá trị khác nếu cần */}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl
                                        fullWidth
                                        style={{ marginTop: "20px" }}
                                    >
                                        <InputLabel id="payment-frequency-label">
                                            Số kỳ hạn mỗi năm
                                        </InputLabel>
                                        <Select
                                            labelId="payment-frequency-label"
                                            label="Số kỳ hạn mỗi năm"
                                            id="payment-frequency"
                                            value={paymentFrequency}
                                            onChange={(e) =>
                                                setPaymentFrequency(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            {/* Thêm các giá trị khác nếu cần */}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* chọn ngày */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <FormControl
                                            fullWidth
                                            style={{ marginTop: "20px" }}
                                        >
                                            <InputLabel id="start-date-label"></InputLabel>
                                            <DatePicker
                                                label="Ngày bắt đầu sử dụng bảo hiểm"
                                                value={startDate}
                                                onChange={(date) =>
                                                    setStartDate(date)
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                    />
                                                )}
                                                format="DD/MM/YYYY"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl
                                            fullWidth
                                            style={{ marginTop: "20px" }}
                                        >
                                            <InputLabel id="end-date-label"></InputLabel>
                                            <TextField
                                                label="Ngày kết thúc sử dụng bảo hiểm"
                                                id="end-date"
                                                value={calculateEndDate(
                                                    startDate,
                                                    duration
                                                )}
                                                fullWidth
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </LocalizationProvider>

                            <FormControl
                                fullWidth
                                style={{ marginTop: "20px" }}
                            >
                                <InputLabel id="insurance-amount-label"></InputLabel>
                                <TextField
                                    id="insurance-amount"
                                    label="Giá mỗi kỳ hạn (đ)"
                                    type="number"
                                    value={insuranceAmount}
                                    onChange={(e) =>
                                        setInsuranceAmount(e.target.value)
                                    }
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                style={{ marginTop: "20px" }}
                            >
                                <InputLabel id="total-amount-label" />
                                <TextField
                                    id="total-amount"
                                    label="Tổng tiền"
                                    type="text"
                                    value={calculateTotalAmount()}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                />
                            </FormControl>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tên bệnh</TableCell>
                                            <TableCell>Mô tả</TableCell>
                                            <TableCell
                                                style={{ width: "135px" }}
                                            >
                                                Mức độ bệnh
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {benhData.map((benh) => (
                                            <TableRow key={benh.id}>
                                                <TableCell>
                                                    {benh.tenBenh}
                                                </TableCell>
                                                <TableCell>
                                                    {benh.moTa}
                                                </TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <InputLabel
                                                            id={`severity-label-${benh.maBenh}`}
                                                        >
                                                            Chọn
                                                        </InputLabel>
                                                        <Select
                                                            labelId={`severity-label-${benh.maBenh}`}
                                                            label="Chọn"
                                                            value={
                                                                selectedBenhs.find(
                                                                    (item) =>
                                                                        item.MaBenh ===
                                                                        benh.maBenh
                                                                )?.TinhTrang ||
                                                                ""
                                                            }
                                                            onChange={(e) =>
                                                                handleSeverityChange(
                                                                    benh.maBenh,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <MenuItem
                                                                value={"Cancel"}
                                                            >
                                                                Huỷ chọn
                                                            </MenuItem>
                                                            <MenuItem
                                                                value={"Nhẹ"}
                                                            >
                                                                Nhẹ
                                                            </MenuItem>
                                                            <MenuItem
                                                                value={"Vừa"}
                                                            >
                                                                Vừa
                                                            </MenuItem>
                                                            <MenuItem
                                                                value={"Nặng"}
                                                            >
                                                                Nặng
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: "20px" }}
                            >
                                Đăng ký
                            </Button>
                            <Button
                                color="primary"
                                fullWidth
                                style={{ marginTop: "20px" }}
                                component={Link}
                                to={`/${ROUTERS.USER.PRODUCT}/detail/${params.id}`}
                            >
                                <p>Quay lại</p>
                            </Button>
                        </>
                    ) : (
                        <Typography variant="body1">
                            Đang tải thông tin gói bảo hiểm...
                        </Typography>
                    )}
                </form>
            </Paper>
        </Container>
    );
};

export default InsuranceRegistration;
