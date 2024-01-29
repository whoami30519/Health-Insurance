import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import { getGoiBHAPI } from "../../../api/connect";
import "./style.scss";
const importAll = (r) => r.keys().map(r);
const images = importAll(
    require.context("../../../images/goibaohiem", false, /\.(png|jpe?g|svg)$/)
);
const imagesHome = importAll(
    require.context("../../../images/homepage", false, /\.(png|jpe?g|svg)$/)
);
const HomePage = () => {
    const NextIcon = <ChevronRightIcon fontSize="small" />;
    const PrevIcon = <ChevronLeftIcon fontSize="small" />;
    const [goiBHs, setgoiBHs] = useState([]);
    const fetchData = async () => {
        setgoiBHs(await getGoiBHAPI(localStorage.getItem("token")));
    };
    useEffect(() => {
        fetchData();
    }, []);
    const cardData = [
        {
            id: 1,
            title: "An Tâm Mỗi Ngày, Bảo Hiểm Đồng Hành",
            description: "An Tâm Mỗi Ngày, Bảo Hiểm Đồng Hành",
            imageUrl: imagesHome[0],
        },
        {
            id: 2,
            title: "Bảo Vệ Hạnh Phúc, Mỗi Gia Đình Là Một Chặng Đường An Toàn",
            description: "This is the description for Card 2.",
            imageUrl: imagesHome[1],
        },
        {
            id: 3,
            title: "Đối Tác Đáng Tin Cậy, Bảo Hiểm Vì Tương Lai Bạn",
            description: "This is the description for Card 3.",
            imageUrl: imagesHome[2],
        },
        // Add more card items as needed
    ];
    return (
        <>
            <Carousel
                autoPlay={true}
                animation="slide"
                interval={5000}
                timeout={500}
                navButtonsAlwaysVisible={true}
                navButtonsAlwaysInvisible={false}
                cycleNavigation={true}
                indicators={true}
                navButtonsProps={{
                    style: {
                        backgroundColor: "rgba(135, 206, 235, 0.5)",
                        borderRadius: 0,
                    },
                }}
                navButtonsWrapperProps={{
                    style: {
                        bottom: "0",
                        top: "unset",
                    },
                }}
                NextIcon={<IconButton>{NextIcon}</IconButton>}
                PrevIcon={<IconButton>{PrevIcon}</IconButton>}
            >
                {cardData.map((card) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <Card style={{ position: "relative" }}>
                            <CardMedia
                                component="img"
                                height="400"
                                src={card.imageUrl}
                                alt={card.title}
                                style={{ objectFit: "cover" }}
                            />

                            <CardContent
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    width: "100%",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                    padding: "10px",
                                }}
                            >
                                <Typography variant="h5" component="div">
                                    {card.title}
                                </Typography>
                                {/* <Typography variant="body2" color="text.secondary">
                //{card.description}
              </Typography> */}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Carousel>
            <Container component="main" maxWidth="xl">
                <Paper
                    id="introduction-section"
                    elevation={3}
                    style={{
                        padding: "20px",
                        margin: "40px",
                        textAlign: "left",
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Chào mừng đến với Bảo Hiểm BARTENDER!
                    </Typography>
                    <Typography paragraph>
                        Bảo Hiểm BARTENDER là đối tác đáng tin cậy trong lĩnh
                        vực bảo hiểm, cam kết mang lại sự an tâm và bảo vệ toàn
                        diện cho tương lai của quý khách. Chúng tôi tự hào về sứ
                        mệnh của mình, đó là giúp đỡ và hỗ trợ cộng đồng trong
                        việc xây dựng một tương lai tài chính vững mạnh và bền
                        vững.
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Chất Lượng Dịch Vụ:
                    </Typography>
                    <Typography paragraph>
                        Chất lượng dịch vụ là ưu tiên hàng đầu của chúng tôi.
                        Với đội ngũ chuyên viên giàu kinh nghiệm và chuyên
                        nghiệp, chúng tôi cam kết cung cấp những sản phẩm bảo
                        hiểm chất lượng cao, phù hợp với nhu cầu và mong muốn
                        của từng cá nhân và gia đình.
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Sản Phẩm Đa Dạng:
                    </Typography>
                    <Typography paragraph>
                        Chúng tôi cung cấp một loạt các sản phẩm bảo hiểm, bao
                        gồm bảo hiểm nhân thọ, bảo hiểm y tế, bảo hiểm tai nạn,
                        và nhiều sản phẩm khác. Điều này giúp quý khách lựa chọn
                        những gói bảo hiểm phù hợp với tình hình và mục tiêu tài
                        chính của mình.
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Chính Sách Linh Hoạt:
                    </Typography>
                    <Typography paragraph>
                        Chúng tôi hiểu rằng mỗi người đều khác nhau, do đó chính
                        sách bảo hiểm của chúng tôi được thiết kế để linh hoạt
                        và có thể tùy chỉnh. Quý khách có thể yên tâm rằng chúng
                        tôi sẽ tìm giải pháp tối ưu nhất để đáp ứng mọi nhu cầu
                        bảo vệ của mình.
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Cam Kết Hỗ Trợ:
                    </Typography>
                    <Typography paragraph>
                        Chúng tôi cam kết luôn đồng hành và hỗ trợ quý khách
                        hàng trong suốt hành trình sử dụng dịch vụ của chúng
                        tôi. Bằng cách cung cấp thông tin đầy đủ và minh bạch,
                        chúng tôi mong muốn tạo ra một môi trường tin cậy và an
                        tâm cho khách hàng.
                    </Typography>
                    <Typography>
                        Hãy để Bảo Hiểm BARTENDER là đối tác đồng hành đáng tin
                        cậy của quý khách trên con đường bảo vệ và xây dựng
                        tương lai. Cảm ơn quý khách đã tin tưởng và lựa chọn
                        chúng tôi!
                    </Typography>
                </Paper>

                <Paper
                    elevation={3}
                    style={{ padding: "20px", margin: "40px" }}
                >
                    <div style={{ marginBottom: "16px" }}>
                        <Typography variant="h5">
                            Sản phẩm trực tuyến
                        </Typography>
                        <Typography variant="body1">
                            Mua ngay các gói bảo hiểm chỉ với vài phút!
                        </Typography>
                    </div>
                    <Carousel
                        autoPlay={true}
                        animation="slide"
                        interval={5000}
                        timeout={500}
                        navButtonsAlwaysVisible={true}
                        navButtonsAlwaysInvisible={false}
                        cycleNavigation={true}
                        indicators={true}
                        navButtonsProps={{
                            style: {
                                backgroundColor: "rgba(135, 206, 235, 0.5)",
                                borderRadius: 0,
                            },
                        }}
                        navButtonsWrapperProps={{
                            style: {
                                bottom: "0",
                                top: "unset",
                            },
                        }}
                        NextIcon={<IconButton>{NextIcon}</IconButton>}
                        PrevIcon={<IconButton>{PrevIcon}</IconButton>}
                    >
                        {goiBHs.map((goiBH, goiBHKey) => (
                            <Card key={goiBHKey} className="carousel-card">
                                <CardMedia
                                    component="img"
                                    image={images[goiBHKey % images.length]}
                                    alt={`Gói Bảo Hiểm ${goiBHKey + 1}`}
                                    style={{ width: "100%", height: "70%" }}
                                    title="Card Image"
                                    className="carousel-card-media"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {goiBH.tenGoiBH}
                                    </Typography>
                                </CardContent>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "right",
                                        marginBottom: "16px",
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        component={Link}
                                        to={`product/detail/${goiBH.maGoiBH}`}
                                        color="primary"
                                    >
                                        Xem chi tiết
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </Carousel>
                </Paper>
                <Paper
                    id="dieu-khoan-section"
                    elevation={3}
                    style={{
                        padding: "20px",
                        margin: "40px",
                        textAlign: "left",
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Điều Khoản và Điều Kiện Bảo Hiểm Y Tế
                    </Typography>

                    <Typography paragraph>
                        Bảo hiểm y tế là một công cụ quan trọng giúp bảo vệ sức
                        khỏe và tài chính của chúng ta trong trường hợp cần
                        thiết. Trước khi quyết định mua một chính sách bảo hiểm
                        y tế, việc đọc và hiểu rõ điều khoản và điều kiện là
                        quan trọng để đảm bảo rằng chúng ta có được sự bảo vệ
                        tối ưu.
                    </Typography>

                    {/* Các điều khoản và điều kiện */}
                    <Typography variant="h6" gutterBottom>
                        1. Phạm Vi Bảo Hiểm
                    </Typography>
                    <Typography paragraph>
                        Điều khoản này xác định những loại dịch vụ y tế nào được
                        bảo hiểm. Các chính sách thường bao gồm chi phí y tế cơ
                        bản như thăm bác sĩ, điều trị nội trú và ngoại trú, cũng
                        như các loại dịch vụ chăm sóc sức khỏe phổ biến khác.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        2. Chi Phí và Hạn Mức Bảo Hiểm
                    </Typography>
                    <Typography paragraph>
                        Điều kiện này mô tả về mức chi trả và giới hạn tài chính
                        mà chính sách sẽ chi trả trong một khoảng thời gian cụ
                        thể. Nó quy định giới hạn tối đa mà bảo hiểm sẽ chi trả
                        cho mỗi dịch vụ y tế.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        3. Miễn Trừ và Tự Chi Trả
                    </Typography>
                    <Typography paragraph>
                        Điều khoản này nói về mức miễn trừ, tức là số tiền mà
                        người được bảo hiểm phải chi trả trước khi bảo hiểm bắt
                        đầu chi trả. Nó cũng xác định những chi phí mà người
                        được bảo hiểm phải tự chi trả.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        4. Bệnh Hiểm Nghèo và Bệnh Hiểm Nguy Hiểm
                    </Typography>
                    <Typography paragraph>
                        Các điều kiện này mô tả về cách bảo hiểm xử lý những
                        trường hợp bệnh hiểm nghèo và bệnh hiểm nguy hiểm. Bảo
                        hiểm y tế thường có các quy định đặc biệt và chi phí cao
                        cho những tình trạng y tế nặng nề.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        5. Chính Sách Hủy Bỏ và Chấm Dứt
                    </Typography>
                    <Typography paragraph>
                        Xác định các điều kiện dưới đây mà chính sách có thể bị
                        hủy bỏ và cách chấm dứt một chính sách bảo hiểm y tế.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        6. Phương Thức Thanh Toán
                    </Typography>
                    <Typography paragraph>
                        - Trực tiếp với nhân viên bảo hiểm.
                        <br />- Online qua thẻ ngân hàng.
                    </Typography>
                </Paper>

                <Paper
                    id="bao-mat-section"
                    elevation={3}
                    style={{
                        padding: "20px",
                        margin: "40px",
                        textAlign: "left",
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Điều Khoản Bảo Mật trong Bảo Hiểm
                    </Typography>

                    <Typography paragraph>
                        Bảo hiểm của chúng tôi cam kết bảo vệ thông tin cá nhân
                        của bạn và tuân thủ nghiêm ngặt các quy định về bảo mật
                        dữ liệu. Dưới đây là những điều khoản chính về bảo mật
                        mà chúng tôi áp dụng:
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        1. Bảo Mật Thông Tin Cá Nhân
                    </Typography>
                    <Typography paragraph>
                        Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và
                        chỉ sử dụng nó cho mục đích cụ thể liên quan đến dịch vụ
                        bảo hiểm. Mọi thông tin của bạn sẽ được giữ an toàn và
                        bảo mật theo tiêu chuẩn ngành.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        2. Quản lý Quyền Riêng Tư
                    </Typography>
                    <Typography paragraph>
                        Bạn có quyền kiểm soát thông tin cá nhân của mình. Chúng
                        tôi cung cấp các công cụ và tùy chọn để bạn có thể xem,
                        chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân khi cần
                        thiết.
                    </Typography>

                    {/* Thêm điều khoản và điều kiện bảo mật khác nếu cần */}
                </Paper>
            </Container>
        </>
    );
};

export default memo(HomePage);
