--Create database BaoHiemYTe
--go 
use BaoHiemYTe
go
-- Thay đổi cột để cho phép giá trị NULL
--ALTER TABLE DonDangKy
--ALTER COLUMN MaNV INT NULL;
--ALTER TABLE YeuCauHoanTra
--ALTER COLUMN MaNV INT NULL;
--ALTER TABLE YeuCauHoanTra
--ALTER COLUMN MaGoiBHApDung INT NULL;
--select *from HoaDonThanhToanDK where MaHD='7'
--select *from DonDangKy 
--select *from khachhang
insert into Users values('admin','123456',N'Admin',0)
insert into Users values('khachhang','123456',N'Khách hàng',0)
insert into Users values('anhtuan','123456',N'Khách hàng',0)
insert into Users values('thuha','123456',N'Khách hàng',0)
insert into Users values('quyetvang','123456',N'Khách hàng',0)
insert into Users values('baochau','123456',N'Khách hàng',0)
insert into Users values('minhtien','123456',N'Khách hàng',0)
insert into Users values('nhanvien','123',N'Nhân viên',0)

INSERT INTO KhachHang (HoTen, NgaySinh, GioiTinh, CCCD, DiaChi, SDT, Email, SoDu, username)
VALUES
  (N'Lê Thị Hàng', '1995-01-15', N'Nữ', '123456789012', 'TPHCM', '0123123111', 'hang@gmail.com', 5000000, 'khachhang'),
  (N'Mai Quyết Vang', '1992-03-22', N'Nam', '234567890123', 'TPHCM', '0123123124', 'vang@gmail.com', 5000000, 'quyetvang'),
  (N'Lê Thị Thu Hà', '1990-07-10', N'Nữ', '345678901234', 'TPHCM', '0123123125', 'ha@gmail.com', 5000000, 'thuha'),
  (N'Võ Hữu Anh Tuấn', '1998-11-28', N'Nam', '456789012345', 'TPHCM', '0123123126', 'tuan@gmail.com', 5000000, 'anhtuan'),
  (N'Đinh Hoàng Bảo Châu', '1996-05-03', N'Nam', '567890123456', 'TPHCM', '0123123127', 'chau@gmail.com', 5000000, 'baochau'),
  (N'Lê Minh Tiến', '2000-09-18', N'Nam', '678901234567', 'TPHCM', '0123123123', 'tien@gmail.com', 5000000, 'minhtien');

insert into NhanVien values(N'Nguyễn Văn An','TPHCM','0123456789','nguyenvanan@gmail.com','admin')
insert into NhanVien values(N'Nguyễn Thị Hoa','TPHCM','0123456788','nguyenthihoa@gmail.com','nhanvien')

