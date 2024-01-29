import { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBenhByMaGBH, getGoiBHByMaGBH } from "../../../api/connect";
import { ROUTERS } from "../../../utils/router";
import "./style.scss";

const importAll = (r) => r.keys().map(r);
const images = importAll(
    require.context("../../../images/goibaohiem", false, /\.(png|jpe?g|svg)$/)
);

const ProductDetailPage = () => {
    const params = useParams();
    const [dataGoiBH, setDataGoiBH] = useState(null);
    const [dataBenh, setDataBenh] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi API để lấy dữ liệu về gói Bảo hiểm
                const goiBHData = await getGoiBHByMaGBH(params.id);
                setDataGoiBH(goiBHData);

                // Gọi API để lấy dữ liệu về bệnh dựa trên mã gói Bảo hiểm
                const benhData = await getBenhByMaGBH(params.id);
                setDataBenh(benhData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Mã gói bảo hiểm không hợp lệ</p>;
    }

    const imgStyle = {
        width: "100%", // Chiếm toàn bộ chiều rộng của container
        height: "300px", // Đảm bảo tỉ lệ khung hình ảnh được giữ nguyên
        transition: "transform 0.3s", // Hiệu ứng khi hover
    };

    return (
        <>
            <div className="container__body">
                <div className="detail__page">
                    <div className="detail__container">
                        <div className="img-container">
                            <img
                                src={images[(params.id % images.length) - 1]}
                                alt={`Gói Bảo Hiểm ${params.id}`}
                                style={imgStyle}
                            />
                        </div>
                        <div className="card-content">
                            <div className="detail__title">
                                <h3> {dataGoiBH.tenGoiBH}</h3>
                            </div>
                            <div className="detail__body">
                                <p>{dataGoiBH.motaGoiBH}</p>
                                <p>Giá: {formatCurrency(dataGoiBH.gia)} </p>
                                <p>
                                    Tỉ lệ hoàn tiền: {dataGoiBH.tiLeHoanTien}%
                                </p>
                                <p>
                                    Thời hạn bảo vệ: {dataGoiBH.thoiHanBaoVe}{" "}
                                    năm
                                </p>
                                <p>
                                    Gói bảo hiểm áp dụng hoàn tiền cho các bệnh
                                    sau:
                                </p>
                                <ul className="benh__list">
                                    {dataBenh.map((benhItem, index) => (
                                        <li key={index}>
                                            {`${benhItem.tenBenh}: ${benhItem.moTa}`}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="detail__btn">
                            <Link to={`../${ROUTERS.USER.PRODUCT}`}>
                                <p>Quay lại</p>
                            </Link>
                            <Link
                                to={`../../${ROUTERS.USER.INSURANCEREGISTRATION}/${params.id}`}
                            >
                                <p>Đăng ký</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(ProductDetailPage);
