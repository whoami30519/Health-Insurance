using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BaoHiemYTe.Migrations
{
    /// <inheritdoc />
    public partial class tien_f : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Benh",
                columns: table => new
                {
                    MaBenh = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenBenh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Benh", x => x.MaBenh);
                });

            migrationBuilder.CreateTable(
                name: "BenhVien",
                columns: table => new
                {
                    MaBV = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenBV = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BenhVien", x => x.MaBV);
                });

            migrationBuilder.CreateTable(
                name: "GoiBaoHiem",
                columns: table => new
                {
                    MaGoiBH = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenGoiBH = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MotaGoiBH = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DoTuoi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gia = table.Column<int>(type: "int", nullable: false),
                    TiLeHoanTien = table.Column<int>(type: "int", nullable: false),
                    ThoiHanBaoVe = table.Column<int>(type: "int", nullable: false),
                    TinhTrang = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoiBaoHiem", x => x.MaGoiBH);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    username = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstLogin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.username);
                });

            migrationBuilder.CreateTable(
                name: "HoaDonKhamBenh",
                columns: table => new
                {
                    MaHDKhamBenh = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SoTienKham = table.Column<int>(type: "int", nullable: false),
                    CCCD = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaBV = table.Column<int>(type: "int", nullable: false),
                    TinhTrang = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDonKhamBenh", x => x.MaHDKhamBenh);
                    table.ForeignKey(
                        name: "FK_HoaDonKhamBenh_BenhVien_MaBV",
                        column: x => x.MaBV,
                        principalTable: "BenhVien",
                        principalColumn: "MaBV",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChinhSach",
                columns: table => new
                {
                    MaGoiBH = table.Column<int>(type: "int", nullable: false),
                    MaBenh = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChinhSach", x => new { x.MaGoiBH, x.MaBenh });
                    table.ForeignKey(
                        name: "FK_ChinhSach_Benh_MaBenh",
                        column: x => x.MaBenh,
                        principalTable: "Benh",
                        principalColumn: "MaBenh",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChinhSach_GoiBaoHiem_MaGoiBH",
                        column: x => x.MaGoiBH,
                        principalTable: "GoiBaoHiem",
                        principalColumn: "MaGoiBH",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "KhachHang",
                columns: table => new
                {
                    MaKH = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HoTen = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NgaySinh = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GioiTinh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CCCD = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SDT = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SoDu = table.Column<int>(type: "int", nullable: false),
                    username = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhachHang", x => x.MaKH);
                    table.ForeignKey(
                        name: "FK_KhachHang_Users_username",
                        column: x => x.username,
                        principalTable: "Users",
                        principalColumn: "username",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NhanVien",
                columns: table => new
                {
                    MaNV = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HoTen = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SDT = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    username = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NhanVien", x => x.MaNV);
                    table.ForeignKey(
                        name: "FK_NhanVien_Users_username",
                        column: x => x.username,
                        principalTable: "Users",
                        principalColumn: "username",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DonDangKy",
                columns: table => new
                {
                    MaDonDK = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaGoiBH = table.Column<int>(type: "int", nullable: false),
                    ThoiGianDK = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ThoiGianBD = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ThoiGianHetHan = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TinhTrang = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LiDoTuChoi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoKyHanThanhToan = table.Column<int>(type: "int", nullable: false),
                    TongGia = table.Column<int>(type: "int", nullable: false),
                    MaKH = table.Column<int>(type: "int", nullable: false),
                    MaNV = table.Column<int>(type: "int", nullable: true),
                    ThoiGianDuyet = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonDangKy", x => x.MaDonDK);
                    table.ForeignKey(
                        name: "FK_DonDangKy_GoiBaoHiem_MaGoiBH",
                        column: x => x.MaGoiBH,
                        principalTable: "GoiBaoHiem",
                        principalColumn: "MaGoiBH",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DonDangKy_KhachHang_MaKH",
                        column: x => x.MaKH,
                        principalTable: "KhachHang",
                        principalColumn: "MaKH",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DonDangKy_NhanVien_MaNV",
                        column: x => x.MaNV,
                        principalTable: "NhanVien",
                        principalColumn: "MaNV",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HoaDonNapTien",
                columns: table => new
                {
                    MaHD = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SoTien = table.Column<int>(type: "int", nullable: false),
                    SoDu = table.Column<int>(type: "int", nullable: false),
                    ThoiGianNap = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaKH = table.Column<int>(type: "int", nullable: false),
                    MaNV = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDonNapTien", x => x.MaHD);
                    table.ForeignKey(
                        name: "FK_HoaDonNapTien_KhachHang_MaKH",
                        column: x => x.MaKH,
                        principalTable: "KhachHang",
                        principalColumn: "MaKH",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HoaDonNapTien_NhanVien_MaNV",
                        column: x => x.MaNV,
                        principalTable: "NhanVien",
                        principalColumn: "MaNV",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "YeuCauHoanTra",
                columns: table => new
                {
                    MaYC = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaHDKhamBenh = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TenBenhVien = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SoTienDaKham = table.Column<int>(type: "int", nullable: false),
                    Benh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ThoiGianTao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TinhTrang = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaGoiBHApDung = table.Column<int>(type: "int", nullable: true),
                    SoTienHoanTra = table.Column<int>(type: "int", nullable: true),
                    MaKH = table.Column<int>(type: "int", nullable: false),
                    MaNV = table.Column<int>(type: "int", nullable: true),
                    ThoiGianDuyet = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_YeuCauHoanTra", x => x.MaYC);
                    table.ForeignKey(
                        name: "FK_YeuCauHoanTra_GoiBaoHiem_MaGoiBHApDung",
                        column: x => x.MaGoiBHApDung,
                        principalTable: "GoiBaoHiem",
                        principalColumn: "MaGoiBH",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_YeuCauHoanTra_HoaDonKhamBenh_MaHDKhamBenh",
                        column: x => x.MaHDKhamBenh,
                        principalTable: "HoaDonKhamBenh",
                        principalColumn: "MaHDKhamBenh",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_YeuCauHoanTra_KhachHang_MaKH",
                        column: x => x.MaKH,
                        principalTable: "KhachHang",
                        principalColumn: "MaKH",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_YeuCauHoanTra_NhanVien_MaNV",
                        column: x => x.MaNV,
                        principalTable: "NhanVien",
                        principalColumn: "MaNV",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HoaDonThanhToanDK",
                columns: table => new
                {
                    MaHD = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SoTien = table.Column<int>(type: "int", nullable: false),
                    ThoiGianHetHan = table.Column<DateTime>(type: "datetime2", nullable: false),
                    HanKy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TinhTrangThanhToan = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TienPhat = table.Column<int>(type: "int", nullable: false),
                    LiDoPhat = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TongTien = table.Column<int>(type: "int", nullable: false),
                    ThoiGianThanhToan = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MaDonDK = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDonThanhToanDK", x => x.MaHD);
                    table.ForeignKey(
                        name: "FK_HoaDonThanhToanDK_DonDangKy_MaDonDK",
                        column: x => x.MaDonDK,
                        principalTable: "DonDangKy",
                        principalColumn: "MaDonDK",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TinhTrangBenh",
                columns: table => new
                {
                    MaDonDK = table.Column<int>(type: "int", nullable: false),
                    MaBenh = table.Column<int>(type: "int", nullable: false),
                    TinhTrang = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TinhTrangBenh", x => new { x.MaDonDK, x.MaBenh });
                    table.ForeignKey(
                        name: "FK_TinhTrangBenh_Benh_MaBenh",
                        column: x => x.MaBenh,
                        principalTable: "Benh",
                        principalColumn: "MaBenh",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TinhTrangBenh_DonDangKy_MaDonDK",
                        column: x => x.MaDonDK,
                        principalTable: "DonDangKy",
                        principalColumn: "MaDonDK",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HoaDonHoanTra",
                columns: table => new
                {
                    MaHDHoanTra = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SoTien = table.Column<int>(type: "int", nullable: false),
                    ThoiGianTao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaYC = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDonHoanTra", x => x.MaHDHoanTra);
                    table.ForeignKey(
                        name: "FK_HoaDonHoanTra_YeuCauHoanTra_MaYC",
                        column: x => x.MaYC,
                        principalTable: "YeuCauHoanTra",
                        principalColumn: "MaYC",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BenhVien_TenBV",
                table: "BenhVien",
                column: "TenBV",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChinhSach_MaBenh",
                table: "ChinhSach",
                column: "MaBenh");

            migrationBuilder.CreateIndex(
                name: "IX_DonDangKy_MaGoiBH",
                table: "DonDangKy",
                column: "MaGoiBH");

            migrationBuilder.CreateIndex(
                name: "IX_DonDangKy_MaKH",
                table: "DonDangKy",
                column: "MaKH");

            migrationBuilder.CreateIndex(
                name: "IX_DonDangKy_MaNV",
                table: "DonDangKy",
                column: "MaNV");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDonHoanTra_MaYC",
                table: "HoaDonHoanTra",
                column: "MaYC");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDonKhamBenh_MaBV",
                table: "HoaDonKhamBenh",
                column: "MaBV");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDonNapTien_MaKH",
                table: "HoaDonNapTien",
                column: "MaKH");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDonNapTien_MaNV",
                table: "HoaDonNapTien",
                column: "MaNV");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDonThanhToanDK_LiDoPhat",
                table: "HoaDonThanhToanDK",
                column: "LiDoPhat",
                unique: true,
                filter: "[LiDoPhat] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDonThanhToanDK_MaDonDK",
                table: "HoaDonThanhToanDK",
                column: "MaDonDK");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDonThanhToanDK_ThoiGianThanhToan",
                table: "HoaDonThanhToanDK",
                column: "ThoiGianThanhToan",
                unique: true,
                filter: "[ThoiGianThanhToan] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHang_username",
                table: "KhachHang",
                column: "username");

            migrationBuilder.CreateIndex(
                name: "IX_NhanVien_username",
                table: "NhanVien",
                column: "username");

            migrationBuilder.CreateIndex(
                name: "IX_TinhTrangBenh_MaBenh",
                table: "TinhTrangBenh",
                column: "MaBenh");

            migrationBuilder.CreateIndex(
                name: "IX_YeuCauHoanTra_MaGoiBHApDung",
                table: "YeuCauHoanTra",
                column: "MaGoiBHApDung");

            migrationBuilder.CreateIndex(
                name: "IX_YeuCauHoanTra_MaHDKhamBenh",
                table: "YeuCauHoanTra",
                column: "MaHDKhamBenh",
                unique: true,
                filter: "[MaHDKhamBenh] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_YeuCauHoanTra_MaKH",
                table: "YeuCauHoanTra",
                column: "MaKH");

            migrationBuilder.CreateIndex(
                name: "IX_YeuCauHoanTra_MaNV",
                table: "YeuCauHoanTra",
                column: "MaNV");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChinhSach");

            migrationBuilder.DropTable(
                name: "HoaDonHoanTra");

            migrationBuilder.DropTable(
                name: "HoaDonNapTien");

            migrationBuilder.DropTable(
                name: "HoaDonThanhToanDK");

            migrationBuilder.DropTable(
                name: "TinhTrangBenh");

            migrationBuilder.DropTable(
                name: "YeuCauHoanTra");

            migrationBuilder.DropTable(
                name: "Benh");

            migrationBuilder.DropTable(
                name: "DonDangKy");

            migrationBuilder.DropTable(
                name: "HoaDonKhamBenh");

            migrationBuilder.DropTable(
                name: "GoiBaoHiem");

            migrationBuilder.DropTable(
                name: "KhachHang");

            migrationBuilder.DropTable(
                name: "NhanVien");

            migrationBuilder.DropTable(
                name: "BenhVien");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