INSERT INTO GoiBaoHiem (TenGoiBH, MotaGoiBH, DoTuoi, Gia, TiLeHoanTien, ThoiHanBaoVe, TinhTrang)
VALUES
    (N'Gói Bảo Hiểm Tiêu Chuẩn', N'Bảo vệ toàn diện với mức phí hợp lý. Sự lựa chọn phổ biến cho cho mọi người với sự an tâm và bảo vệ tốt nhất.', N'Từ 18-60', 450000, 25, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm Cơ Bản', N'An toàn và bảo vệ bạn với chi phí phải chăng và nhiều chính sách hấp dẫn. Bảo hiểm cơ bản cho mọi người.', N'Từ 18-60', 1200000, 30, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm VIP', N'Đặc quyền và chăm sóc cao cấp. Sự chọn lựa cho những người đòi hỏi sự đẳng cấp và phục vụ tận tâm.', N'Từ 18-60', 1500000, 35, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm Premium', N'Lựa chọn cho sự đảm bảo tối đa và lợi ích cao cấp. Bảo vệ tốt nhất cho bạn và gia đình.', N'Từ 18-60', 3000000, 40, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm Platinum', N'Đẳng cấp và sự sang trọng. Bảo vệ với các lợi ích cao cấp và đặc quyền riêng biệt.', N'Từ 18-60', 4500000, 50, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm Học Sinh - Sinh Viên', N'Tự do học tập mà không lo lắng. Bảo vệ toàn diện cho học sinh và sinh viên với chi phí hợp lý.', N'Từ 18-22', 1200000, 40, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm Doanh Nhân', N'Đối tác chiến lược cho sự phát triển kinh doanh. Bảo hiểm cho doanh nhân thông thái.', N'Từ 18-60', 1800000, 40, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm Gia Đình Nhỏ', N'Bảo vệ toàn diện cho mọi thành viên trong gia đình. Phù hợp cho gia đình 3 thành viên. Người đăng ký sẽ là người đại diện mua cho cả gia đình.', N'Từ 18-60', 5100000, 40, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm Cá Nhân', N'Lựa chọn linh hoạt cho nhu cầu cá nhân. An tâm với sự bảo vệ phù hợp với bạn.', N'Từ 18-60', 2700000, 35, 1, N'Đang cung cấp'),
    (N'Gói Bảo Mạo Hiểm', N'Tối ưu hóa bảo vệ với phí cao cấp. Lựa chọn dành cho những người thích khám phá thế giới, thích những thử thách, hay tham gia các trò chơi mạo hiểm.', N'Từ 18-60', 3300000, 60, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm Lao Động Cơ Bản', N'Bảo vệ quan trọng cho người lao động. An toàn và chăm sóc sức khỏe cơ bản.', N'Từ 18-60', 2700000, 35, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm Lao Động Nâng Cao', N'Tăng cường bảo vệ cho sức khỏe lao động. Lựa chọn đáng tin cậy cho công nhân lao động chuyên nghiệp.', N'Từ 18-60', 4500000, 50, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm Cho Mẹ Bầu', N'Bảo vệ toàn diện cho bà bầu trước và sau sinh với chi phí hợp lý. Tăng cường chăm sóc sức khỏe của mẹ và thai nhi.', N'Từ 18-40', 1200000, 50, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm Cho Bé', N'An tâm với bảo vệ toàn diện cho sức khỏe của trẻ. Đảm bảo tốt nhất cho tình yêu thương nhỏ bé. Mẹ sẽ đại diện đăng ký cho bé.', N'Từ 18-40', 1200000, 50, 1, N'Đang cung cấp'),
    (N'Gói Bảo Hiểm Cho Mẹ Và Bé', N'An tâm với bảo vệ toàn diện cho cả mẹ và bé. Sự lựa chọn hoàn hảo với mức giá cực kì ưu đãi. Mẹ sẽ đại diện mua cho cả mẹ và bé.', N'Từ 18-40', 1800000, 50, 1, N'Đang cung cấp');
INSERT INTO Benh (TenBenh, MoTa) VALUES
    (N'Bệnh xương khớp', N'Viêm khớp, Gout, Bệnh thoái hóa cột sống'),
    (N'Bệnh tim mạch', N'Bệnh đau thắt ngực, Đau tim và nhồi máu cơ tim, Loạn nhịp tim, Bệnh mạch vành'),
    (N'Bệnh thần kinh', N'Đau thần kinh, Đau đầu và Migraine, Đau thị giác, Đau thần kinh toàn thân, Rối loạn tâm thần'),
    (N'Bệnh hô hấp', N'Bệnh hen suyễn, Viêm phế quản, Viêm phổi, Bệnh tắc nghẽn đường hô hấp'),
    (N'Bệnh nội tiết', N'Bệnh tiểu đường, Tăng/giảm hoạt động tuyến yên'),
    (N'Bệnh tiêu hóa', N'Viêm đại tràng, Bệnh Crohn, Dạ dày và thực quản, Bệnh gan nhiễm mỡ'),
    (N'Bệnh truyền nhiễm', N'HIV/AIDS, Viêm gan, Bệnh Lyme, Cúm và các bệnh truyền nhiễm khác'),
    (N'Bệnh ung thư', N'Ung thư vú, Ung thư phổi, Ung thư ruột kết, Ung thư da'),
    (N'Bệnh ngoại khoa', N'Bệnh chấn thương, Bệnh đau mạn tính, Các vấn đề liên quan đến da liễu'),
    (N'Bệnh lao động', N'Đau lưng và cột sống, Chấn thương do vận động và thể thao'),
    (N'Bệnh thai nghén', N'Trong thai độc, Đau lưng khi mang thai, Sẩy thai'),
    (N'Bệnh mẹ bầu', N'Suy dinh dưỡng thai nghén, Nôn mửa thai nghén, Đau bụng dưới thai nghén, Huyết áp thai nghén, Tiểu đường thai nghén'),
    (N'Bệnh sơ sinh', N'Bệnh bẩm sinh, Sỏi thận ở trẻ sơ sinh, Tiểu đường sơ sinh'),
    (N'Bệnh nhi đồng', N'Sổ mũi, Viêm họng, Cảm cúm, Viêm tai, Đau bụng, Viêm ruột');

