import {
    Button,
    FormLabel,
    Grid,
    Input,
    Paper,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getDonDangKyByID,
    getNhanVienByID,
    getUserInfoByToken,
    putDonDangKyByID,
} from "../../../api/connect";
import { ROUTERS } from "../../../utils/router";

import { useSnackbar } from "../../../context/SnackbarContext";

const DetailPage = () => {
    const [loading, setLoading] = useState(true);
    const [donDangKy, setDonDangKy] = useState([]);
    const [nhanVien, setNhanVien] = useState([]);
    const [maNV, setmaNV] = useState("");
    const [thoiGianDuyet, setThoiGianDuyet] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [hoTen, setHoTen] = useState("");
    const [email, setEmail] = useState("");
    const [sdt, setSdt] = useState("");
    const today = new Date();
    const { openSnackbar } = useSnackbar();
    const [reasonForDenial, setReasonForDenial] = useState("");
    const [showDenialReasonInput, setShowDenialReasonInput] = useState(false);

    const params = useParams();
    const [currentuser, setCurrentuser] = useState({});
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserInfoByToken(
                    localStorage.getItem("token")
                );
                setCurrentuser(data.username);
            } catch (error) {
                openSnackbar("Lỗi trong quá trình lấy user", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (params.id) {
                    const data = await getDonDangKyByID(
                        localStorage.getItem("token"),
                        params.id
                    );
                    setDonDangKy(data);
                } else {
                    openSnackbar("Lỗi trong quá trình lấy dữ liệu", "error");
                }
            } catch (error) {
                openSnackbar("Lỗi trong quá trình lấy dữ liệu", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]); // Thêm snackbarOpen vào dependencies

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (currentuser) {
                    const data = await getNhanVienByID(
                        currentuser,
                        localStorage.getItem("token")
                    );
                    setNhanVien(data);
                    setmaNV(data.maNV);
                    setThoiGianDuyet(today);
                    setDiaChi(data.diaChi);
                    setEmail(data.email);
                    setHoTen(data.hoTen);
                    setSdt(data.sdt);
                } else {
                    console.error("No username found.");
                }
            } catch (error) {
                console.error("Error fetching Nhan Vien data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []); // Thêm snackbarOpen vào dependencies
    const updateStatus_accept = async () => {
        try {
            if (donDangKy.tinhTrang === "Chờ duyệt") {
                const updatedDonDangKy = {
                    ...donDangKy,
                    tinhTrang: "Chờ thanh toán",
                    DS_HoaDonThanhToanDK: calculatePaymentDetails(
                        donDangKy.thoiGianBD,
                        donDangKy.thoiGianHetHan,
                        donDangKy.tongGia,
                        donDangKy.soKyHanThanhToan
                    ),
                };

                await putDonDangKyByID(
                    params.id,
                    {
                        ...updatedDonDangKy,
                        maNV,
                        diaChi,
                        thoiGianDuyet,
                        email,
                        hoTen,
                        sdt,
                        liDoTuChoi: "",
                    },
                    localStorage.getItem("token")
                );

                setDonDangKy(updatedDonDangKy); // Update the local state with the new data

                openSnackbar("Cập nhật thành công!", "success");
            } else {
                openSnackbar("Trạng thái này không thể kích hoạt", "warning");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            openSnackbar("Có lỗi xảy ra khi cập nhật!", "error");
        }
    };

    const toggleDenialReasonInput = () => {
        setShowDenialReasonInput(!showDenialReasonInput);
    };

    const calculatePaymentDetails = (
        startDate,
        endDate,
        totalAmount,
        totalPayments
    ) => {
        const startDate_ = dayjs(startDate);
        const endDate_ = dayjs(endDate);

        const totalMonths = endDate_.diff(startDate_, "month");
        const paymentDetails = [];
        const monthsInYear = 12;
        for (let i = 1; i <= totalPayments; i++) {
            const hanKy = `${i}/${totalPayments}`;
            // Calculate the expiration time for each term
            const expirationTime = dayjs(startDate)
                .add(i * (totalMonths / totalPayments), "month")
                .format();

            const paymentDetail = {
                SoTien: totalAmount / totalPayments,
                HanKy: hanKy,
                TinhTrangThanhToan: "Chưa thanh toán",
                ThoiGianHetHan: expirationTime,
            };

            paymentDetails.push(paymentDetail);
        }

        return paymentDetails;
    };

    const updateStatus_denied = async () => {
        try {
            if (donDangKy.tinhTrang === "Chờ duyệt") {
                if (showDenialReasonInput) {
                    // Kiểm tra xem lí do từ chối đã được nhập hay chưa
                    if (reasonForDenial.trim() === "") {
                        openSnackbar("Vui lòng nhập lí do từ chối!", "warning");
                        return;
                    }

                    const updatedDonDangKy = {
                        ...donDangKy,
                        tinhTrang: "Bị từ chối",
                        maNV,
                        diaChi,
                        email,
                        hoTen,
                        sdt,
                        thoiGianDuyet,
                        liDoTuChoi: reasonForDenial,
                    };

                    await putDonDangKyByID(
                        params.id,
                        updatedDonDangKy,
                        localStorage.getItem("token")
                    );

                    setDonDangKy(updatedDonDangKy); // Update the local state with the new data

                    openSnackbar("Cập nhật thành công!", "success");
                } else {
                    // Mở phần nhập lí do từ chối
                    toggleDenialReasonInput();
                }
            } else {
                openSnackbar("Trạng thái này không thể kích hoạt", "warning");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            openSnackbar("Có lỗi xảy ra khi cập nhật!", "error");
        }
    };

    return (
        <div className="container__body">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Paper
                    elevation={3}
                    style={{
                        padding: "20px",
                        marginTop: "40px",
                        marginBottom: "100px",
                    }}
                >
                    <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item xs={12} sm={5}>
                            <Paper elevation={3} style={{ padding: 16 }}>
                                <Typography
                                    variant="h4"
                                    style={{
                                        paddingBottom: "10px",
                                        color: "rgb(25, 118, 210)",
                                    }}
                                >
                                    Thông tin gói bảo hiểm
                                </Typography>
                                {donDangKy.goiBaoHiem ? (
                                    <>
                                        <Typography variant="body1">
                                            Tên gói bảo hiểm:{" "}
                                            {donDangKy.goiBaoHiem.tenGoiBH}
                                        </Typography>
                                        <Typography variant="body1">
                                            Mô tả gói bảo hiểm:{" "}
                                            {donDangKy.goiBaoHiem.motaGoiBH}
                                        </Typography>
                                        <Typography variant="body1">
                                            Giá:{" "}
                                            {formatCurrency(
                                                donDangKy.goiBaoHiem.gia
                                            )}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="body1">
                                        Goi Bao Hiem information not available.
                                    </Typography>
                                )}
                            </Paper>
                            <Paper
                                elevation={3}
                                style={{ marginTop: 16, padding: 16 }}
                            >
                                <Typography
                                    variant="h4"
                                    style={{
                                        paddingBottom: "10px",
                                        color: "rgb(25, 118, 210)",
                                    }}
                                >
                                    Thông tin khách hàng
                                </Typography>
                                {donDangKy.khachHang ? (
                                    <>
                                        <Typography variant="body1">
                                            Họ Tên: {donDangKy.khachHang.hoTen}
                                        </Typography>
                                        <Typography variant="body1">
                                            Địa Chỉ:{" "}
                                            {donDangKy.khachHang.diaChi}
                                        </Typography>
                                        <Typography variant="body1">
                                            Số điện thoại:{" "}
                                            {donDangKy.khachHang.sdt}
                                        </Typography>
                                        <Typography variant="body1">
                                            Email: {donDangKy.khachHang.email}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="body1">
                                        Khach Hang information not available.
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Paper elevation={3} style={{ padding: 16 }}>
                                <Typography
                                    variant="h4"
                                    style={{
                                        paddingBottom: "10px",
                                        color: "rgb(25, 118, 210)",
                                    }}
                                >
                                    Thông tin đơn đăng kí {params.id}{" "}
                                </Typography>

                                <div
                                    style={{
                                        marginBottom: "10px",
                                        backgroundColor: "#f0f0f0",
                                        padding: "8px",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <Typography variant="body1">
                                        Thời gian đăng ký:{" "}
                                        {dayjs(donDangKy.thoiGianDK).format(
                                            "DD/MM/YYYY HH:mm:ss"
                                        )}
                                    </Typography>
                                </div>

                                <div
                                    style={{
                                        marginBottom: "10px",
                                        backgroundColor: "#f0f0f0",
                                        padding: "8px",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <Typography variant="body1">
                                        Thời gian bắt đầu:{" "}
                                        {donDangKy.thoiGianBD
                                            ? dayjs(
                                                  donDangKy.thoiGianBD
                                              ).format("DD/MM/YYYY")
                                            : "Chưa kích hoạt"}
                                    </Typography>
                                </div>

                                <div
                                    style={{
                                        marginBottom: "10px",
                                        backgroundColor: "#f0f0f0",
                                        padding: "8px",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <Typography variant="body1">
                                        Thời gian hết hạn:{" "}
                                        {donDangKy.thoiGianHetHan
                                            ? dayjs(
                                                  donDangKy.thoiGianHetHan
                                              ).format("DD/MM/YYYY")
                                            : "Chưa kích hoạt"}
                                    </Typography>
                                </div>

                                <div
                                    style={{
                                        marginBottom: "10px",
                                        backgroundColor: "#f0f0f0",
                                        padding: "8px",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <Typography variant="body1">
                                        Số kỳ hạn: {donDangKy.soKyHanThanhToan}
                                    </Typography>
                                </div>

                                <div
                                    style={{
                                        marginBottom: "10px",
                                        backgroundColor: "#f0f0f0",
                                        padding: "8px",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <Typography variant="body1">
                                        Tổng giá:{" "}
                                        {formatCurrency(donDangKy.tongGia)}
                                    </Typography>
                                </div>

                                <div
                                    style={{
                                        backgroundColor: "#f0f0f0",
                                        padding: "8px",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <Typography variant="body1">
                                        Tình trạng hiện tại:{" "}
                                        {donDangKy.tinhTrang}
                                    </Typography>
                                </div>
                                <Typography variant="body1">
                                    {showDenialReasonInput && (
                                        <div
                                            style={{
                                                backgroundColor: "#f0f0f0",
                                                padding: "8px",
                                                borderRadius: "4px",
                                                marginTop: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <FormLabel
                                                htmlFor="denialReason"
                                                style={{ marginBottom: "4px" }}
                                            >
                                                Lí do từ chối:
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                id="denialReason"
                                                value={reasonForDenial}
                                                onChange={(e) =>
                                                    setReasonForDenial(
                                                        e.target.value
                                                    )
                                                }
                                                style={{
                                                    width: "100%",
                                                    padding: "8px",
                                                    boxSizing: "border-box",
                                                    borderRadius: "4px",
                                                    border: "1px solid #ccc",
                                                }}
                                            />
                                        </div>
                                    )}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid container spacing={3} style={{ padding: 16 }}>
                            <Grid item xs={4}>
                                <Button
                                    variant="outlined"
                                    style={{
                                        marginBottom: "10px",
                                    }}
                                    onClick={updateStatus_accept}
                                >
                                    Duyệt đơn
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant="outlined"
                                    style={{
                                        marginBottom: "10px",
                                    }}
                                    onClick={updateStatus_denied}
                                >
                                    Từ chối
                                </Button>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    style={{
                                        marginBottom: "10px",
                                    }}
                                    component={Link}
                                    to={`../${ROUTERS.USER.DONDANGKY}`}
                                >
                                    Quay lại
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </div>
    );
};

export default memo(DetailPage);
