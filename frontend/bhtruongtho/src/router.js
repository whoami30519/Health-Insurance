import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./views/user/homePage";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./views/user/theme/masterLayout";
import ProfilePage from "./views/user/contactPage";
import ProductDetailPage from "./views/user/productPage/detail.js";
import ProductPage from "./views/user/productPage/index.js";
import Login from "./views/user/loginPage";
import Register from "./views/user/registerPage/index.js";
import RequestInvoicePage from "./views/user/requestInvoicePage";
import HomePageStaff from "./views/staff/homePageStaff";
import ChangePassword from "./views/user/ChangePasswordPage";
import { useUser } from "../src/context/UserContext.js";
import InsuranceRegistration from "./views/user/InsuranceRegistration";
import ListDonDangKy from "./views/staff/registrationForm/index.js";
import DonDangKyDetail from "./views/staff/registrationForm/regisdetail.js";
import Profile from "./views/user/profilePage/index.js";
import Pay from "./views/user/payPage/index.js";
import PaidDetail from "./views/user/payPage/paidDetail.js";
import UnPaidDetail from "./views/user/payPage/unpaidDetail.js";
import InfoCustomer from "./views/staff/infoCustomer/index.js";
import Recharge from "./views/staff/infoCustomer/recharge.js";
import FinancialReport from "./views/staff/financialReport";
import InsurancePack from "./views/staff/insurancePackManagement/index.js";
import InsPackDetailPage from "./views/staff/insurancePackManagement/insPackMDetail.js";
import AddInsPack from "./views/staff/insurancePackManagement/addInsPack.js";
import InfoCustomerDetail from "./views/staff/infoCustomer/detail.js";
import HistoryPay from "./views/staff/infoCustomer/historyPay.js";
import Admin from "./views/admin/createstaff/index.js";
import HomePageAdmin from "./views/admin/homePage/index.js";

import CheckOnStaff from "./views/admin/checkOnStaff/index.js";

import ListYeuCauHoanTra from "./views/staff/requestRefund/index.js";
import YeuCauHoanTraDetail from "./views/staff/requestRefund/detailycht.js";
import Transactions from "./views/user/transactionsPage";
import InvoiceHistory from "./views/user/InvoiceHistoryPage/index.js";
import InvoiceHistoryDetail from "./views/user/InvoiceHistoryPage/detail.js";
import { useEffect } from "react";
import { dayCalendarSkeletonClasses } from "@mui/x-date-pickers";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInfoByToken } from "./api/connect";
import { useSnackbar } from "./context/SnackbarContext";
import { CachedTwoTone } from "@mui/icons-material";

const AuthGuard = ({ component: Component, loginRequired, onlyStaff }) => {
    const { user, login, logout } = useUser();

    //Nếu loginRequired=true và Không_Có_Koken
    // const userInfo = {};
    // try {
    //     userInfo = getUserInfoByToken(localStorage.getItem("token"));
    // } catch {}
    if (loginRequired && !localStorage.getItem("token")) {
        return <Navigate to={`/${ROUTERS.USER.LOGIN}`} />;
    }
    // else if (userInfo && userInfo.role == "Nhân viên" && onlyStaff)
    //     return <Navigate to={`/${ROUTERS.USER.HOME}`} />;
    return Component;
};