INSERT INTO ChinhSach VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(2,2),
(2,3),
(2,4),
(2,5),
(3,1),
(3,5),
(3,6),
(3,7),
(3,8),
(3,9),
(4,1),
(4,5),
(4,6),
(4,7),
(4,8),
(4,9),
(5,1),
(5,5),
(5,6),
(5,7),
(5,8),
(5,9),
(6,1),
(6,5),
(6,6),
(7,1),
(7,5),
(7,6),
(7,7),
(8,4),
(8,5),
(8,6),
(8,7),
(8,8),
(9,1),
(9,2),
(9,3),
(9,6),
(9,7),
(10,1),
(10,2),
(10,3),
(10,4),
(10,5),
(11,1),
(11,2),
(11,3),
(11,4),
(11,5),
(11,6),
(12,1),
(12,2),
(12,3),
(12,4),
(12,5),
(12,6),
(12,7),
(12,8),
(13,11),
(13,12),
(14,13),
(14,14),
(15,11),
(15,12),
(15,13),
(15,14);


-- Khi tạo đơn đăng ký thì Khách hàng chọn Thời gian bắt đầu và số năm (trên frontend)-> Thời gian hết hạn
-- TinhTrang: khi khách hàng đăng ký thì tình trạng là "Chờ duyệt", sau đó đơn được chuyển qua bên Nhân viên,"Duyệt"-> TinhTrang=N'Chờ thanh toán
-- "Từ chối" -> TinhTrang=N'Bị từ chối' và Ghi LiDoTuChoi
-- Khách hàng bấm "ThanhToan" HoaDonThanhToanDK tình trạng từ N'Chờ thanh toán'-> 'Đã kích hoạt'
INSERT INTO DonDangKy (MaGoiBH, ThoiGianDK, ThoiGianBD, ThoiGianHetHan, TinhTrang, SoKyHanThanhToan, TongGia, MaKH, MaNV, ThoiGianDuyet)
VALUES
    (1, '2023-10-01 08:00:00', '2023-10-02 00:00:00', '2024-10-02 00:00:00', N'Đã kích hoạt', 1, 450000, 1, 1, '2023-10-01 12:00:00'),
    (2, '2023-10-03 10:15:00', '2023-10-04 00:00:00', '2024-10-04 00:00:00', N'Đã kích hoạt', 1, 1200000, 2, 1, '2023-10-03 14:15:00'),
    (3, '2023-11-01 11:45:00', '2023-11-03 00:00:00', '2024-11-03 00:00:00', N'Đã kích hoạt', 1, 1500000, 3, 1, '2023-11-01 11:45:00'),
    (4, '2023-11-04 14:30:00', '2023-11-05 00:00:00', '2024-11-05 00:00:00', N'Đã kích hoạt', 1, 3000000, 4, 2, '2023-11-04 14:46:10'),
    (5, '2023-12-01 16:00:00', '2023-12-05 00:00:00', '2024-12-05 00:00:00', N'Đã kích hoạt', 1, 4500000, 5, 2, '2023-12-02 10:00:00'),
	(6, '2023-12-05 18:00:00', '2023-12-07 00:00:00', '2024-12-07 00:00:00', N'Đã kích hoạt', 1, 1200000, 6, 2, '2023-12-06 08:00:00'),
	(7, '2023-12-20 15:41:00', '2023-12-21 00:00:00', '2024-12-21 00:00:00', N'Chờ thanh toán', 1, 1800000, 1, 1,  '2023-12-20 16:11:00'),
	(8, '2023-12-28 08:00:00', '2023-12-29 00:00:00', '2024-12-29 00:00:00', N'Chờ thanh toán', 2, 5100000, 1, 1, '2023-12-28 10:05:00'),
    (5, '2023-12-31 09:00:00', '2024-01-01 00:00:00', '2026-01-01 00:00:00', N'Chờ thanh toán', 1, 9000000, 1, 2,  '2023-12-31 09:00:00'),
    (3, '2024-01-10 11:11:00', '2024-01-11 00:00:00', '2025-01-11 00:00:00', N'Chờ thanh toán', 1, 1500000, 1, 1,  '2024-01-10 15:11:00'),
	(7, '2023-12-26 11:17:00', '2023-12-27 00:00:00', '2024-12-27 00:00:00', N'Chờ thanh toán', 1, 1800000, 2, 1,  '2023-12-26 13:17:00'),
    (2, '2023-12-28 09:45:00',  '2023-12-29 00:00:00', '2024-12-29 00:00:00', N'Chờ duyệt', 1, 1200000, 1, NULL, NULL),
	(4, '2024-01-06 10:00:00', '2024-01-07 00:00:00', '2025-01-07 00:00:00', N'Chờ duyệt', 1, 3000000, 1, NULL, NULL),
	(10, '2024-01-16 10:00:00',  '2024-01-17 00:00:00', '2025-01-17 00:00:00', N'Chờ duyệt', 1, 3300000, 1, NULL, NULL),
	(9, '2023-12-28 15:45:00',  '2023-12-29 00:00:00', '2024-12-29 00:00:00', N'Chờ duyệt', 2, 2700000, 2, NULL, NULL),
	(8, '2023-12-31 15:45:00',  '2024-01-01 00:00:00', '2026-01-01 00:00:00', N'Chờ duyệt', 1, 10200000, 2, NULL, NULL),
	(2, '2023-12-28 09:45:00',  '2023-12-29 00:00:00', '2024-12-29 00:00:00', N'Chờ duyệt', 2, 1200000, 3, NULL, NULL),
	(5, '2023-12-28 15:48:00', '2023-12-30 00:00:00', '2024-12-30 00:00:00', N'Bị từ chối', 1, 4500000, 1, 1, '2023-12-29 15:48:00'),
    (4, '2023-12-26 15:41:00', '2023-12-29 00:00:00', '2024-12-29 00:00:00', N'Bị từ chối', 1, 3000000, 2, 2, '2023-12-26 15:59:00'),
    (3, '2023-12-27 15:40:00', '2023-12-29 00:00:00', '2024-12-29 00:00:00', N'Bị từ chối', 1, 1500000, 3, 1,  '2023-12-27 16:40:00');

	
