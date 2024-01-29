import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PaymentIcon from "@mui/icons-material/Payment"; // Import PaymentIcon from Material-UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getHoaDonDKDaThanhToanDetail,
    getKhachHangInformation,
    postUpdateHoaDon,
} from "../../../api/connect";
import { useSnackbar } from "../../../context/SnackbarContext";
const UnPaidDetail = () => {
    const params = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const [soDu, setSoDu] = useState(null);
    const { openSnackbar } = useSnackbar();
    const [showReason, setShowReason] = useState(false);

    function formatDateTime(dateTimeString) {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString("en-GB", options);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;
        return `${formattedDate} ${formattedTime}`;
    }

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const maHD = params.id;
                const HD = await getHoaDonDKDaThanhToanDetail(maHD);
                setDetail(HD);
            } catch (error) {
                openSnackbar("Lấy thông tin thấy bại", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [params.id]);
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    useEffect(() => {
        const fetchSoDu = async () => {
            try {
                const infoKH = await getKhachHangInformation(
                    localStorage.getItem("token")
                );
                setSoDu(infoKH.soDu);
            } catch (error) {
                openSnackbar("Lấy thông tin thấy bại", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchSoDu();
    }, []);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/pay");
    };

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };
    const handleToggleReason = () => {
        setShowReason(!showReason);
    };

    const handleThanhToan = async () => {
        try {
            const userConfirmed = window.confirm(
                "Bạn có muốn thanh toán hay không?"
            );

            if (userConfirmed) {
                await postUpdateHoaDon(
                    localStorage.getItem("token"),
                    detail.maHD
                );
                openSnackbar("Đã thanh toán thành công", "success");
                navigate("/pay");
            }
        } catch (error) {
            openSnackbar(
                error.response?.data || "Error during payment",
                "error"
            );
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px", margin: "50px" }}>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="h5" gutterBottom>
                            Chi tiết hóa đơn
                        </Typography>
                    </Grid>
                    <Grid item>
                        {soDu !== null && (
                            <Typography
                                variant="subtitle1"
                                style={{
                                    marginBottom: "20px",
                                    textAlign: "right",
                                    fontWeight: "bold",
                                }}
                            >
                                Số dư: {formatCurrency(soDu)}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
                {loading && <p>Loading...</p>}
                {!loading && detail && (
                    <>
                        <TextField
                            label="Tên gói bảo hiểm"
                            value={detail.tenGoiBH}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ExpandMoreIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={handleToggleDetails}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            style={{
                                marginTop: "20px",
                                cursor: "pointer",
                            }}
                            onClick={handleToggleDetails}
                        />

                        {showDetails && (
                            <div
                                style={{
                                    border: "2px solid #2196F3",
                                    padding: "10px",
                                    marginTop: "20px",
                                }}
                            >
                                {/* ... (other TextField components) */}
                                <TextField
                                    label="Mô tả gói bảo hiểm"
                                    value={detail.motaGoiBH}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{ marginTop: "20px" }}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Giá gói"
                                            value={`${formatCurrency(
                                                detail.gia
                                            )} `}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Tỉ lệ hoàn tiền"
                                            value={`${detail.tiLeHoanTien} %`}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Thời hạn bảo vệ"
                                            value={`${detail.thoiHanBaoVe} năm`}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                </Grid>
                                <hr
                                    style={{
                                        margin: "20px 0",
                                        borderColor: "#2196F3",
                                    }}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Thời gian đăng ký"
                                            value={formatDateTime(
                                                detail.thoiGianDK
                                            )}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Thời gian bắt đầu"
                                            value={dayjs(
                                                detail.thoiGianBD
                                            ).format("DD/MM/YYYY")}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Thời gian hết hạn"
                                            value={dayjs(
                                                detail.thoiGianHetHan
                                            ).format("DD/MM/YYYY")}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Số kỳ hạn thanh toán/năm"
                                            value={detail.soKyHanThanhToan}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Tổng giá đơn"
                                            value={`${formatCurrency(
                                                detail.tongGia
                                            )}`}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Tình trạng gói bảo hiểm"
                                            value={detail.tinhTrang}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                </Grid>
                                {/* Đường kẻ giữa phần xổ ra và phần hiện sẵn */}

                                {/* Đường kẻ giữa phần xổ ra và phần hiện sẵn */}
                            </div>
                        )}

                        <TextField
                            label="Hạn kỳ"
                            value={detail.hanKy}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ marginTop: "20px" }}
                        />
                        <TextField
                            label="Tình trạng thanh toán"
                            value={detail.tinhTrangThanhToan}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                style: {
                                    color: "red",
                                },
                            }}
                            style={{ marginTop: "20px" }}
                        />
                        <TextField
                            label="Thời gian hết hạn thanh toán"
                            value={formatDateTime(
                                detail.thoiGianHetHanThanhToan
                            )}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ marginTop: "20px" }}
                        />
                        <TextField
                            label="Số tiền thanh toán"
                            value={`${formatCurrency(detail.soTien)}`}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ marginTop: "20px" }}
                        />
                        {/* Thêm điều kiện để hiển thị "Lí do phạt" khi bấm vào "Tiền phạt" */}
                        <TextField
                            label="Tiền phạt"
                            value={`${formatCurrency(detail.tienPhat || 0)}`}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                style: {
                                    color:
                                        detail.tienPhat !== 0
                                            ? "red"
                                            : "inherit",
                                    cursor:
                                        detail.tienPhat !== 0
                                            ? "pointer"
                                            : "auto",
                                },
                                onClick:
                                    detail.tienPhat !== 0
                                        ? handleToggleReason
                                        : undefined,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ExpandMoreIcon
                                            color="primary" // Thêm màu cho icon
                                            style={{ cursor: "pointer" }} // Tùy chỉnh kiểu cursor
                                            onClick={handleToggleReason}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            style={{ marginTop: "20px" }}
                        />

                        {showReason && (
                            <div
                                style={{
                                    marginTop: "20px",
                                    padding: "10px",
                                    border: "2px solid #2196F3",
                                }}
                            >
                                <TextField
                                    label="Lí do phạt"
                                    value={detail.liDoPhat || "Không có"}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{ marginTop: "20px" }}
                                />
                            </div>
                        )}

                        {/* Điều kiện màu xanh lá cho "Tổng tiền" */}
                        <TextField
                            label="Tổng tiền"
                            value={`${formatCurrency(detail.tongTien || 0)}`}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                style: {
                                    color: "green",
                                },
                            }}
                            style={{ marginTop: "20px" }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ArrowBackIcon />}
                            onClick={handleGoBack}
                            style={{
                                marginTop: "20px",
                                marginRight: "10px",
                                flex: 1,
                            }}
                        >
                            Quay lại
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<PaymentIcon />}
                            onClick={handleThanhToan}
                            style={{ marginTop: "20px", flex: 1 }}
                        >
                            Thanh toán
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
};
export default UnPaidDetail;
