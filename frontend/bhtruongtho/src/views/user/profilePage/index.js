import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
    getKhachHangInformation,
    getUserInfoByToken,
    updateKhachHangInformation,
} from "../../../api/connect";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useUser } from "../../../context/UserContext";

// ... (imports)

const ChangeInformation = () => {
    const { login } = useUser(); // Assuming this provides the user data
    const { openSnackbar } = useSnackbar();
    // Initialize SoDu and username from user data
    const [soDu, setSoDu] = useState(0);
    const [username, setUsername] = useState("");
    const [hoTen, setHoTen] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [CCCD, setCCCD] = useState("");
    const [gioiTinh, setGioiTinh] = useState("");
    const [ngaySinh, setNgaySinh] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [email, setEmail] = useState("");

    const goiAPICapNhatDuLieu = async (khachHangData) => {
        try {
            const token = localStorage.getItem("token");
            var response = await updateKhachHangInformation(
                token,
                khachHangData
            );
            openSnackbar(response, "success");
        } catch (error) {
            openSnackbar(error.response.data, "error");
        }
    };

    useEffect(() => {
        FetchThongTinKhachHang();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    //Load dữ liệu và gán vào các ô
    const FetchThongTinKhachHang = async () => {
        try {
            const token = localStorage.getItem("token");
            const khachHangData = await getKhachHangInformation(token);

            // console.log(khachHangData);
            // Initialize state variables from the fetched data
            if (khachHangData) {
                setHoTen(khachHangData.hoTen || "");
                setDiaChi(khachHangData.diaChi || "");
                setSoDienThoai(khachHangData.sdt || "");
                setEmail(khachHangData.email || "");
                setSoDu(formatCurrency(khachHangData.soDu) || "");
                setCCCD(khachHangData.cccd || "");
                setGioiTinh(khachHangData.gioiTinh || "");
                setNgaySinh(dayjs(khachHangData.ngaySinh) || null);
            }
            const res = await getUserInfoByToken(token);
            if (res) {
                login({
                    username: res.username,
                    token: token,
                    firstLogin: res.firstLogin,
                    auth: true,
                    role: res.role,
                });
                setUsername(res.username);
            }
        } catch (error) {
            console.error("Error fetching user information", error);
        }
    };

    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };

    const handleSaveInformation = () => {
        // Kiểm tra định dạng
        try {
            var mes = validateFormat();
            if (mes) {
                // Hiển thị thông báo nếu có lỗi định dạng
                openSnackbar(mes, "warning");
                return;
            }
            // Tạo đối tượng chứa thông tin để gửi xuống API
            const informationData = {
                hoTen: hoTen,
                diaChi: diaChi,
                SDT: soDienThoai,
                email: email,
                cccd: CCCD,
                gioiTinh: gioiTinh,
                ngaySinh: dayjs(ngaySinh).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
                // Do not
            };

            console.log(informationData);
            goiAPICapNhatDuLieu(informationData);
            console.log("Đã cập nhật");
            // fetchData();
            // console.log("Đã fetch");
        } catch {
            console.log("lỗi r");
        }
    };
    const gioiTinhHandleChange = (e) => {
        setGioiTinh(e.target.value);
    };
    const validateFormat = () => {
        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            // Hiển thị thông báo hoặc thực hiện xử lý khi định dạng không đúng
            return "Định dạng email không đúng";
        }

        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(soDienThoai)) {
            // Hiển thị thông báo hoặc thực hiện xử lý khi định dạng không đúng
            return "Định dạng số điện thoại không đúng";
        } // Kiểm tra định dạng số điện thoại
        const CCCDRegex = /^[0-9]{12}$/;
        if (!CCCDRegex.test(CCCD)) {
            // Hiển thị thông báo hoặc thực hiện xử lý khi định dạng không đúng
            return "Định dạng CCCD không đúng";
        }

        // Kiểm tra tên không được trống
        const nameRegex =
            /^[a-zA-Zàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳỵỷỹ ]+$/u;
        if (!nameRegex.test(hoTen)) {
            return "Định dạng họ tên không đúng";
        }
        if (!gioiTinh) {
            return "Giới tính không được để trống";
        }
        const currentDate = dayjs();
        const birthDate = dayjs(ngaySinh);
        if (!birthDate.isValid() || birthDate.isAfter(currentDate)) {
            return "Ngày sinh phải nhỏ hơn ngày hiện tại";
        }

        // Nếu tất cả định dạng đều đúng, trả về true
        return null;
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "30px 0px " }}
            >
                <Typography component="h1" variant="h5">
                    Thông tin cá nhân
                </Typography>
                <form>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        value={username}
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Họ tên"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={hoTen}
                                onChange={(e) => setHoTen(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6} dateAdapter={AdapterDayjs}>
                            <TextField
                                label="CCCD"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={CCCD}
                                onChange={(e) => setCCCD(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                            >
                                <InputLabel id="gioiTinh-label">
                                    Giới tính
                                </InputLabel>
                                <Select
                                    labelId="gioiTinh-label"
                                    id="gioiTinh"
                                    value={gioiTinh}
                                    label="Giới tính"
                                    onChange={gioiTinhHandleChange}
                                >
                                    <MenuItem value="Nam">Nam</MenuItem>
                                    <MenuItem value="Nữ">Nữ</MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl
                                fullWidth
                                style={{ marginTop: "15px" }}
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        label="Ngày sinh"
                                        value={ngaySinh}
                                        onChange={(date) => setNgaySinh(date)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                variant="outlined"
                                                margin="normal"
                                            />
                                        )}
                                        format="DD/MM/YYYY"
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <TextField
                        label="Địa chỉ"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={diaChi}
                        onChange={(e) => setDiaChi(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Số điện thoại"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={soDienThoai}
                                onChange={(e) => setSoDienThoai(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Số dư"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={soDu}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSaveInformation}
                        style={{ marginTop: "20px" }}
                    >
                        Lưu thông tin
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ChangeInformation;
