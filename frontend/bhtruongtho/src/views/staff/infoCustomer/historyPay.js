import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLichSuThanhToan } from "../../../api/connect";
import { useUser } from "../../../context/UserContext";

const HistoryPay = () => {
    const params = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hoadons, setHoaDons] = useState([]);
    const [maKH, setMaKH] = useState(params.id);
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        const fetchDataByUser = async () => {
            try {
                // setMaKH = params.id;
                const api = await getLichSuThanhToan(
                    maKH,
                    localStorage.getItem("token")
                );
                setHoaDons(api);
                console.log(hoadons);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDataByUser();
    }, [maKH]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    const rows = hoadons.map((row, index) => {
        const locale = "vi-VN";

        return {
            id: index + 1,
            maHD: row.maHD,
            thoiGianHetHan: dayjs(row.thoiGianHetHan).format("DD/MM/YYYY"),
            hanKy: row.hanKy,
            tinhTrangThanhToan: row.tinhTrangThanhToan,
            tongTien: formatCurrency(row.tongTien),
            thoiGianThanhToan:
                row.thoiGianThanhToan === null
                    ? ""
                    : dayjs(row.thoiGianThanhToan).format(
                          "DD/MM/YYYY HH:mm:ss"
                      ),
            maDonDK: row.maDonDK,
        };
    });

    const columns = [
        { field: "id", headerName: "STT", flex: 1 },
        {
            field: "maHD",
            headerName: "Hóa Đơn",
            minWidth: 50,
            flex: 1,
        },
        {
            field: "thoiGianHetHan",
            headerName: "Thời Gian Hết Hạn",
            minWidth: 160,
            flex: 2,
        },
        {
            field: "hanKy",
            headerName: "Hạn Kỳ",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "tinhTrangThanhToan",
            headerName: "Tình Trạng Thanh Toán",
            minWidth: 200,
            flex: 2,
            renderCell: (params) => {
                // Xác định màu sắc và dấu + hoặc -
                const color =
                    params.row.tinhTrangThanhToan === "Đã thanh toán"
                        ? "green"
                        : "red";
                return (
                    <div style={{ textAlign: "right", color: color }}>
                        {params.value}
                    </div>
                );
            },
        },
        {
            field: "tongTien",
            headerName: "Tổng Tiền",
            minWidth: 100,
            flex: 1.5,
        },
        {
            field: "thoiGianThanhToan",
            headerName: "Thời Gian Thanh Toán",
            minWidth: 160,
            flex: 2,
        },
        {
            field: "maDonDK",
            headerName: "Đơn Đăng Ký",
            minWidth: 100,
            flex: 1,
        },
    ];

    const troVe = () => {
        navigate(`../staff/infoCustomer`);
    };

    return (
        <>
            {user && user.role == "Nhân viên" ? (
                <>
                    <Container component="main" maxWidth="xl">
                        <Paper
                            elevation={3}
                            style={{ padding: "20px", margin: "30px 0px " }}
                        >
                            <div style={{ padding: "20px", marginTop: "20px" }}>
                                <Typography component="h1" variant="h5">
                                    Lịch sử thanh toán
                                </Typography>
                                <Box
                                    sx={{
                                        height: 600,
                                        width: "100%",
                                        flexGrow: 1,
                                    }}
                                >
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 10,
                                                },
                                            },
                                        }}
                                        autoWidth
                                        disableRowSelectionOnClick
                                        pageSizeOptions={[10]}
                                        getRowId={(row) => row.id}
                                    />
                                </Box>
                            </div>{" "}
                            <Grid item xs={6} textAlign="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={troVe}
                                >
                                    Quay lại
                                </Button>
                            </Grid>
                        </Paper>
                    </Container>
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

export default memo(HistoryPay);
