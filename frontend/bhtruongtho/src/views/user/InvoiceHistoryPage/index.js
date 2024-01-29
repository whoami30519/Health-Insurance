// src/components/CustomerBillList.js
import { Button, Container, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDonDangKyList } from "../../../api/connect";

const CustomerBillList = () => {
    const [billList, setBillList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBillList = async () => {
            try {
                const billData = await getDonDangKyList(
                    localStorage.getItem("token")
                );
                console.log(billData[0]);
                setBillList(billData);
            } catch (error) {
                console.error("Error fetching bill list:", error);
            }
        };
        fetchBillList();
    }, []);

    const handleViewDetail = (maHD) => {
        navigate(`/invoiceHistory/detail/${maHD}`);
    };
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    const rows = billList.map((row, index) => {
        return {
            id: index + 1,
            maDonDK: row.maDonDK,
            soTien: row.soTien,
            thoiGianThanhToan: dayjs(row.thoiGianThanhToan).format(
                "HH:mm:ss DD/MM/YYYY"
            ),
            loaiHoaDon: row.loaiHoaDon,
            maGoiBH: row.goiBaoHiem.maGoiBH,
            tenGoiBH: row.goiBaoHiem.tenGoiBH,
            thoiGianDK: dayjs(row.thoiGianDK).format("DD/MM/YYYY HH:mm:ss"),
            thoiGianBD: dayjs(row.thoiGianBD).format("DD/MM/YYYY"),
            thoiGianHetHan: dayjs(row.thoiGianHetHan).format("DD/MM/YYYY"),
            tongGia: formatCurrency(row.tongGia),
            tinhTrang: row.tinhTrang,
        };
    });

    const columns = [
        { field: "id", headerName: "STT", flex: 1 },
        {
            field: "maDonDK",
            headerName: "Mã Đơn",
            minWidth: 65,
            flex: 1,
        },
        {
            field: "tenGoiBH",
            headerName: "Tên Gói BH",
            minWidth: 210,
            flex: 2,
        },
        {
            field: "thoiGianDK",
            headerName: "Thời Gian Đăng Ký",
            minWidth: 170,
            flex: 2,
        },
        {
            field: "thoiGianBD",
            headerName: "Ngày Bắt Đầu",
            minWidth: 110,
            flex: 2,
        },
        {
            field: "thoiGianHetHan",
            headerName: "Ngày Hết Hạn",
            minWidth: 110,
            flex: 2,
        },
        {
            field: "tongGia",
            headerName: "Tổng Giá",
            type: "number",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "tinhTrang",
            headerName: "Tình Trạng",
            minWidth: 120,
            flex: 1,
        },

        {
            field: "action",
            headerName: "Chi tiết",
            sortable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={
                        () => handleViewDetail(params.row.maDonDK, "Chi tiết") // Thay "Chi tiết" bằng loại hóa đơn tương ứng nếu có
                    }
                >
                    Xem
                </Button>
            ),
            minWidth: 110,
            flex: 1,
        },
    ];

    return (
        <Container component="main" maxWidth="xl">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "30px 0px " }}
            >
                <div style={{ padding: "20px", marginTop: "20px" }}>
                    <Typography component="h1" variant="h5">
                        Lịch sử đăng ký
                    </Typography>
                    <Box sx={{ height: 600, width: "100%", flexGrow: 1 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            autoWidth
                            hideFooterPagination
                            hideFooterSelectedRowCount
                            disableRowSelectionOnClick
                            getRowId={(row) => row.id}
                        />
                    </Box>
                </div>
            </Paper>
        </Container>
    );
};

export default CustomerBillList;
