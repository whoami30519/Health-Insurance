import React, { memo, useState, useEffect } from "react";
import {
    putYeuCauHoanTraByID,
    getNhanVienByID,
    getAllYeuCauHoanTraBYID,
    getUserInfoByToken,
} from "../../../api/connect";
import { useParams, Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import {
    Grid,
    Paper,
    Typography,
    Select,
    MenuItem,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import dayjs from "dayjs";
import { useSnackbar } from "../../../context/SnackbarContext";
import { ROUTERS } from "../../../utils/router";

const DetailPage = () => {
    const [loading, setLoading] = useState(true);
    const [yeuCauHoanTra, setYeuCauHoanTra] = useState({});
    const [soTienHoanTra, setSoTienHoanTra] = useState("");
    const { openSnackbar } = useSnackbar();

    const [selectedStatus, setSelectedStatus] = useState("");
    const [maNV, setMaNV] = useState("");
    const [nhanVien, setNhanVien] = useState("");
    const [thoiGianDuyet, setThoiGianDuyet] = useState("");
    const today = new Date();

    const params = useParams();
    const { user } = useUser();

    const [currentuser, setCurrentuser] = useState({});
    const formatDate = (date) =>
        dayjs(date).isValid() ? dayjs(date).format("DD/MM/YYYY") : "";
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
                console.error("Error fetching Nhan Vien data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    });
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (currentuser) {
                    const data = await getNhanVienByID(
                        currentuser,
                        localStorage.getItem("token")
                    );
                    setNhanVien(data);
                    setMaNV(data.maNV);
                    setThoiGianDuyet(today);
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
    });

    const updateStatus = async () => {
        try {
            if (yeuCauHoanTra.tinhTrang === "Chờ duyệt") {
                // Send a request to the backend to update the status to "Đã hoàn tiền"
                await putYeuCauHoanTraByID(
                    params.id,
                    {
                        tinhTrang: "Đã hoàn tiền",
                        maNV,
                        thoiGianDuyet,
                    },
                    localStorage.getItem("token")
                );
                openSnackbar("Cập nhật thành công!", "success");
            } else {
                openSnackbar("Trạng thái này không thể kích hoạt", "warning");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            openSnackbar("Có lỗi xảy ra khi cập nhật!", "error");
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (params.id) {
                    // Fetch updated data after updating the status
                    const updatedData = await getAllYeuCauHoanTraBYID(
                        params.id,
                        localStorage.getItem("token")
                    );
                    setYeuCauHoanTra(updatedData);
                    console.log("ok");
                } else {
                    console.error("No selected ID found.");
                }
            } catch (error) {
                console.error("Error fetching Yeu Cau Hoan Tra data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id, yeuCauHoanTra]);

    // Vietnamese names for keys
    const allrows = {
        maYC: <strong>Mã YC</strong>,
        maHDKhamBenh: <strong>Mã HĐ Khám Bệnh</strong>,
        tenBenhVien: <strong>Tên Bệnh Viện</strong>,
        soTienDaKham: <strong>Số Tiền Đã Khám</strong>,
        benh: <strong>Bệnh</strong>,
        thoiGianTao: <strong>Thời Gian Tạo</strong>,
        tinhTrang: <strong>Tình Trạng</strong>,
        maGoiBHApDung: <strong>Mã Gói Bảo Hiểm Áp Dụng</strong>,
        soTienHoanTra: <strong>Số Tiền Hoàn Trả</strong>,
        maKH: <strong>Mã Khách Hàng</strong>,
        maNV: <strong>Mã Nhân Viên</strong>,
        thoiGianDuyet: <strong>Thời Gian Duyệt</strong>,
    };

    return (
        <div className="container__body">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper style={{ margin: "20px" }}>
                        <TableContainer
                            component={Paper}
                            style={{
                                borderCollapse: "collapse",
                                border: "1px solid #ddd",
                                padding: "20px",
                            }}
                        >
                            <Typography
                                variant="h5"
                                gutterBottom
                                style={{ color: "rgb(25, 118, 210)" }}
                            >
                                Yêu cầu hoàn trả{" "}
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Thuộc Tính</strong>
                                        </TableCell>
                                        <TableCell>Giá Trị</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(yeuCauHoanTra).map(
                                        ([key, value]) => (
                                            <TableRow key={key}>
                                                <TableCell>
                                                    {allrows[key]}
                                                </TableCell>
                                                <TableCell>
                                                    {key === "thoiGianDuyet" ||
                                                    key === "thoiGianTao"
                                                        ? formatDate(value)
                                                        : key ===
                                                              "soTienHoanTra" ||
                                                          key === "soTienDaKham"
                                                        ? formatCurrency(value)
                                                        : value}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}

                                    <TableRow>
                                        <TableCell
                                            style={{
                                                textAlign: "left",
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Button
                                                variant="outlined"
                                                component={Link}
                                                to={`../${ROUTERS.USER.YEUCAUHOANTRA}`}
                                            >
                                                Quay lại
                                            </Button>
                                        </TableCell>
                                        <TableCell
                                            style={{ textAlign: "right" }}
                                        >
                                            <Button
                                                variant="outlined"
                                                onClick={updateStatus}
                                            >
                                                Duyệt
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default memo(DetailPage);
