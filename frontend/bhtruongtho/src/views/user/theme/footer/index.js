import { memo } from "react";
import { Link } from "react-router-dom";
import { HashLink as ScrollLink } from "react-router-hash-link";
import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container__header__footer">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <div className="footer_widget">
                            <div className="footer_about_logo">Liên hệ</div>
                            <ul>
                                <li>
                                    227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành
                                    phố Hồ Chí Minh
                                </li>
                                <li>
                                    Khu phố 6, Phường Linh Trung, Thành phố Thủ
                                    Đức, Thành phố Hồ Chí Minh
                                </li>
                                <li>
                                    <Link to="">0286 2884 499</Link>
                                </li>
                                <li>
                                    <Link to="">0287 3089 899</Link>
                                </li>
                                <li>
                                    <a
                                        href="mailto:bhtruongtho@gmail.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        bhtruongtho@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <div className="footer_widget">
                            <div className="footer_about_logo">
                                Về chúng tôi
                            </div>
                            <ul>
                                <li className="footer_about__">
                                    BARTENDER chuyên tư vấn, cung cấp các sản
                                    phẩm của Bảo hiểm Bảo Việt trên nền tảng
                                    trực tuyến. Liên hệ ngay để được tư vấn và
                                    hỗ trợ chuyên nghiệp nhất.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <div className="footer_widget">
                            <div className="footer_about_logo">Thông tin</div>
                            <ul>
                                <li>
                                    <ScrollLink
                                        smooth
                                        to="/#introduction-section"
                                        duration={500}
                                    >
                                        <div style={{ cursor: "pointer" }}>
                                            Giới thiệu
                                        </div>
                                    </ScrollLink>
                                </li>
                                <li>
                                    <ScrollLink
                                        smooth
                                        to="/contact/#contact-section"
                                        duration={500}
                                    >
                                        Tin tức và sự kiện
                                    </ScrollLink>
                                </li>
                                <li>
                                    <ScrollLink
                                        to="/#dieu-khoan-section"
                                        smooth={true}
                                        duration={500}
                                    >
                                        <div style={{ cursor: "pointer" }}>
                                            Điều khoản và điều kiện
                                        </div>
                                    </ScrollLink>
                                </li>
                                <li>
                                    <ScrollLink
                                        to="/#bao-mat-section"
                                        smooth={true}
                                        duration={500}
                                    >
                                        <div style={{ cursor: "pointer" }}>
                                            Chính sách bảo mật
                                        </div>
                                    </ScrollLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default memo(Footer);
