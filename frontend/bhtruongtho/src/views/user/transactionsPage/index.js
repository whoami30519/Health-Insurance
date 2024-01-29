import { Button, Container, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { KH_getBillList } from "../../../api/connect";
// import { DataGrid } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const BillList = () => {
    const [billList, setBillList] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchBillList = async () => {
            try {
                const billData = await KH_getBillList(
                    localStorage.getItem("token")
                );
                console.log(billData);
                setBillList(billData);
            } catch (error) {
            } finally {
            }
        };
        fetchBillList();
    }, []);
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
        return formattedAmount;
    };
    const rows = billList.map((row, index) => {
        const isHoaDonThanhToan = row.loaiHoaDon === "Thanh toán";
        const isHoaDonHoanTra = row.loaiHoaDon === "Hoàn trả";

        const formattedSoTien = isHoaDonThanhToan
            ? `- ${formatCurrency(row.soTien)}`
            : isHoaDonHoanTra
            ? `+ ${formatCurrency(row.soTien)}`
            : formatCurrency(row.soTien);

        const textColor = isHoaDonThanhToan
            ? "red"
            : isHoaDonHoanTra
            ? "green"
            : "black";

        return {
            id: index + 1,
            maHD: row.maHD,
            soTien: row.soTien,
            thoiGianThanhToan: dayjs(row.thoiGianThanhToan).format(
                "DD/MM/YYYY HH:mm:ss"
            ),
            maDon: row.maDon,
            loaiHoaDon: row.loaiHoaDon,
            formattedSoTien, // Include formatted amount in rows
            textColor,
        };
    });

    const columns = [
        { field: "id", headerName: "STT", flex: 1 },

        {
            field: "soTien",
            headerName: "Số Tiền",
            type: "number",
            renderCell: (params) => (
                <span style={{ color: params.row.textColor }}>
                    {params.row.formattedSoTien}
                </span>
            ),
            minWidth: 100,
            flex: 1,
        },
        {
            field: "thoiGianThanhToan",
            headerName: "Thời Gian Thanh Toán",
            minWidth: 200,
            flex: 3,
        },
        {
            field: "loaiHoaDon",
            headerName: "Loại hoá đơn ",
            minWidth: 100,
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
                    onClick={() =>
                        handleViewDetail(params.row.maHD, params.row.loaiHoaDon)
                    }
                >
                    Xem
                </Button>
            ),
            minWidth: 110,
            flex: 1,
        },
    ];
    const [sortModel, setSortModel] = useState([
        { field: "thoiGianThanhToan", sort: "desc" }, // Initial sort configuration
    ]);
    const handleViewDetail = (maHD, loaiHoaDon) => {
        if (loaiHoaDon === "Thanh toán") {
            console.log("chuyển đến chi tiết hoá đơn thanh toán ", maHD);
            // Thực hiện logic chuyển hướng cho chi tiết thanh toán
            navigate(`/pay/detailUnpaid/${maHD}`);
        } else if (loaiHoaDon === "Hoàn trả") {
            console.log("chuyển đến chi tiết hoá đơn Hoàn trả ", maHD);
            // Thực hiện logic chuyển hướng cho chi tiết hoàn trả
            navigate(`/requestrefund/detail/${maHD}`);
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "30px 0px " }}
            >
                <div style={{ padding: "20px", marginTop: "20px" }}>
                    <Typography component="h1" variant="h5">
                        Lịch sử giao dịch
                    </Typography>
                    <Box sx={{ height: 400, width: "100%", flexGrow: 1 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            autoWidth
                            disableRowSelectionOnClick
                            hideFooterPagination
                            hideFooterSelectedRowCount
                            getRowId={(row) => row.id}
                            sortModel={sortModel}
                            onSortModelChange={(newSortModel) =>
                                setSortModel(newSortModel)
                            }
                        />
                    </Box>
                </div>
            </Paper>
        </Container>
    );
};

export default BillList;
