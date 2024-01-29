// src/components/HomePage.js
import { Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

const HomePageAdmin = () => {
    const { user } = useUser();

    return (
        <>
            {user && user.role == "Admin" ? (
                <>
                    <Container component="main" maxWidth="lg">
                        <Paper
                            elevation={3}
                            style={{
                                padding: "20px",
                                marginTop: "120px",
                                marginBottom: "100px",
                                textAlign: "center",
                            }}
                        >
                            <Typography variant="h4" gutterBottom>
                                Chào mừng đến với trang chủ của bạn. Admin!
                            </Typography>
                            <Button
                                component={Link}
                                to="../admin/addnewstaff"
                                variant="contained"
                                style={{ marginRight: "10px" }}
                            >
                                Thêm mới nhân viên
                            </Button>
                            <Button
                                component={Link}
                                to="../admin/checkonstaff"
                                variant="contained"
                            >
                                Xem thông tin nhân viên
                            </Button>
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

export default HomePageAdmin;