const RouterCustom = () => {
    const location = useLocation();
    const { user } = useUser();
    const navigate = useNavigate();

    // const kiemtra_FirstLogin = (token) => {
    //     const res = getUserInfoByToken(localStorage.getItem("token"));
    //     return;
    // };
    //Mỗi khi có đường dẫn thay đổi thì kiểm tra
    useEffect(() => {
        // Hành động mà bạn muốn thực hiện khi đường dẫn thay đổiconst userInfo = {};
        // let userInfo;
        // try {
        //     const res = getUserInfoByToken(localStorage.getItem("token"));
        //     res.then((userInfo) => {
        //         console.log(userInfo);
        //     }).catch((error) => {
        //         console.error("Error getting user info:", error);
        //     });
        // } catch {}

        console.log("Đường dẫn đã thay đổi:", location.pathname);
        if (user && user.firstLogin) {
            navigate("/Profile");
        }
        // if (onlyStaff && userInfo.role != "Nhân viên") {
        //     navigate("/");
        // }
    }, [location.pathname]);
    const userRouters = [
        {
            path: ROUTERS.USER.HOMEPAGEADMIN,
            component: <HomePageAdmin />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.CHECKONSTAFF,
            component: <CheckOnStaff />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.ADMINADDNEWSTAFF,
            component: <Admin />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />,
            loginRequired: false,
        },
        {
            path: ROUTERS.USER.CONTACT,
            component: <ProfilePage />,
            loginRequired: false,
        },
        {
            path: ROUTERS.USER.PRODUCT,
            component: <ProductPage />,
            //loginRequired: false,
            loginRequired: false,
        },
        {
            path: ROUTERS.USER.LOGIN,
            component: <Login />,
            loginRequired: false,
        },
        {
            path: ROUTERS.USER.REGISTER,
            component: <Register />,
            showHeader: false, // Không hiển thị header ở trang đăng ký
            showFooter: false, // Không hiển thị footer ở trang đăng ký
            loginRequired: false,
        },
        {
            path: ROUTERS.USER.CHANGEPASSWORD,

            component: <ChangePassword />,
            loginRequired: true,
        },

        {
            path: ROUTERS.USER.INVOICEHISTORYPAGE,
            component: <InvoiceHistory />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.PAY,
            component: <Pay />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.STAFF,
            component: <HomePageStaff />,
            loginRequired: true,
            onlyStaff: true,
        },
        {
            path: ROUTERS.USER.REQUESTINVOICE,
            component: <RequestInvoicePage />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <Profile />,
            loginRequired: true,
        },
        {
            path: `${ROUTERS.USER.INSURANCEREGISTRATION}/:id`,
            component: <InsuranceRegistration />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.DONDANGKY,
            component: <ListDonDangKy />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.INSURANCEPACKM,
            component: <InsurancePack />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.ADDINSPACK,
            component: <AddInsPack />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.YEUCAUHOANTRA,
            component: <ListYeuCauHoanTra />,
            loginRequired: true,
        },

        {
            path: ROUTERS.USER.TRANSACTION,
            component: <Transactions />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.INFOCUSTOMER,
            component: <InfoCustomer />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.FINANCIALREPORT,
            component: <FinancialReport />,
            loginRequired: true,
        },
    ];

    return (
        <MasterLayout>
            <Routes>
                {userRouters.map((item, key) => (
                    <Route
                        key={key}
                        path={item.path}
                        // element={item.component}
                        // element={<AuthGuard item.component item.loginRequired  />}
                        element={
                            <AuthGuard
                                component={item.component}
                                loginRequired={item.loginRequired}
                                onlyStaff={item.onlyStaff}
                            />
                        }
                    />
                ))}{" "}
                <Route
                    path="product/detail/:id"
                    element={<ProductDetailPage />}
                />
                <Route
                    path="InsuranceRegistration/:id"
                    element={<InsuranceRegistration />}
                />{" "}
                <Route
                    path="invoiceHistory/detail/:id"
                    element={<InvoiceHistoryDetail />}
                />{" "}
                <Route
                    path="staff/registrationForms/detail/:id"
                    element={<DonDangKyDetail />}
                />
                <Route
                    path="staff/InfoCustomer/detail/:id"
                    element={<InfoCustomerDetail />}
                />
                <Route
                    path="staff/requestrefund/detail/:id"
                    element={<YeuCauHoanTraDetail />}
                />
                <Route
                    path="staff/insurancePackManagement/detail/:id"
                    element={<InsPackDetailPage />}
                />
                <Route path="pay/detailPaid/:id" element={<PaidDetail />} />
                <Route path="pay/detailUnpaid/:id" element={<UnPaidDetail />} />
                <Route
                    path="staff/infoCustomer/recharge/:id"
                    element={<Recharge />}
                />
                <Route
                    path="staff/infoCustomer/historyPay/:id"
                    element={<HistoryPay />}
                />
            </Routes>
        </MasterLayout>
    );
};

export default RouterCustom;

// const AuthGuard = ({ component, loginRequired }) => {
//     // Kiểm tra xem user có tồn tại hay không
//     const isAuthenticated = user !== null;

//     // Nếu yêu cầu đăng nhập và user không tồn tại, chuyển hướng đến trang đăng nhập
//     if (loginRequired && !isAuthenticated) {
//       return <Navigate to={ROUTERS.USER.LOGIN} />;
//     }

//     // Nếu user tồn tại hoặc không yêu cầu đăng nhập, hiển thị component được chuyển vào
//     return component;
//   };