INSERT INTO HoaDonThanhToanDK (SoTien, ThoiGianHetHan, HanKy, TinhTrangThanhToan,TienPhat,LiDoPhat,TongTien, ThoiGianThanhToan, MaDonDK)
VALUES
    (450000, '2023-10-08 12:00:00','1/1', N'Đã thanh toán', 0, NULL, 450000,  '2023-10-09 12:00:00', 1),
    (1200000,'2023-10-10 14:15:00', '1/1', N'Đã thanh toán', 0, NULL, 1200000, '2023-10-05 14:15:00', 2),
    (1500000, '2023-11-08 11:45:00', '1/1', N'Đã thanh toán', 0, NULL, 1500000, '2023-11-10 14:45:00', 3),
    (3000000, '2023-11-11 14:46:10', '1/1', N'Đã thanh toán',0,NULL, 3000000, '2023-11-12 14:46:10', 4),
    (4500000, '2023-12-09 10:00:00','1/1', N'Đã thanh toán', 0, NULL, 4500000, '2023-12-09 19:51:00', 5),
    (1200000, '2023-12-13 08:01:00','1/1', N'Đã thanh toán', 0, NULL, 1200000, '2023-12-14 08:01:00',6 ),
    (1800000, '2023-12-27 16:11:00', '1/1', N'Chưa thanh toán', 0, NULL, 1800000, NULL, 7),
    (2550000, '2024-01-04 10:05:00', '1/2', N'Chưa thanh toán', 0, NULL, 2550000, NULL, 8),
	(2550000, '2024-07-04 10:05:00', '1/2', N'Chưa thanh toán', 0, NULL, 2550000, NULL, 8),
	(4500000, '2024-01-06 09:00:00', '1/2', N'Chưa thanh toán', 0, NULL, 4500000, NULL, 9),
	(4500000, '2024-01-06 09:00:00',  '1/2', N'Chưa thanh toán', 0, NULL, 4500000, NULL, 9),
	(1500000, '2024-01-17 15:11:00', '1/1', N'Chưa thanh toán', 0, NULL, 1500000, NULL, 10),
	(1800000, '2024-01-02 13:17:00', '1/1', N'Chưa thanh toán', 0, NULL, 1800000, NULL, 11);
