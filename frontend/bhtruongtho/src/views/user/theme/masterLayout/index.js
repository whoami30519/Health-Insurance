import { memo } from "react";
import Header from "../header";
import Footer from "../footer";
import { useUser } from "../../../../context/UserContext";
const MasterLayout = ({ children, ...props }) => {
    const { user } = useUser();

    // Kiểm tra nếu user là Nhân viên thì không hiển thị Header và Footer
    const shouldShowLayout = !user || (user && user.role !== "Nhân viên");

    return (
        <div {...props}>
            {<Header />}
            {children}
            {shouldShowLayout && <Footer />}
        </div>
    );
};

export default memo(MasterLayout);
