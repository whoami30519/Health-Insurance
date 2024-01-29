import React, { useState, useEffect } from "react";
import { getAllYeuCauHoanTra } from "../../../api/connect";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import dayjs from "dayjs";
import "./style.scss";
import { Container, Paper, Button, Typography } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import { useSnackbar } from "../../../context/SnackbarContext";

const ListYeuCauHoanTra = () => {
    const [yeuCauHoanTraList, setYeuCauHoanTraList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState("");
    const { user } = useUser();
    const { openSnackbar } = useSnackbar();

    console.log(user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllYeuCauHoanTra(
                    localStorage.getItem("token")
                );

                const formattedData = data.map((item) => ({
                    ...item,
                    id: item.maYC.toString(),
                }));

                setYeuCauHoanTraList(formattedData);
            } catch (error) {
                openSnackbar("Lỗi trong quá trình lấy dữ liệu", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const formatDate = (date) =>
        dayjs(date).isValid() ? dayjs(date).format("DD/MM/YYYY") : "";
    const formatRelativeTime = (date) =>
        dayjs(date).isValid() ? dayjs(date).fromNow() : "";
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };

    const columns = [
        { field: "maYC", headerName: "Mã Yêu Cầu", width: 100 },
        { field: "maHDKhamBenh", headerName: "Mã Hồ Sơ Khám Bệnh", width: 180 },
        { field: "maGoiBHApDung", headerName: "Mã Gói BH Áp Dụng", width: 170 },
        { field: "maKH", headerName: "Mã KH", width: 70 },
        { field: "maNV", headerName: "Mã NV", width: 70 },
        { field: "tenBenhVien", headerName: "Tên Bệnh Viện", width: 120 },
        {
            field: "soTienDaKham",
            headerName: "Số Tiền Đã Khám",
            valueFormatter: (params) => formatCurrency(params.value),
            width: 130,
        },
        { field: "benh", headerName: "Bệnh", width: 120 },
        {
            field: "thoiGianTao",
            headerName: "Thời Gian Tạo",
            width: 110,
            valueFormatter: (params) => formatDate(params.value),
        },
        {
            field: "tinhTrang",
            headerName: "Tình Trạng",
            width: 110,
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
        {
            field: "soTienHoanTra",
            headerName: "Số Tiền Hoàn",
            width: 120,

            valueFormatter: (params) => formatCurrency(params.value),
        },
        {
            field: "thoiGianDuyet",
            headerName: "Thời Gian Duyệt",
            width: 120,
            valueFormatter: (params) => formatDate(params.value),
        },
    ];

    return (
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
                                Danh sách đơn yêu cầu hoàn trả
                            </Typography>
                        </div>
                        <DataGrid
                            rows={yeuCauHoanTraList}
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
                                setSelectedId(newRowSelectionModel);
                            }}
                            rowSelectionModel={selectedId}
                        />
                        <div style={{ display: "flex", marginTop: "20px" }}>
                            <Button
                                component={Link}
                                to={`detail/${selectedId}`}
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
    );
};

export default ListYeuCauHoanTra;