--	select* from HoaDonThanhToanDK
--	update HoaDonThanhToanDK set TienPhat=0 where MaHD=15
--delete from HoaDonThanhToanDK where MaHD=14
INSERT INTO HoaDonThanhToanDK (SoTien, ThoiGianHetHan, HanKy, TinhTrangThanhToan,TienPhat,LiDoPhat,TongTien, ThoiGianThanhToan, MaDonDK)
VALUES   (1800000, '2023-12-27 16:11:00', '1/1', N'Chưa thanh toán', 0, NULL, 1800000, NULL, 7);

Insert into TinhTrangBenh (MaDonDK,MaBenh,TinhTrang) values
(12,2,N'Không'),
(12,3,N'Không'),
(12,4,N'Không'),
(12,5,N'Không'),
(13,1,N'Không'),
(13,5,N'Không'),
(13,6,N'Không'),
(13,7,N'Không'),
(13,8,N'Không'),
(13,9,N'Không'),
(14,1,N'Không'),
(14,2,N'Không'),
(14,3,N'Không'),
(14,4,N'Không'),
(14,5,N'Không'),
(15,1,N'Không'),
(15,2,N'Không'),
(15,3,N'Không'),
(15,6,N'Không'),
(15,7,N'Có'),
(16,4,N'Không'),
(16,5,N'Không'),
(16,6,N'Không'),
(16,7,N'Không'),
(16,8,N'Không'),
(17,2,N'Không'),
(17,3,N'Không'),
(17,4,N'Không'),
(17,5,N'Không');

INSERT INTO BenhVien(TenBV) values
	(N'Bệnh viện đa khoa Thủ Đức'),
	(N'Bệnh viện Chợ Rẫy'),
	(N'Bệnh viện Nhân dân Gia Định'),
	(N'Trung tâm Truyền máu huyết học'),
	(N'Bệnh viện Gò Vấp'),
	(N'Trung tâm Y tế Nhà Bè'),
	(N'Trung tâm Sức khỏe Tâm Thần'),
	(N'Bệnh viện Thống Nhất'),
	(N'Trung tâm Ung Bướu'),
	(N'Bệnh viện Nhi đồng 1'),
	(N'Bệnh viện Nhi đông 2'),
	(N'Bệnh viện Nhân dân 115');

INSERT INTO HoaDonKhamBenh (MaHDKhamBenh, MaBV, SoTienKham, CCCD, TinhTrang)
VALUES
    ('FD6-5WE-Q1D', 1, 1000000, '123456789012', 1),
    ('ABC-123-XYZ', 2, 1000000, '234567890123', 1),
    ('JKL-987-MNO', 3, 1000000, '234567890123', 1),
    ('PQR-456-STU', 4, 1200000, '123456789012', 1),
    ('XYZ-789-ABC', 5, 2000000, '123456789012', 1),
    ('123-XYZ-456', 6, 1600000, '123456789012', 1),
    ('MNO-789-JKL', 7, 1200000, '123456789012', 1),
    ('STU-123-PQR', 8, 2000000, '234567890123', 1),
    ('456-ABC-789', 9, 3500000, '123456789012', 0),
    ('789-PQR-123', 10, 2000000, '456789012345', 0),
    ('QWE-789-RTY', 11, 4500000, '567890123456', 0),
    ('UIO-123-PLK', 12, 3000000, '678901234567', 0),
    ('ZXC-456-VBN', 1, 1500000, '123456789012', 0),
    ('LKJ-789-POI', 2, 900000, '234567890123', 0),
    ('HGF-123-DSA', 3, 3000000, '345678901234', 0),
    ('RTY-456-CVB', 4, 2000000, '456789012345', 0),
    ('FDS-789-XCV', 5, 4000000, '567890123456', 0),
    ('POI-123-JKL', 6, 2500000, '678901234567', 0),
    ('MNB-456-ZXC', 7, 1500000, '123456789012', 0),
    ('XCV-789-QWE', 8, 3500000, '234567890123', 0),
    ('QAZ-123-WSX', 9, 450000, '345678901234', 0),
    ('EDC-456-RFV', 10, 3000000, '456789012345', 0),
    ('QWE-456-ASD', 11, 2000000, '567890123456', 0),
    ('PLK-789-UIO', 12,  1500000, '678901234567', 0);


