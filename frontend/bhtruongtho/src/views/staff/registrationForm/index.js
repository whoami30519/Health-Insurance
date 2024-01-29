import { Button, Container, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSnackbar } from "../../../context/SnackbarContext";
import React, { memo, useEffect, useState } from "react";

import { getDonDangKyList } from "../../../api/connect";
import "./style.scss";
import { useUser } from "../../../context/UserContext";

const ListDonDangKy = () => {
    const [loading, setLoading] = useState(true);
    const [donDangKyList, setDonDangKyList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    const { openSnackbar } = useSnackbar();

    const [error, setError] = useState(null); // New state for handling errors
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDonDangKyList(
                    localStorage.getItem("token")
                );
                setDonDangKyList(data);
            } catch (error) {
                openSnackbar("Lỗi trong quá trình lấy dữ liệu", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    const formatDate = (date) => {
        const formattedDate = dayjs(date).format("DD/MM/YYYY");
        return formattedDate === "01/01/1901" ? "" : formattedDate;
    };

    const rows = donDangKyList.map((item, index) => ({
        id: index + 1,
        maDonDK: item.maDonDK,
        maGoiBH: item.maGoiBH,
        thoiGianDK: dayjs(item.thoiGianDK).format("DD/MM/YYYY HH:mm:ss"),
        thoiGianBD: formatDate(item.thoiGianBD),
        thoiGianHetHan: formatDate(item.thoiGianHetHan),
        thoiGianDuyet: item.thoiGianDuyet ? formatDate(item.thoiGianDuyet) : "",
        tinhTrang: item.tinhTrang,
        soKyHanThanhToan: item.soKyHanThanhToan,
        tongGia: formatCurrency(item.tongGia),
        maKH: item.maKH,
        maNV: item.maNV,
        liDoTuChoi: item.liDoTuChoi,
    }));

    const columns = [
        { field: "id", headerName: "ID", minWidth: 70, flex: 1 },
        { field: "maDonDK", headerName: "Mã Đơn ", minWidth: 100, flex: 1 },
        { field: "maGoiBH", headerName: "Mã Gói BH", minWidth: 80, flex: 1 },
        {
            field: "thoiGianDK",
            headerName: "Thời Gian Đăng Kí",
            minWidth: 180,
            flex: 1,
        },
        {
            field: "thoiGianBD",
            headerName: "Thời Gian Bắt Đầu",
            minWidth: 130,
            flex: 1,
        },
        {
            field: "thoiGianHetHan",
            headerName: "Thời Gian Hết Hạn",
            minWidth: 130,
            flex: 1,
        },
        {
            field: "thoiGianDuyet",
            headerName: "Thời Gian Duyệt",
            minWidth: 120,
            flex: 1,
        },
        {
            field: "soKyHanThanhToan",
            headerName: "Số kỳ hạn",
            minWidth: 100,
            flex: 1,
        },
        { field: "tongGia", headerName: "Tổng Giá", minWidth: 120, flex: 1 },
        { field: "maKH", headerName: "Mã KH", minWidth: 75, flex: 1 },
        { field: "maNV", headerName: "Mã NV", minWidth: 75, flex: 1 },
        {
            field: "liDoTuChoi",
            headerName: "Lí do từ chối",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "tinhTrang",
            headerName: "Tình Trạng",
            minWidth: 160,
            cellClassName: (params) =>
                `status-cell ${params.value.replace(/\s/g, "").toLowerCase()}`,
            renderCell: (params) => (
                <div
                    className={`bordered-cell ${params.value
                        .replace(/\s/g, "")
                        .toLowerCase()}`}
                >
                    {params.value}
                </div>
            ),
        },
    ];

    return (
        <>
            {user && user.role == "Nhân viên" ? (
                <>
                    <Container component="main" maxWidth="xl">
                        <Paper
                            elevation={3}
                            style={{
                                padding: "20px",
                                marginTop: "40px",
                                marginBottom: "100px",
                            }}
                        >
                            <div>
                                <Box>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        <Typography component="h1" variant="h5">
                                            Danh sách đơn đăng kí
                                        </Typography>
                                    </div>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        slots={{ toolbar: GridToolbar }}
                                        slotProps={{
                                            toolbar: {
                                                showQuickFilter: true,
                                            },
                                        }}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 10,
                                                },
                                            },
                                        }}
                                        pageSizeOptions={[10]}
                                        hideFooterSelectedRowCount
                                        onRowSelectionModelChange={(
                                            newRowSelectionModel
                                        ) => {
                                            setSelectedIds(
                                                newRowSelectionModel
                                            );
                                        }}
                                        rowSelectionModel={selectedIds}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            marginTop: "20px",
                                        }}
                                    >
                                        <Button
                                            component={Link}
                                            to={`detail/${selectedIds}`}
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Xem chi tiết
                                        </Button>
                                    </div>
                                </Box>
                            </div>
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

export default memo(ListDonDangKy);
