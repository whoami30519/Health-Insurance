import { Button, Container, Paper, Tab, Tabs, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHoaDonNapTien, napTien } from "../../../api/connect";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useUser } from "../../../context/UserContext";

const Recharge = () => {
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();
    const [hoaDon, setHoaDon] = useState([]);
    const [value, setValue] = useState(0);
    const [maKH, setMaKH] = useState(params.id);
    const [soTien, setSoTien] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [soTienError, setSoTienError] = useState(null); // Trạng thái để theo dõi lỗi về số tiền
    const { user } = useUser();

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    function formatDateTime(dateTimeString) {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const date = new Date(dateTimeString);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;
        const formattedDate = date.toLocaleDateString("en-GB", options);

        return `${formattedTime} ${formattedDate}`;
    }

    const handleRecharge = async () => {
        try {
            const confirmRecharge = window.confirm(
                "Bạn có chắc chắn muốn nạp tiền?"
            );

            if (confirmRecharge) {
                setLoading(true);

                // Kiểm tra nếu số tiền không hợp lệ
                if (!soTien || isNaN(Number(soTien)) || Number(soTien) <= 0) {
                    setSoTienError("Số tiền không hợp lệ");
                    setLoading(false);
                    return;
                } else if (Number(soTien) % 10000 !== 0) {
                    setSoTienError("Số phải chia hết cho 10,000");
                    setLoading(false);
                    return;
                } else {
                    setSoTienError(null);
                }

                const response = await napTien(
                    localStorage.getItem("token"),
                    maKH,
                    soTien
                );
                openSnackbar("Nạp tiền thành công", "success");
                // Nạp tiền thành công, refresh danh sách lịch sử
                fetchHistory();
            }
        } catch (error) {
            try {
                openSnackbar(error.response.data, "error");
            } catch {
                openSnackbar("Có lỗi xảy ra khi kết nối với máy chủ", "error");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSoTienChange = (e) => {
        const inputValue = e.target.value;

        // Kiểm tra nếu số tiền không hợp lệ
        if (
            !inputValue ||
            isNaN(Number(inputValue)) ||
            Number(inputValue) <= 0
        ) {
            setSoTienError("Số tiền không hợp lệ");
        } else if (Number(inputValue) % 10000 !== 0) {
            setSoTienError("Số phải chia hết cho 10,000");
        } else {
            setSoTienError(null);
        }

        setSoTien(inputValue);
    };

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const x = await getHoaDonNapTien(localStorage.getItem("token"));
            setHoaDon(x);
            console.log("Thông tin hóa đơn:", x);
        } catch (error) {
            try {
            } catch {
                openSnackbar("Có lỗi xảy ra khi kết nối với máy chủ", "error");
            }
        } finally {
            setLoading(false);
        }
    };
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
        return formattedAmount;
    };
    // Đổ dữ liệu vào rows trong DataGrid
    const rows = hoaDon.map((row) => ({
        maHD: row.maHD,
        soTien: formatCurrency(row.soTien),
        soDu: formatCurrency(row.soDu),
        thoiGianNap: formatDateTime(row.thoiGianNap),
        maKH: row.maKH,
        maNV: row.maNV,
    }));

    useEffect(() => {
        fetchHistory();
    }, [maKH]); // Thêm maKH vào dependency để tự động load lại khi maKH thay đổi

    const columns = [
        { field: "maHD", headerName: "Mã hóa đơn", width: 150 },
        { field: "soTien", headerName: "Số tiền (VND)", width: 150 },
        { field: "soDu", headerName: "Số dư (VND)", width: 150 },
        { field: "thoiGianNap", headerName: "Thời gian nạp", width: 200 },
        { field: "maKH", headerName: "Mã khách hàng", width: 150 },
        { field: "maNV", headerName: "Mã nhân viên", width: 150 },
    ];

    return (
        <>
            {user && user.role == "Nhân viên" ? (
                <>
                    <Container
                        component="main"
                        maxWidth="md"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100vh",
                        }}
                    >
                        <Paper
                            elevation={3}
                            style={{
                                padding: "20px",
                                marginTop: "120px",
                                marginBottom: "100px",
                            }}
                        >
                            <div>
                                <Tabs value={value} onChange={handleChangeTab}>
                                    <Tab label="Nạp tiền" />
                                    <Tab label="Lịch sử" />
                                </Tabs>

                                {value === 0 && (
                                    <div
                                        style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <TextField
                                            label="Mã KH"
                                            variant="outlined"
                                            fullWidth
                                            value={maKH}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginBottom: "10px" }}
                                        />
                                        <TextField
                                            label="Số tiền"
                                            variant="outlined"
                                            fullWidth
                                            type="number"
                                            value={soTien}
                                            onChange={handleSoTienChange}
                                            error={!!soTienError}
                                            helperText={soTienError}
                                            style={{ marginBottom: "10px" }}
                                        />
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => navigate(-1)}
                                                disabled={loading}
                                                style={{ width: "48%" }}
                                            >
                                                Quay lại
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleRecharge}
                                                disabled={
                                                    loading || !!soTienError
                                                }
                                                style={{ width: "48%" }}
                                            >
                                                Nạp tiền
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {value === 1 && (
                                    <div style={{ marginTop: "20px" }}>
                                        <Box
                                            sx={{ height: 600, width: "100%" }}
                                        >
                                            <DataGrid
                                                rows={rows}
                                                columns={columns}
                                                pageSize={5}
                                                disableRowSelectionOnClick
                                                slots={{ toolbar: GridToolbar }}
                                                slotProps={{
                                                    toolbar: {
                                                        showQuickFilter: true,
                                                    },
                                                }}
                                                initialState={{
                                                    pagination: {
                                                        paginationModel: {
                                                            pageSize: 5,
                                                        },
                                                    },
                                                }}
                                                pageSizeOptions={[5]}
                                                getRowId={(row) => row.maHD}
                                            />
                                        </Box>
                                    </div>
                                )}
                            </div>
                        </Paper>
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

export default memo(Recharge);