--Tình trạng: 
--1.Chờ duyệt :là chờ đã đủ điều kiện áp dụng chính sách, 
--chỉ chờ nhân viên bấm nút duyệt, để đổi sang trạng thái Đã hoàn tiền
--2.Không đủ điều kiện: là sau khi khách hàng nhập các thông tin, hoàn tiền, 
--nhưng hệ thống tính toán được bệnh đó k có gói BH nào của khách hàng hỗ trợ
--3.Đã hoàn tiền: Nhân viên bấm duyệt đổi từ trạng thái Chờ duyệt-> Đã hoàn tiền, 
--hệ thống tạo hóa đơn hoàn trả
INSERT INTO YeuCauHoanTra (MaHDKhamBenh, TenBenhVien, SoTienDaKham, Benh, ThoiGianTao, TinhTrang, MaGoiBHApDung, SoTienHoanTra, MaKH, MaNV, ThoiGianDuyet)
VALUES 
  ('FD6-5WE-Q1D', N'Bệnh viện đa khoa Thủ Đức', 1000000, N'Bệnh thần kinh', '2023-10-15 08:03:00', N'Đã hoàn tiền', 1, 250000, 1, 2,  '2023-07-04 10:30:00'),
  ('ABC-123-XYZ', N'Bệnh viện Chợ Rẫy', 1000000, N'Bệnh hô hấp', '2023-11-04 08:30:00', N'Đã hoàn tiền', 2, 300000, 2, 2, '2023-10-04 08:30:00'),
  ('JKL-987-MNO',N'Bệnh viện Nhân dân Gia Định', 1000000, N'Bệnh thần kinh', '2023-11-04 09:30:00', N'Đã hoàn tiền', 2, 300000, 2, 1, '2023-11-08 08:30:00'),
  ('PQR-456-STU', N'Trung tâm Truyền máu huyết học', 1200000, N'Bệnh tim mạch', '2023-11-05 08:30:00', N'Đã hoàn tiền', 1, 300000, 1, 1, '2023-11-08 09:30:00'),
  ('XYZ-789-ABC',N'Bệnh viện Gò Vấp', 2000000, N'Bệnh thần kinh', '2023-12-20 08:30:00',  N'Chờ duyệt', 1, 500000, 1, NULL, NULL),
  ('123-XYZ-456',N'Trung tâm Y tế Nhà Bè', 1600000, N'Bệnh hô hấp', '2023-12-28 09:30:00', N'Chờ duyệt', 1, 400000, 1, NULL, NULL),
  ('MNO-789-JKL',N'Trung tâm Sức khỏe Tâm Thần', 1200000, N'Bệnh tim mạch', '2023-12-03 08:30:00', N'Chờ duyệt', 1, 300000, 1, NULL, NULL),
  ('STU-123-PQR', N'Bệnh viện Thống Nhất', 2000000, N'Bệnh xương khớp', '2023-12-05 08:33:00', N'Chờ duyệt', 2, 600000, 2, NULL, NULL);
  
INSERT INTO HoaDonHoanTra (SoTien,ThoiGianTao,MaYC)
VALUES 
(250000,'2023-07-04 10:30:00',1),
(30000,'2023-10-04 08:30:00',2),
(30000,'2023-11-08 08:30:00',3),
(30000,'2023-11-08 09:30:00',4);

INSERT INTO HoaDonHoanTra (SoTien,ThoiGianTao,MaYC)
VALUES 
(600000,'2024-01-01 09:30:00',4);
