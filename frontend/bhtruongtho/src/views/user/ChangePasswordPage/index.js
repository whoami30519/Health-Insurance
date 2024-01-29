import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { changePasswordAPI } from "../../../api/connect";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useUser } from "../../../context/UserContext";

const ChangePasswordForm = () => {
    const { user } = useUser();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { openSnackbar } = useSnackbar();

    const isButtonDisabled =
        !currentPassword ||
        !newPassword ||
        !confirmPassword ||
        newPassword !== confirmPassword;

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!isValidPassword(newPassword)) {
            openSnackbar(
                "Mật khẩu không đúng định dạng. Yêu cầu ít nhất 8 ký tự đặc biệt, có ít nhất một ký tự hoa, một ký tự thường và một số.",
                "warning"
            );
            return;
        }
        if (isButtonDisabled) {
            openSnackbar("Mật khẩu không trùng khớp", "warning");
            return;
        }

        setLoading(true);

        try {
            const response = await changePasswordAPI(
                user.username,
                {
                    currentPassword,
                    newPassword,
                    confirmPassword,
                },
                localStorage.getItem("token")
            );

            if (response) {
                openSnackbar("Thay đổi password thành công", "success");
            }
        } catch (error) {
            console.log(error);
            openSnackbar(error.response.data, "warning");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "150px 0px 50px 0px" }}
            >
                <Typography component="h1" variant="h5">
                    Đổi mật khẩu
                </Typography>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleChangePassword(e);
                    }}
                >
                    <TextField
                        label="Mật khẩu hiện tại"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    <TextField
                        label="Mật khẩu mới"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <TextField
                        label="Nhập lại mật khẩu mới"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: "20px" }}
                    >
                        Đổi mật khẩu
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ChangePasswordForm;
