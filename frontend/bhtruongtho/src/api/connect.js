import axiosClient from "./axiosClient";

const END_POINT = {
    GOIBAOHIEM: "GoiBaoHiem",
    BENH: "Benh",
    TaiKhoan: "User",
    KHACHHANG: "KhachHang",
    LOGIN: "Auth/login",
    info: "Auth/userinfo",
    CHANGEPASSWORD: "ChangePassword",
    YEUCAUHOANTRA: "YeuCauHoanTra",
    TAOYEUCAU: "TaoYeuCauHoanTra",
    GOIBHBYCUS: "GetGoiBHByCus",
    YCHTBYCUS: "GetYCHTByCus",
    BENHVIEN: "BenhVien",
    DONDANGKY: "DONDANGKY",
    NHANVIEN: "NhanVien",
    HOADONDK: "HoaDonThanhToanDK/GetHoaDonThanhToanByTinhTrang",
    HOADONDKDETAIL: "HoaDonThanhToanDK/GetHoaDonDetails",
    UPDATEHOADON: "HoaDonThanhToanDK/updateKhiThanhToan",
    CHINHSACH: "chinhsach",
    ADD: "add",
    UPDATE: "update",
    CAPNHATYEUCAU: "CapNhat",
    GETALLYEUCAUHOANTRA: "GetAllYeuCauHoanTra",
    HOADONTHANHTOANDK: "HoaDonThanhToanDK",
    KH_LICHSUGD: "HoaDonThanhToanDK/KH_GetLichSuGiaoDich",
    INFOALLCUSTOMER: "KhachHang/GetAllKhachHang",
    PUNISH: "HoaDonThanhToanDK/capNhatHoaDon",
    REPORT: "HoaDonThanhToanDK/GetTongHopHoaDon",
    HOADONKHAMBENH: "HoaDonKhamBenh",
    GETSOTIENKHAM: "GetSoTienKham",
    RECHARGE: "KhachHang/NapTien",
    HOADONNAPTIEN: "NhanVien/GetHoaDonNapTien",
    THONGTINTRANGCHUSTAFF: "NhanVien/ThongTinTongHop",
    LICHSUTHANHTOAN: "HoaDonThanhToanDK/LichSuThanhToan",
};

export const getGoiBHAPI = () => {
    return axiosClient.get(`${END_POINT.GOIBAOHIEM}`);
};

export const logingettoken = (username, password) => {
    const data = {
        username: username,
        password: password,
    };
    return axiosClient.post(`${END_POINT.LOGIN}`, data);
};

export const getTaiKhoanByUsername = (username) => {
    return axiosClient.get(`${END_POINT.TaiKhoan}/${username}`);
};

// Hàm đăng ký tài khoản mới
export const KhachHang_DangKyTaiKhoan = (khachHangData) => {
    return axiosClient.post(`${END_POINT.TaiKhoan}`, khachHangData);
};

