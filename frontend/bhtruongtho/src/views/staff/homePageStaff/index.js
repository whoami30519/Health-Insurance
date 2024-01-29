import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NV_getTongHopHoaDon, getStaffHompageInfo } from "../../../api/connect";
import { ROUTERS } from "../../../utils/router";
import { useUser } from "../../../context/UserContext";

const HomePageStaff = () => {
    // Giả sử bạn có dữ liệu về số lượng đơn vị với địa chỉ tương ứng
    const [count, setCount] = useState([]);
    const [total, setTotal] = useState([]);
    const { user } = useUser();

    const fetchData = async () => {
        try {
            const response = await getStaffHompageInfo(
                localStorage.getItem("token")
            );
            const financialReportData = await NV_getTongHopHoaDon(
                localStorage.getItem("token")
            );
            setTotal(calculateTotalAmountReceived(financialReportData));
            console.log(response);
            console.log(financialReportData);
            setCount(response);
        } catch (error) {}
    };
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    const calculateTotalAmountReceived = (invoices) => {
        return invoices.reduce((total, invoice) => {
            // Kiểm tra nếu là hóa đơn loại "Hoàn trả"
            if (invoice.loaiHoaDon === "Hoàn trả") {
                total -= invoice.soTien; // Trừ tiền khi là hóa đơn "Hoàn trả"
            } else if (invoice.loaiHoaDon === "Đơn đăng ký") {
                total += invoice.soTien; // Cộng tiền khi là hóa đơn "Đơn đăng ký"
            }
            return total;
        }, 0);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const totalRefund = 10;
    const data = [
        {
            title: "Đơn đăng ký",
            count: count.donDangKyChuaDuyet,
            color: "#E0F4FF",
            address: ROUTERS.USER.DONDANGKY,
        },

        {
            title: "Quản lý gói bảo hiểm",
            count: count.goiBaoHiemDangCungCap,
            color: "#E0F4FF",
            address: ROUTERS.USER.INSURANCEPACKM,
        },
        {
            title: "Yêu cầu hoàn trả",
            count: count.yeuCauHoanTraChuaDuyet,
            color: "#E0F4FF",
            address: ROUTERS.USER.YEUCAUHOANTRA,
        },
        {
            title: "Thông tin khách hàng",
            count: count.khachHangTinhTrang1,
            color: "#E0F4FF",
            address: ROUTERS.USER.INFOCUSTOMER,
        },
        {
            title: "Báo cáo tài chính",
            count: "ㅤ",
            color: "#E0F4FF",
            address: ROUTERS.USER.FINANCIALREPORT,
        },
    ];
    return (
        <>
            {user && user.role == "Nhân viên" ? (
                <>
                    <Container maxWidth="md" sx={{ marginTop: 5 }}>
                        <Typography variant="h3" align="center" gutterBottom>
                            Trang chủ nhân viên
                        </Typography>
                        <Grid container spacing={2}>
                            {data.map((item, index) => (
                                <Grid item xs={6} md={4} lg={3} key={index}>
                                    <Paper
                                        sx={{
                                            padding: 2,
                                            textAlign: "center",
                                            backgroundColor: item.color,
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="h4">
                                            {item.count}
                                        </Typography>
                                        <Button
                                            component={Link}
                                            to={`../${item.address}`}
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{ marginTop: 2 }}
                                        >
                                            Xem chi tiết
                                        </Button>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>{" "}
                </>
            ) : (
                <>
                    <h2>404 - Page Not Found</h2>
                    <p>The requested page does not exist.</p>
                </>
            )}
        </>
    );
};

export default HomePageStaff;
