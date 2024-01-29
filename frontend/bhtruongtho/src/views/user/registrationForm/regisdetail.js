import React, { memo, useState, useEffect } from 'react';
import { getDonDangKyByID, getNhanVienByID, putDonDangKyByID, getUserInfoByToken } from '../../../api/connect';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Button, Input, FormLabel } from '@mui/material';
import { useSnackbar } from "../../../context/SnackbarContext";



const DetailPage = () => {
    const [loading, setLoading] = useState(true);
    const [donDangKy, setDonDangKy] = useState([]);
    const [nhanVien, setNhanVien] = useState([]);
    const [maNV, setmaNV] = useState('');
    const [thoiGianDuyet, setThoiGianDuyet] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [hoTen, setHoTen] = useState('')
    const [email, setEmail] = useState('')
    const [sdt, setSdt] = useState('')
    const today = new Date()
    const { openSnackbar } = useSnackbar();
    const [reasonForDenial, setReasonForDenial] = useState('');
    const [showDenialReasonInput, setShowDenialReasonInput] = useState(false);

    const params = useParams();
    const [currentuser, setCurrentuser] = useState({})
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
                const data = await getUserInfoByToken(localStorage.getItem("token"));
                setCurrentuser(data.username)
            } catch (error) {
                console.error('Error fetching Nhan Vien data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (params.id) {
                    const data = await getDonDangKyByID(localStorage.getItem("token"), params.id);
                    setDonDangKy(data);
                } else {
                    console.error('No selected ID found.');
                }
            } catch (error) {
                console.error('Error fetching Don Dang Ky data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]); // Thêm snackbarOpen vào dependencies

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (currentuser) {
                    const data = await getNhanVienByID(currentuser, localStorage.getItem("token"));
                    setNhanVien(data);
                    setmaNV(data.maNV);
                    setThoiGianDuyet(today);
                    setDiaChi(data.diaChi);
                    setEmail(data.email);
                    setHoTen(data.hoTen);
                    setSdt(data.sdt);
                } else {
                    console.error('No username found.');
                }
            } catch (error) {
                console.error('Error fetching Nhan Vien data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();

    }, []); // Thêm snackbarOpen vào dependencies
    const updateStatus_accept = async () => {
        console.log('donDangKy.tinhTrang:', donDangKy.tinhTrang);

        try {
            if (donDangKy.tinhTrang === 'Chờ duyệt') {
                await putDonDangKyByID(params.id, {
                    tinhTrang: 'Đã kích hoạt',
                    maNV,
                    diaChi,
                    thoiGianDuyet,
                    email,
                    hoTen,
                    sdt,
                    liDoTuChoi: ''
                }, localStorage.getItem("token"));
                openSnackbar('Cập nhật thành công!', 'success');
            } else {
                openSnackbar('Trạng thái này không thể kích hoạt', 'warning');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            openSnackbar('Có lỗi xảy ra khi cập nhật!', 'error');
        }
    };
    const toggleDenialReasonInput = () => {
        setShowDenialReasonInput(!showDenialReasonInput);
    };

    const updateStatus_denied = async () => {
        console.log('donDangKy.tinhTrang:', donDangKy.tinhTrang);

        try {
            if (donDangKy.tinhTrang === 'Chờ duyệt') {
                if (showDenialReasonInput) {
                    // Kiểm tra xem lí do từ chối đã được nhập hay chưa
                    if (reasonForDenial.trim() === '') {
                        openSnackbar('Vui lòng nhập lí do từ chối!', 'warning');
                        return;
                    }

                    await putDonDangKyByID(params.id, {
                        tinhTrang: 'Bị từ chối',
                        maNV,
                        diaChi,
                        email,
                        hoTen,
                        sdt,
                        thoiGianDuyet,
                        liDoTuChoi: reasonForDenial, // Thêm lí do từ chối vào dữ liệu cập nhật
                    }, localStorage.getItem("token"));

                    openSnackbar('Cập nhật thành công!', 'success');
                } else {
                    // Mở phần nhập lí do từ chối
                    toggleDenialReasonInput();
                }
            } else {
                openSnackbar('Trạng thái này không thể kích hoạt', 'warning');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            openSnackbar('Có lỗi xảy ra khi cập nhật!', 'error');
        }
    };


    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    };
    return (
        <div className="container__body">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={12} sm={5}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <Typography variant="h4" style={{ paddingBottom: '10px', color: 'rgb(25, 118, 210)' }}>Thông tin gói bảo hiểm</Typography>
                            {donDangKy.goiBaoHiem ? (
                                <>
                                    <Typography variant="body1">Tên gói bảo hiểm: {donDangKy.goiBaoHiem.tenGoiBH}</Typography>
                                    <Typography variant="body1">Mô tả gói bảo hiểm: {donDangKy.goiBaoHiem.motaGoiBH}</Typography>
                                    <Typography variant="body1">Giá: {formatCurrency(donDangKy.goiBaoHiem.gia)}</Typography>

                                </>
                            ) : (
                                <Typography variant="body1">Goi Bao Hiem information not available.</Typography>
                            )}
                        </Paper>
                        <Paper elevation={3} style={{ marginTop: 16, padding: 16 }}>


                            <Typography variant="h4" style={{ paddingBottom: '10px', color: 'rgb(25, 118, 210)' }}>Thông tin khách hàng</Typography>
                            {donDangKy.khachHang ? (
                                <>
                                    <Typography variant="body1">Họ Tên: {donDangKy.khachHang.hoTen}</Typography>
                                    <Typography variant="body1">Địa Chỉ: {donDangKy.khachHang.diaChi}</Typography>
                                    <Typography variant="body1">Số điện thoại: {donDangKy.khachHang.sdt}</Typography>
                                    <Typography variant="body1">Email: {donDangKy.khachHang.email}</Typography>

                                    {/* Add more properties as needed */}
                                </>
                            ) : (
                                <Typography variant="body1">Khach Hang information not available.</Typography>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <Typography variant="h4" style={{ paddingBottom: '10px', color: 'rgb(25, 118, 210)' }}>Thông tin đơn đăng kí {params.id} </Typography>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Thời gian đăng ký: {new Date(donDangKy.thoiGianDK).toLocaleTimeString()} {new Date(donDangKy.thoiGianDK).toLocaleDateString()}</Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Thời gian bắt đầu: {donDangKy.thoiGianBD ? new Date(donDangKy.thoiGianBD).toLocaleTimeString() + ' ' + new Date(donDangKy.thoiGianBD).toLocaleDateString() : 'Chưa kích hoạt'}</Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Thời gian hết hạn: {donDangKy.thoiGianHetHan ? new Date(donDangKy.thoiGianHetHan).toLocaleTimeString() + ' ' + new Date(donDangKy.thoiGianHetHan).toLocaleDateString() : 'Chưa kích hoạt'}</Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Số kỳ hạn: {donDangKy.soKyHanThanhToan}</Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Tổng giá: {formatCurrency(donDangKy.tongGia)}</Typography>
                            </div>

                            <div style={{ backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Tình trạng hiện tại: {donDangKy.tinhTrang}</Typography>
                            </div>
                            <Typography variant="body1">
                                {showDenialReasonInput && (
                                    <div style={{ backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px', marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                                        <FormLabel htmlFor="denialReason" style={{ marginBottom: '4px' }}>Lí do từ chối:</FormLabel>
                                        <Input
                                            type="text"
                                            id="denialReason"
                                            value={reasonForDenial}
                                            onChange={(e) => setReasonForDenial(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '8px',
                                                boxSizing: 'border-box',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                            }}
                                        />
                                    </div>

                                )}
                            </Typography>

                        </Paper>

                    </Grid>
                    <Grid container spacing={2} style={{ padding: 16 }}>
                        <Grid item xs={6}>
                            <Button variant="contained" style={{ marginBottom: "10px", backgroundColor: 'rgb(25, 118, 210)' }} onClick={updateStatus_accept}>Duyệt đơn</Button>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" style={{ marginBottom: "10px", backgroundColor: 'rgb(25, 118, 210)' }} onClick={updateStatus_denied}>Từ chối</Button>
                        </Grid>
                    </Grid>

                </Grid>
            )
            }
        </div >
    );
};

export default memo(DetailPage);
