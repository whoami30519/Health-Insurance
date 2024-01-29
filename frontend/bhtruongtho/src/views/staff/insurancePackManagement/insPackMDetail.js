import { Button, Container, Paper, Snackbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React, { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getBenhByMaGBH,
    getGoiBHByMaGBH,
    updateInsPack,
} from "../../../api/connect";
import { ROUTERS } from "../../../utils/router";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useUser } from "../../../context/UserContext";

const InsPackDetailPage = () => {
    const params = useParams();
    //error và loading
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    //khai báo các biến
    const [dataGoiBH, setDataGoiBH] = useState(null);
    const [dataBenhByGBH, setDataBenhByGBH] = useState([]);
    const { openSnackbar } = useSnackbar();
    const { user } = useUser();

    //handle cho nút Tạo yêu cầu
    const handleVoHieuKichHoat = async () => {
        try {
            //goi api thay doi tinh trang goi bao hiem
            const responseData = await updateInsPack(
                localStorage.getItem("token"),
                params.id
            );
            openSnackbar(responseData, "success");
        } catch (error) {
            // Xử lý các lỗi khác (ví dụ: mất kết nối)
            //thông báo lỗi
            openSnackbar(error.response.data, "error");
        } finally {
            setLoading(false);
        }
    };
    //xử lý gọi api
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                //API cho tab1
                // Gọi API để lấy dữ liệu về gói Bảo hiểm
                const goiBHData = await getGoiBHByMaGBH(
                    params.id,
                    localStorage.getItem("token")
                );
                setDataGoiBH(goiBHData);

                // Gọi API để lấy dữ liệu về bệnh dựa trên mã gói Bảo hiểm
                const benhData = await getBenhByMaGBH(params.id);
                setDataBenhByGBH(benhData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dataGoiBH]); //những thuộc tính nếu thay đôi sẽ gọi lại useEffect

    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    return (
        <>
            {user && user.role == "Nhân viên" ? (
                <>
                    <Container component="main" maxWidth="lg">
                        <Paper
                            elevation={3}
                            style={{
                                padding: "20px",
                                marginTop: "40px",
                                marginBottom: "100px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "16px",
                                }}
                            >
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    color="primary"
                                >
                                    Chi tiết gói bảo hiểm
                                </Typography>
                            </div>
                            <div>
                                {/* <Grid container spacing={2}> */}
                                <Grid item xs={12} sm={5}>
                                    {dataGoiBH ? (
                                        <Paper
                                            elevation={3}
                                            style={{ padding: 16 }}
                                        >
                                            <Typography
                                                variant="h5"
                                                gutterBottom
                                            >
                                                {dataGoiBH.tenGoiBH}
                                            </Typography>
                                            <Typography>
                                                Mô tả: {dataGoiBH.motaGoiBH}
                                            </Typography>
                                            <Typography>
                                                Giá:{" "}
                                                {formatCurrency(dataGoiBH.gia)}{" "}
                                            </Typography>
                                            <Typography>
                                                Độ tuổi: {dataGoiBH.doTuoi}
                                            </Typography>
                                            <Typography>
                                                Tỉ lệ hoàn tiền:{" "}
                                                {dataGoiBH.tiLeHoanTien}%
                                            </Typography>
                                            <Typography>
                                                Thời hạn bảo vệ:{" "}
                                                {dataGoiBH.thoiHanBaoVe} năm
                                            </Typography>
                                            <Typography>
                                                Tình trạng:{" "}
                                                {dataGoiBH.tinhTrang}
                                            </Typography>
                                        </Paper>
                                    ) : (
                                        <Typography variant="body1">
                                            Loading...
                                        </Typography>
                                    )}

                                    {dataGoiBH && (
                                        <>
                                            <Paper
                                                elevation={3}
                                                style={{
                                                    marginTop: 16,
                                                    padding: 16,
                                                }}
                                            >
                                                <Typography
                                                    variant="h5"
                                                    gutterBottom
                                                >
                                                    Bệnh được áp dụng hoàn tiền
                                                </Typography>
                                                <List>
                                                    {dataBenhByGBH.map(
                                                        (benhItem, index) => (
                                                            <ListItem
                                                                key={index}
                                                            >
                                                                <ListItemText
                                                                    primary={`${benhItem.tenBenh}`}
                                                                />
                                                            </ListItem>
                                                        )
                                                    )}
                                                </List>
                                            </Paper>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    marginTop: "20px",
                                                }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    onClick={
                                                        handleVoHieuKichHoat
                                                    }
                                                    style={{
                                                        marginRight: "10px",
                                                    }}
                                                >
                                                    {dataGoiBH.tinhTrang ===
                                                    "Đang cung cấp"
                                                        ? "Vô hiệu gói bảo hiểm"
                                                        : "Kích hoạt gói bảo hiểm"}
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    component={Link}
                                                    to={`../${ROUTERS.USER.INSURANCEPACKM}`}
                                                >
                                                    Quay lại
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </Grid>
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

export default memo(InsPackDetailPage);
