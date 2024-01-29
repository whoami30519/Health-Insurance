import { Button, Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNhanVien } from "../../../api/connect";
import { useUser } from "../../../context/UserContext";

const NhanVienList = () => {
    const [nhanVienList, setNhanVienList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllNhanVien(
                    localStorage.getItem("token")
                );
                console.log(response);
                const enhancedData = response.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                console.log(enhancedData);
                setNhanVienList(enhancedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { field: "maNV", headerName: "Mã NV", width: 100 },
        { field: "hoTen", headerName: "Họ Tên", width: 150 },
        { field: "diaChi", headerName: "Địa Chỉ", width: 200 },
        { field: "sdt", headerName: "Số Điện Thoại", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
    ];

    return (
        <>
            {user && user.role == "Admin" ? (
                <>
                    <Container component="main" maxWidth="xl">
                        <Paper
                            elevation={3}
                            style={{ padding: "20px", margin: "20px 0px " }}
                        >
                            <div style={{ padding: "20px", marginTop: "20px" }}>
                                <Typography component="h1" variant="h5">
                                    Thông tin nhân viên{" "}
                                </Typography>
                                <DataGrid
                                    rows={nhanVienList}
                                    columns={columns}
                                    pageSize={5}
                                    showFooter={false}
                                    hideFooterSelectedRowCount
                                    hideFooterPagination
                                />
                                <Button
                                    component={Link}
                                    to="/admin"
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#96B6C5",
                                        marginTop: "20px",
                                    }}
                                >
                                    Quay lại
                                </Button>
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

export default NhanVienList;
