import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { KhachHang_DangKyTaiKhoan } from "../../../api/connect";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSnackbar } from "../../../context/SnackbarContext";

const Register = () => {
    const { openSnackbar } = useSnackbar();
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    //Bảng thông báo

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "username") {
            const usernameRegex = /^[a-zA-Z0-9_@#&]+$/;
            setUsernameError(!usernameRegex.test(e.target.value));
        }
        if (e.target.name === "password") {
            const usernameRegex = /^[a-zA-Z0-9_@#&]+$/;
            setPasswordError(!usernameRegex.test(e.target.value));
        }
        if (e.target.name === "confirmPassword") {
            const usernameRegex = /^[a-zA-Z0-9_@#&]+$/;
            setConfirmPasswordError(!usernameRegex.test(e.target.value));
        }
        // Check if passwords match when typing in the confirmation field
        if (e.target.name === "confirmPassword") {
            setConfirmPasswordError(e.target.value !== formData.password);
        }
    };

    const validateForm = () => {
        if (usernameError || passwordError || confirmPasswordError) {
            return "Vui lòng kiểm tra lại thông tin";
        }

        return null; // Validation passed
    };

    const fetchData = async () => {
        try {
            // const hashedPassword = await bcrypt.hash(formData.password, 10);
            const userData = {
                username: formData.username,
                password: formData.password,
                role: "Khách hàng",
            };
            // console.log(userData);
            const res = await KhachHang_DangKyTaiKhoan(userData);
            console.log(res);
            openSnackbar(res, "success");
        } catch (error) {
            // console.log(error.response.data);
            openSnackbar(error.response.data, "error");
        }
    };

    // Khi nhấn nút đăng ký tài khoản
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            openSnackbar(validationError, "error");
            return;
        }

        //Gọi API
        fetchData();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "200px 0px 50px 0px" }}
            >
                <Typography component="h1" variant="h5">
                    Đăng ký
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Tên người dùng"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={usernameError}
                        helperText={
                            usernameError &&
                            "Username chỉ được chứa chữ cái và số, dấu _ @ # &"
                        }
                    />
                    <TextField
                        label="Mật khẩu"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={passwordError}
                        helperText={
                            passwordError &&
                            "Password chỉ được chứa chữ cái và số, dấu _ @ # &"
                        }
                    />
                    <TextField
                        label="Xác nhận mật khẩu"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={confirmPasswordError}
                        helperText={
                            confirmPasswordError && "Mật khẩu không khớp"
                        }
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: "20px" }}
                    >
                        Đăng ký
                    </Button>
                    <Typography align="center" style={{ marginTop: "10px" }}>
                        <Link to="/login" variant="body2">
                            Đã có tài khoản? Đăng nhập
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Container>
    );
};

export default Register;
