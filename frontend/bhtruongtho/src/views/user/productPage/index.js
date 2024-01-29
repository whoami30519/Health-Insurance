import { memo, useEffect, useState } from "react";
import { getGoiBHAPI } from "../../../api/connect";
import "./style.scss";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const importAll = (r) => r.keys().map(r);
const images = importAll(
    require.context("../../../images/goibaohiem", false, /\.(png|jpe?g|svg)$/)
);

const ProductPage = () => {
    const [goiBHs, setGoiBHs] = useState([]);
    const fetchData = async () => {
        setGoiBHs(await getGoiBHAPI());
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };

    const [currentPage, setCurrentPage] = useState(1);
    const goiBHsPerPage = 6;

    const startIndex = (currentPage - 1) * goiBHsPerPage;
    const endIndex = startIndex + goiBHsPerPage;
    const displayedGoiBHs = goiBHs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(goiBHs.length / goiBHsPerPage);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="container__body">
                <div className="productPage">
                    <ul>
                        <div className="cards__container">
                            {displayedGoiBHs.map((goiBH, goiBHKey) => (
                                <li
                                    key={startIndex + goiBHKey}
                                    className={`card__container ${
                                        goiBHKey === 0 ? "active" : ""
                                    }`}
                                >
                                    <div className="img-container">
                                        <img
                                            src={
                                                images[
                                                    (startIndex + goiBHKey) %
                                                        images.length
                                                ]
                                            }
                                            alt={`Gói Bảo Hiểm ${
                                                startIndex + goiBHKey + 1
                                            }`}
                                        ></img>
                                    </div>
                                    <div className="card__content">
                                        <div className="card__title">
                                            <h3> {goiBH.tenGoiBH}</h3>
                                        </div>
                                    </div>

                                    <div className="card__body">
                                        <p>{goiBH.motaGoiBH}</p>
                                        <p>Giá: {formatCurrency(goiBH.gia)}</p>
                                        <p>
                                            Tỉ lệ hoàn tiền:{" "}
                                            {goiBH.tiLeHoanTien}%
                                        </p>
                                    </div>

                                    <div className="card__btn">
                                        <Link to={`detail/${goiBH.maGoiBH}`}>
                                            <p>Xem thêm</p>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </div>
                    </ul>
                    <Stack
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        style={{ margin: "20px" }}
                    >
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            color="primary"
                        />
                    </Stack>
                </div>
            </div>
        </>
    );
};

export default memo(ProductPage);
