// Login.js
import {
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logingettoken } from "../../../api/connect";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useUser } from "../../../context/UserContext";

const Login = () => {
    const { openSnackbar } = useSnackbar();
    const { user, login } = useUser();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const validateForm = () => {
        const usernameRegex = /^[a-zA-Z0-9_@#&]+$/;
        if (!usernameRegex.test(formData.username)) {
            return "Username chỉ được chứa chữ cái và số, dấu _ @ # &";
        }

        if (!usernameRegex.test(formData.password)) {
            return "Password chỉ được chứa chữ cái và số, dấu _ @ # &";
        }
        return null; // Validation passed
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    // Khi nhấn nút đăng nhập
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validationError = validateForm();

            if (validationError) {
                openSnackbar(validationError, "error");
                return;
            }

            const res = await logingettoken(
                formData.username,
                formData.password
            );

            if (res) {
                login({
                    username: res.username,
                    token: res.token,
                    firstLogin: res.firstLogin,
                    role: res.role,
                });
                localStorage.setItem("token", res.token);
                localStorage.setItem("username", res.username);

                console.log("Login successful.");

                openSnackbar("Đăng nhập thành công", "success");
                if (res.role === "Nhân viên") {
                    navigate("/staff");
                    return;
                }
                if (res.role === "Admin") {
                    navigate("/admin");
                    return;
                }
                navigate("/");
            }
        } catch (error) {
            try {
                openSnackbar(error.response.data, "error");
            } catch {
                openSnackbar("Có lỗi xảy ra khi kết nối với máy chủ", "error");
            }
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "50px 0px 50px 0px" }}
            >
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="username"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                username: e.target.value,
                            })
                        }
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: "20px" }}
                    >
                        Đăng nhập
                    </Button>
                    <Grid
                        container
                        justifyContent="space-between"
                        style={{ marginTop: "10px" }}
                    >
                        <Grid item>
                            <Link to="/register" variant="body2">
                                Đăng ký
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link variant="body2">Quên mật khẩu</Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
