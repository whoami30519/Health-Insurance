import {
    Button,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDonDangKyByID } from "../../../api/connect";
import { ROUTERS } from "../../../utils/router";

const RegistrationDetail = () => {
    const params = useParams();
    const [registrationDetail, setRegistrationDetail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDonDangKyByID(
                    localStorage.getItem("token"),
                    params.id
                );
                console.log(response);
                setRegistrationDetail(response);
            } catch (error) {
                console.error("Error fetching registration detail:", error);
            }
        };
        fetchData();
    }, [params.id]);
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    return (
        <Container component="main" maxWidth="md">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "50px 0px 20px 0px" }}
            >
                {registrationDetail ? (
                    <>
                        <Typography component="h1" variant="h5">
                            Chi tiết đơn đăng ký {registrationDetail.maDonDK}
                        </Typography>
                        <TextField
                            style={{ marginTop: "20px" }}
                            label="Khách hàng"
                            value={registrationDetail.khachHang.hoTen}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                        <TextField
                            style={{ marginTop: "20px" }}
                            label="Gói bảo hiểm"
                            value={registrationDetail.goiBaoHiem.tenGoiBH}
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    style={{ marginTop: "20px" }}
                                    label="Thời gian đăng ký"
                                    value={dayjs(
                                        registrationDetail.thoiGianDK
                                    ).format("DD/MM/YYYY HH:mm:ss")}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {" "}
                                <TextField
                                    style={{ marginTop: "20px" }}
                                    label="Tổng giá"
                                    value={`${formatCurrency(
                                        registrationDetail.tongGia
                                    )}`}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    style={{ marginTop: "20px" }}
                                    label="Thời gian bắt đầu"
                                    value={dayjs(
                                        registrationDetail.thoiGianBD
                                    ).format("DD/MM/YYYY")}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {" "}
                                <TextField
                                    style={{ marginTop: "20px" }}
                                    label="Thời gian hết hạn"
                                    value={dayjs(
                                        registrationDetail.thoiGianHetHan
                                    ).format("DD/MM/YYYY")}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {" "}
                                <TextField
                                    style={{ marginTop: "20px" }}
                                    label="Tình trạng"
                                    value={registrationDetail.tinhTrang}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    style={{ marginTop: "20px" }}
                                    label="Nhân viên"
                                    value={
                                        registrationDetail.nhanVien
                                            ? registrationDetail.nhanVien
                                                  .hoTen || "Không có thông tin"
                                            : "Không có thông tin"
                                    }
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>{" "}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tên bệnh</TableCell>
                                        <TableCell>Mô tả</TableCell>
                                        <TableCell style={{ width: "135px" }}>
                                            Mức độ bệnh
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {registrationDetail &&
                                    registrationDetail.benh &&
                                    registrationDetail.benh.length > 0 ? (
                                        registrationDetail.benh.map((benh) => (
                                            <TableRow key={benh.benh.id}>
                                                <TableCell>
                                                    {benh.benh.tenBenh ||
                                                        "Không có thông tin"}
                                                </TableCell>
                                                <TableCell>
                                                    {benh.benh.moTa ||
                                                        "Không có thông tin"}
                                                </TableCell>
                                                <TableCell>
                                                    {benh.tinhTrang ||
                                                        "Không có thông tin"}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3}>
                                                Không có thông tin về bệnh
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button
                            color="primary"
                            fullWidth
                            style={{ marginTop: "20px" }}
                            component={Link}
                            to={`/${ROUTERS.USER.INVOICEHISTORYPAGE}`}
                        >
                            Quay lại
                        </Button>
                    </>
                ) : (
                    <TextField
                        label="Đang tải thông tin đơn đăng ký..."
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                )}
            </Paper>
        </Container>
    );
};

export default RegistrationDetail;