//Hàm lấy thông tin đăng nhập của user
export const getUserInfoByToken = (token) => {
    return axiosClient.get(`${END_POINT.info}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
//Hàm lấy thông tin đăng nhập của user
export const getStaffHompageInfo = (token) => {
    return axiosClient.get(`${END_POINT.THONGTINTRANGCHUSTAFF}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Hàm lấy thông tin cá nhân khách hàng
export const getKhachHangInformation = (token) => {
    return axiosClient.get(`${END_POINT.KHACHHANG}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getKhachHangInformationByID = (token, ID) => {
    return axiosClient.get(`${END_POINT.KHACHHANG}/${ID}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

//Hàm cập nhật thông tin khách hàng
export const updateKhachHangInformation = (token, khachHangData) => {
    return axiosClient.post(`${END_POINT.KHACHHANG}`, khachHangData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getGoiBHByMaGBH = (MaGBH, token) => {
    return axiosClient.get(`${END_POINT.GOIBAOHIEM}/${MaGBH}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getBenhByMaGBH = (MaGBH) => {
    return axiosClient.get(`${END_POINT.BENH}/${MaGBH}`);
};

export const changePasswordAPI = async (
    username,
    changePasswordData,
    token
) => {
    try {
        const response = await axiosClient.put(
            `${END_POINT.TaiKhoan}/${username}/${END_POINT.CHANGEPASSWORD}`,
            changePasswordData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response;
    } catch (error) {
        //console.error('Error:', error);
        throw error;
    }
};

export const createRequest = async (yeuCauData) => {
    const response = await axiosClient.post(
        `${END_POINT.YEUCAUHOANTRA}/${END_POINT.TAOYEUCAU}`,
        yeuCauData
    );
    return response;
};

export const getAllBenh = () => {
    return axiosClient.get(`${END_POINT.BENH}`);
};

export const getGoiBHByCus = (token) => {
    return axiosClient.get(`${END_POINT.GOIBAOHIEM}/${END_POINT.GOIBHBYCUS}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getYCHTByCus = (token) => {
    const res = axiosClient.get(
        `${END_POINT.YEUCAUHOANTRA}/${END_POINT.YCHTBYCUS}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res;
};

export const getBenhVienAPI = () => {
    return axiosClient.get(`${END_POINT.BENHVIEN}`);
};
export const getDonDangKyList = (token) => {
    return axiosClient.get(`${END_POINT.DONDANGKY}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getDonDangKyByID = (token, ID) => {
    return axiosClient.get(`${END_POINT.DONDANGKY}/${ID}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getNhanVienByID = (ID, token) => {
    return axiosClient.get(`${END_POINT.NHANVIEN}/${ID}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
// Import axiosClient và END_POINT từ nơi khác trong code của bạn

export const postNhanVien = (data, token) => {
    return axiosClient.post(`${END_POINT.NHANVIEN}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllNhanVien = (token) => {
    return axiosClient.get(`${END_POINT.NHANVIEN}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const putDonDangKyByID = async (ID, Data, token) => {
    try {
        console.log(Data);
        const response = await axiosClient.put(
            `${END_POINT.DONDANGKY}/${ID}`,
            Data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw new Error(`Error chang DDK: ${error.message}`);
    }
};
//Lấy hóa đơn theo  tình trạng
export const getHoaDonDKbyTinhTrang = (token, tinhTrang) => {
    return axiosClient.get(`${END_POINT.HOADONDK}/${tinhTrang}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const putYeuCauHoanTraByID = async (ID, Data, token) => {
    try {
        const response = await axiosClient.put(
            `${END_POINT.YEUCAUHOANTRA}/${END_POINT.CAPNHATYEUCAU}/${ID}`,
            Data,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw new Error(`Error change YCHT: ${error.message}`);
    }
};

export const updateInsPack = async (token, maGoiBH) => {
    const response = await axiosClient.put(
        `${END_POINT.GOIBAOHIEM}/${maGoiBH}/${END_POINT.UPDATE}`,
        null, // Bạn có thể truyền body request ở đây nếu cần
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // Thêm header Content-Type nếu cần
            },
        }
    );

    return response;
};

export const addBenhForGBH = async (token, MaGoiBH, MaBenh) => {
    const response = await axiosClient.post(
        `${END_POINT.CHINHSACH}/${END_POINT.ADD}`,
        { MaGoiBH, MaBenh },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // Thêm header Content-Type nếu cần
            },
        }
    );
    return response;
};

export const deleteBenhFromBGH = async (token, maGoiBH, maBenh) => {
    try {
        // Gọi API xóa bệnh khỏi Gói Bảo hiểm
        const response = await axiosClient.delete(
            `${END_POINT.CHINHSACH}/${maGoiBH}/${maBenh}/delete`
        );
        return response;
    } catch (error) {
        // Xử lý lỗi nếu cần
        console.error("Lỗi khi xóa bệnh khỏi Gói Bảo hiểm:", error.message);
        throw error;
    }
};

export const addInsPack = async (token, goiBHData) => {
    const response = await axiosClient.post(
        `${END_POINT.GOIBAOHIEM}/${END_POINT.ADD}`,
        goiBHData, // Bạn có thể truyền body request ở đây nếu cần
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // Thêm header Content-Type nếu cần
            },
        }
    );

    return response;
};

export const getAllYeuCauHoanTra = (token) => {
    return axiosClient.get(
        `${END_POINT.YEUCAUHOANTRA}/${END_POINT.GETALLYEUCAUHOANTRA}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getAllYeuCauHoanTraBYID = (ID, token) => {
    return axiosClient.get(`${END_POINT.YEUCAUHOANTRA}/${ID}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
//Hàm đăng ký gói bảo hiểm mới cho khách
export const KH_post_DonDangKy = (token, data) => {
    return axiosClient.post(`${END_POINT.DONDANGKY}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
//Lấy chi tiết hóa đơn (thông tin GoiBH, DonDangKy, HoaDon)
export const getHoaDonDKDaThanhToanDetail = (maHD) => {
    return axiosClient.get(`${END_POINT.HOADONDKDETAIL}/${maHD}`);
};
export const postUpdateHoaDon = (token, maHD) => {
    console.log(token);
    console.log(maHD);
    return axiosClient.post(
        `${END_POINT.UPDATEHOADON}/${maHD}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

//Hàm đăng ký gói bảo hiểm mới cho khách
export const KH_getBillList = (token) => {
    return axiosClient.get(`${END_POINT.KH_LICHSUGD}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

//Hàm Nhân viên lấy thông tin khách hàng
export const NV_getInfoCustomer = (token) => {
    return axiosClient.get(`${END_POINT.INFOALLCUSTOMER}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
//Khi khách hàng vừa Login thì hệ thống sẽ kiểm tra khách hàng có hóa đơn trễ hạn hay k?

export const phatThanhToanTreHan = (token) => {
    return axiosClient.post(END_POINT.PUNISH, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const NV_getTongHopHoaDon = (token) => {
    return axiosClient.get(`${END_POINT.REPORT}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getSoTienKhamByCus = (token, MaHDKhamBenh, MaBV) => {
    return axiosClient.get(
        `${END_POINT.HOADONKHAMBENH}/${END_POINT.GETSOTIENKHAM}/${MaHDKhamBenh}/${MaBV}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getGoiBHByNV = (token) => {
    return axiosClient.get(`${END_POINT.GOIBAOHIEM}/${END_POINT.NHANVIEN}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getHoaDonNapTien = (token) => {
    return axiosClient.get(`${END_POINT.HOADONNAPTIEN}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const napTien = (token, maKH, soTien) => {
    return axiosClient.post(
        `${END_POINT.RECHARGE}`,
        { maKH, soTien },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getLichSuThanhToan = (maKH, token) => {
    return axiosClient.get(`${END_POINT.LICHSUTHANHTOAN}/${maKH}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
