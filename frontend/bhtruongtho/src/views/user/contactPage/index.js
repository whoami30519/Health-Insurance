import {
    Container,
    Link,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import React, { memo } from "react";
const ProfilePage = () => {
    return (
        <>
            <Container component="main" maxWidth="xl">
                <Paper
                    id="contact-section"
                    elevation={3}
                    style={{
                        padding: "20px",
                        margin: "40px",
                        textAlign: "left",
                    }}
                >
                    {/* Lời cảm ơn đã sử dụng bảo hiểm */}
                    <div style={{ marginBottom: "20px" }}>
                        <Typography variant="h4" gutterBottom>
                            Lời Cảm Ơn
                        </Typography>
                        <Typography variant="body1">
                            Kính gửi Quý Khách hàng,
                            <br />
                            <br />
                            Chúng tôi xin chân thành cảm ơn sự tin tưởng và lựa
                            chọn dịch vụ bảo hiểm của Bảo Hiểm BARTENDER. Đã là
                            một hành trình tuyến tính và có ý nghĩa khi chúng
                            tôi được đồng hành cùng Quý Khách trên con đường bảo
                            vệ tài chính và an ninh tương lai.
                            <br />
                            <br />
                            Chất lượng dịch vụ của chúng tôi không chỉ là cam
                            kết, mà là sự đầu tư tận tâm để mang lại trải nghiệm
                            bảo vệ toàn diện và an tâm cho Quý Khách hàng. Sứ
                            mệnh của chúng tôi không chỉ là cung cấp các sản
                            phẩm bảo hiểm chất lượng cao mà còn là hỗ trợ và
                            đồng hành, giúp Quý Khách hàng xây dựng một tương
                            lai vững mạnh và bền vững.
                            <br />
                            <br />
                            Chúng tôi hiểu rằng sự hài lòng của Quý Khách là yếu
                            tố quan trọng nhất và chúng tôi cam kết liên tục nỗ
                            lực để nâng cao chất lượng dịch vụ và đáp ứng mọi
                            nhu cầu bảo vệ của Quý Khách một cách tốt nhất.
                            <br />
                            <br />
                            Một lần nữa, chân thành cảm ơn sự ủng hộ và hy vọng
                            chúng tôi có thể tiếp tục đồng hành cùng Quý Khách
                            trên hành trình bảo vệ và xây dựng tương lai.
                            <br />
                            <br />
                            Trân trọng,
                            <br />
                            Bảo Hiểm BARTENDER
                        </Typography>
                    </div>

                    {/* Liên hệ */}
                    <div>
                        <Typography variant="h4" gutterBottom>
                            Thông Tin Liên Hệ
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText>
                                    <Typography>
                                        227 Nguyễn Văn Cừ, Phường 4, Quận 5,
                                        Thành phố Hồ Chí Minh
                                    </Typography>
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemText>
                                    <Typography>
                                        Khu phố 6, Phường Linh Trung, Thành phố
                                        Thủ Đức, Thành phố Hồ Chí Minh
                                    </Typography>
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemText>0286 2884 499</ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemText>0287 3089 899</ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemText>
                                    <Link
                                        href="mailto:bhtruongtho@gmail.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        bhtruongtho@gmail.com
                                    </Link>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Paper>
            </Container>
        </>
    );
};

export default memo(ProfilePage);
