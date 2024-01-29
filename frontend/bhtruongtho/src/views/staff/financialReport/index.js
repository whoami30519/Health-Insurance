import React, { memo, useState, useEffect } from "react";
import { NV_getTongHopHoaDon } from "../../../api/connect";
import {
    Container,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useUser } from "../../../context/UserContext";

const FinancialReport = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const { openSnackbar } = useSnackbar();
    const [totalAmountOfRegistration, setTotalAmountOfRegistration] =
        useState(0);
    const [totalAmountOfRefund, setTotalAmountOfRefund] = useState(0);
    const [selectedYear, setSelectedYear] = useState("Tất cả");
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [uniqueYears, setUniqueYears] = useState([]);
    const [tableName, setTableName] = useState("Doanh thu");
    const { user } = useUser();

    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };

    useEffect(() => {
        const fetchFinancialReport = async () => {
            try {
                setLoading(true);

                const financialReportData = await NV_getTongHopHoaDon(
                    localStorage.getItem("token")
                );

                // Extract unique years from the data
                const years = [
                    "Tất cả",
                    ...Array.from(
                        new Set(
                            financialReportData.map((row) =>
                                new Date(row.thoiGianGiaoDich).getFullYear()
                            )
                        )
                    ),
                ];

                // If selected year is not in unique years, set it to "Tất cả"
                if (!years.includes(selectedYear)) {
                    setSelectedYear("Tất cả");
                }

                setUniqueYears(years);

                // Lọc dữ liệu theo năm và tháng đã chọn
                const filteredData = financialReportData.filter((row) => {
                    const rowDate = new Date(row.thoiGianGiaoDich);
                    return (
                        (selectedYear === "Tất cả" ||
                            rowDate.getFullYear() === parseInt(selectedYear)) &&
                        (selectedMonth === null ||
                            rowDate.getMonth() + 1 === selectedMonth)
                    );
                });

                // Tính toán tổng số tiền cho Hóa đơn thanh toán đăng ký và Hóa đơn hoàn trả
                const totalRegistration = filteredData
                    .filter((row) => row.loaiHoaDon === "Đơn đăng ký")
                    .reduce((acc, row) => acc + row.soTien, 0);

                const totalRefund = filteredData
                    .filter((row) => row.loaiHoaDon === "Hoàn trả")
                    .reduce((acc, row) => acc + row.soTien, 0);

                setTotalAmountOfRegistration(totalRegistration);
                setTotalAmountOfRefund(totalRefund);

                const updatedRows = filteredData.map((row, index) => ({
                    ...row,
                    stt: index + 1,
                    thoiGianGiaoDich: formatDateTime(row.thoiGianGiaoDich),
                    maHD: generateMaHD(row.maHD, row.loaiHoaDon),
                }));

                setRows(updatedRows);
                // Cập nhật tên bảng dựa trên giá trị của selectedYear và selectedMonth
                let tableTitle = "Doanh thu";
                if (selectedYear !== "Tất cả") {
                    tableTitle += ` năm ${selectedYear}`;
                    if (selectedMonth !== null) {
                        tableTitle += `-${selectedMonth}`;
                    }
                } else if (selectedMonth !== null) {
                    tableTitle += ` tháng ${selectedMonth}`;
                }

                setTableName(tableTitle);
            } catch (error) {
                try {
                    openSnackbar(
                        "Có lỗi xảy ra khi kết nối với máy chủ",
                        "error"
                    );
                } catch {
                    openSnackbar(
                        "Có lỗi xảy ra khi kết nối với máy chủ",
                        "error"
                    );
                }

                openSnackbar("Có lỗi xảy ra khi kết nối với máy chủ", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchFinancialReport();
    }, [selectedYear, selectedMonth]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        setSelectedMonth(null); // Reset selected month when changing the year
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const generateMaHD = (stt, loaiHoaDon) => {
        if (loaiHoaDon === "Đơn đăng ký") {
            return `HDDK${stt}`;
        } else if (loaiHoaDon === "Hoàn trả") {
            return `HDHT${stt}`;
        } else {
            return "";
        }
    };

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
        };
        const date = new Date(dateTimeString);
        return date.toLocaleDateString("en-GB", options);
    };

    const columns = [
        { field: "stt", headerName: "STT", width: 100 },
        {
            field: "soTien",
            headerName: "Số Tiền",
            width: 150,
            renderCell: (params) => {
                const color =
                    params.row.loaiHoaDon === "Đơn đăng ký" ? "green" : "red";
                const sign =
                    params.row.loaiHoaDon === "Đơn đăng ký" ? "+" : "-";
                return (
                    <div style={{ textAlign: "right", color: color }}>
                        {sign} {formatCurrency(params.value)}
                    </div>
                );
            },
        },
        {
            field: "thoiGianGiaoDich",
            headerName: "Thời Gian Giao Dịch",
            width: 200,
        },
        { field: "loaiHoaDon", headerName: "Loại Hóa Đơn", width: 150 },
        { field: "maHD", headerName: "Mã Hóa Đơn", width: 150 },
    ];

    return (
        <>
            {user && user.role == "Nhân viên" ? (
                <>
                    <Container component="main" maxWidth="md">
                        <div
                            style={{
                                display: "flex",
                                gap: "8px",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginTop: "10px",
                                }}
                            >
                                {tableName}
                            </div>
                            {/* Hàng chứa hình chữ nhật màu xanh lá cây và màu đỏ */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: "8px",
                                    marginTop: "10px",
                                }}
                            >
                                {/* Hình chữ nhật màu xanh lá cây */}
                                <div
                                    style={{
                                        backgroundColor: "white",
                                        padding: "10px",
                                        marginBottom: "20px",
                                        width: "33%",
                                        borderRadius: "8px",
                                        border: "1px solid black",
                                    }}
                                >
                                    <div
                                        style={{
                                            color: "green",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TrendingUpIcon
                                            style={{ marginRight: "8px" }}
                                        />
                                        <div style={{ fontSize: "24px" }}>
                                            {formatCurrency(
                                                totalAmountOfRegistration
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Hình chữ nhật màu đỏ */}
                                <div
                                    style={{
                                        backgroundColor: "white",
                                        padding: "10px",
                                        marginBottom: "20px",
                                        width: "33%",
                                        borderRadius: "8px",
                                        border: "1px solid black",
                                    }}
                                >
                                    <div
                                        style={{
                                            color: "red",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TrendingDownIcon
                                            style={{ marginRight: "8px" }}
                                        />
                                        <div style={{ fontSize: "24px" }}>
                                            {formatCurrency(
                                                totalAmountOfRefund
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Ô Lợi nhuận (Thu - Chi) */}
                                <div
                                    style={{
                                        backgroundColor: "white",
                                        padding: "10px",
                                        marginBottom: "20px",
                                        width: "33%",
                                        borderRadius: "8px",
                                        border: "1px solid black",
                                    }}
                                >
                                    <div
                                        style={{
                                            color: "blue",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <AttachMoneyIcon
                                            style={{ marginRight: "8px" }}
                                        />
                                        <div style={{ fontSize: "24px" }}>
                                            {formatCurrency(
                                                totalAmountOfRegistration -
                                                    totalAmountOfRefund
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hàng chứa ComboBox Năm và Tháng */}
                            <div style={{ display: "flex", gap: "8px" }}>
                                {/* Dropdown for selecting year */}
                                <FormControl
                                    style={{ margin: "10px", width: "33%" }}
                                >
                                    <InputLabel id="select-year-label">
                                        Năm
                                    </InputLabel>
                                    <Select
                                        labelId="select-year-label"
                                        id="select-year"
                                        value={selectedYear}
                                        onChange={handleYearChange}
                                        label="Năm"
                                        fullWidth
                                    >
                                        {uniqueYears.map((year) => (
                                            <MenuItem key={year} value={year}>
                                                {year}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Dropdown for selecting month */}
                                <FormControl
                                    style={{ margin: "10px", width: "33%" }}
                                >
                                    <InputLabel id="select-month-label">
                                        Tháng
                                    </InputLabel>
                                    <Select
                                        labelId="select-month-label"
                                        id="select-month"
                                        value={selectedMonth}
                                        onChange={handleMonthChange}
                                        label="Tháng"
                                        fullWidth
                                    >
                                        <MenuItem value={null}>Tất cả</MenuItem>
                                        {Array.from(
                                            { length: 12 },
                                            (_, index) => (
                                                <MenuItem
                                                    key={index + 1}
                                                    value={index + 1}
                                                >
                                                    {index + 1}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            </div>

                            <Paper
                                elevation={3}
                                style={{
                                    padding: "20px",
                                    marginTop: "10px",
                                    flexGrow: 1,
                                }}
                            >
                                <div
                                    style={{
                                        padding: "20px",
                                        marginTop: "20px",
                                    }}
                                >
                                    <Box sx={{ height: 400, width: "100%" }}>
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: {
                                                        pageSize: 5,
                                                    },
                                                },
                                            }}
                                            pageSizeOptions={[5]}
                                            disableRowSelectionOnClick
                                            getRowId={(row) => row.stt}
                                        />
                                    </Box>
                                </div>
                            </Paper>
                        </div>
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

export default memo(FinancialReport);
