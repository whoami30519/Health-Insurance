﻿// <auto-generated />
using System;
using BaoHiemYTe.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BaoHiemYTe.Migrations
{
    [DbContext(typeof(UserDbContext))]
    [Migration("20240123101519_tien_f")]
    partial class tien_f
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BaoHiemYTe.Domain.Benh", b =>
                {
                    b.Property<int>("MaBenh")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaBenh"));

                    b.Property<string>("MoTa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TenBenh")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MaBenh");

                    b.ToTable("Benh");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.BenhVien", b =>
                {
                    b.Property<int>("MaBV")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaBV"));

                    b.Property<string>("TenBV")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("MaBV");

                    b.HasIndex("TenBV")
                        .IsUnique();

                    b.ToTable("BenhVien");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.ChinhSach", b =>
                {
                    b.Property<int>("MaGoiBH")
                        .HasColumnType("int");

                    b.Property<int>("MaBenh")
                        .HasColumnType("int");

                    b.HasKey("MaGoiBH", "MaBenh");

                    b.HasIndex("MaBenh");

                    b.ToTable("ChinhSach");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.DonDangKy", b =>
                {
                    b.Property<int>("MaDonDK")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaDonDK"));

                    b.Property<string>("LiDoTuChoi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MaGoiBH")
                        .HasColumnType("int");

                    b.Property<int>("MaKH")
                        .HasColumnType("int");

                    b.Property<int?>("MaNV")
                        .HasColumnType("int");

                    b.Property<int>("SoKyHanThanhToan")
                        .HasColumnType("int");

                    b.Property<DateTime>("ThoiGianBD")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ThoiGianDK")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ThoiGianDuyet")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ThoiGianHetHan")
                        .HasColumnType("datetime2");

                    b.Property<string>("TinhTrang")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TongGia")
                        .HasColumnType("int");

                    b.HasKey("MaDonDK");

                    b.HasIndex("MaGoiBH");

                    b.HasIndex("MaKH");

                    b.HasIndex("MaNV");

                    b.ToTable("DonDangKy");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.GoiBaoHiem", b =>
                {
                    b.Property<int>("MaGoiBH")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaGoiBH"));

                    b.Property<string>("DoTuoi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Gia")
                        .HasColumnType("int");

                    b.Property<string>("MotaGoiBH")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TenGoiBH")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ThoiHanBaoVe")
                        .HasColumnType("int");

                    b.Property<int>("TiLeHoanTien")
                        .HasColumnType("int");

                    b.Property<string>("TinhTrang")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MaGoiBH");

                    b.ToTable("GoiBaoHiem");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.HoaDonHoanTra", b =>
                {
                    b.Property<int>("MaHDHoanTra")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaHDHoanTra"));

                    b.Property<int>("MaYC")
                        .HasColumnType("int");

                    b.Property<int>("SoTien")
                        .HasColumnType("int");

                    b.Property<DateTime>("ThoiGianTao")
                        .HasColumnType("datetime2");

                    b.HasKey("MaHDHoanTra");

                    b.HasIndex("MaYC");

                    b.ToTable("HoaDonHoanTra");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.HoaDonKhamBenh", b =>
                {
                    b.Property<string>("MaHDKhamBenh")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CCCD")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MaBV")
                        .HasColumnType("int");

                    b.Property<int>("SoTienKham")
                        .HasColumnType("int");

                    b.Property<int>("TinhTrang")
                        .HasColumnType("int");

                    b.HasKey("MaHDKhamBenh");

                    b.HasIndex("MaBV");

                    b.ToTable("HoaDonKhamBenh");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.HoaDonNapTien", b =>
                {
                    b.Property<int>("MaHD")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaHD"));

                    b.Property<int>("MaKH")
                        .HasColumnType("int");

                    b.Property<int>("MaNV")
                        .HasColumnType("int");

                    b.Property<int>("SoDu")
                        .HasColumnType("int");

                    b.Property<int>("SoTien")
                        .HasColumnType("int");

                    b.Property<DateTime>("ThoiGianNap")
                        .HasColumnType("datetime2");

                    b.HasKey("MaHD");

                    b.HasIndex("MaKH");

                    b.HasIndex("MaNV");

                    b.ToTable("HoaDonNapTien");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.HoaDonThanhToanDK", b =>
                {
                    b.Property<int>("MaHD")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaHD"));

                    b.Property<string>("HanKy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LiDoPhat")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("MaDonDK")
                        .HasColumnType("int");

                    b.Property<int>("SoTien")
                        .HasColumnType("int");

                    b.Property<DateTime>("ThoiGianHetHan")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ThoiGianThanhToan")
                        .HasColumnType("datetime2");

                    b.Property<int>("TienPhat")
                        .HasColumnType("int");

                    b.Property<string>("TinhTrangThanhToan")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TongTien")
                        .HasColumnType("int");

                    b.HasKey("MaHD");

                    b.HasIndex("LiDoPhat")
                        .IsUnique()
                        .HasFilter("[LiDoPhat] IS NOT NULL");

                    b.HasIndex("MaDonDK");

                    b.HasIndex("ThoiGianThanhToan")
                        .IsUnique()
                        .HasFilter("[ThoiGianThanhToan] IS NOT NULL");

                    b.ToTable("HoaDonThanhToanDK");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.KhachHang", b =>
                {
                    b.Property<int>("MaKH")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaKH"));

                    b.Property<string>("CCCD")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DiaChi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GioiTinh")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoTen")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("NgaySinh")
                        .HasColumnType("datetime2");

                    b.Property<string>("SDT")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SoDu")
                        .HasColumnType("int");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("MaKH");

                    b.HasIndex("username");

                    b.ToTable("KhachHang");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.NhanVien", b =>
                {
                    b.Property<int>("MaNV")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaNV"));

                    b.Property<string>("DiaChi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoTen")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SDT")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("MaNV");

                    b.HasIndex("username");

                    b.ToTable("NhanVien");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.TinhTrangBenh", b =>
                {
                    b.Property<int>("MaDonDK")
                        .HasColumnType("int");

                    b.Property<int>("MaBenh")
                        .HasColumnType("int");

                    b.Property<string>("TinhTrang")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MaDonDK", "MaBenh");

                    b.HasIndex("MaBenh");

                    b.ToTable("TinhTrangBenh");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.Users", b =>
                {
                    b.Property<string>("username")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("FirstLogin")
                        .HasColumnType("bit");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("username");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.YeuCauHoanTra", b =>
                {
                    b.Property<int>("MaYC")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MaYC"));

                    b.Property<string>("Benh")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("MaGoiBHApDung")
                        .HasColumnType("int");

                    b.Property<string>("MaHDKhamBenh")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("MaKH")
                        .HasColumnType("int");

                    b.Property<int?>("MaNV")
                        .HasColumnType("int");

                    b.Property<int>("SoTienDaKham")
                        .HasColumnType("int");

                    b.Property<int?>("SoTienHoanTra")
                        .HasColumnType("int");

                    b.Property<string>("TenBenhVien")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ThoiGianDuyet")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ThoiGianTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("TinhTrang")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("MaYC");

                    b.HasIndex("MaGoiBHApDung");

                    b.HasIndex("MaHDKhamBenh")
                        .IsUnique()
                        .HasFilter("[MaHDKhamBenh] IS NOT NULL");

                    b.HasIndex("MaKH");

                    b.HasIndex("MaNV");

                    b.ToTable("YeuCauHoanTra");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.ChinhSach", b =>
                {
                    b.HasOne("BaoHiemYTe.Domain.Benh", "Benh")
                        .WithMany()
                        .HasForeignKey("MaBenh")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BaoHiemYTe.Domain.GoiBaoHiem", "GoiBaoHiem")
                        .WithMany()
                        .HasForeignKey("MaGoiBH")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Benh");

                    b.Navigation("GoiBaoHiem");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.DonDangKy", b =>
                {
                    b.HasOne("BaoHiemYTe.Domain.GoiBaoHiem", "GoiBaoHiem")
                        .WithMany()
                        .HasForeignKey("MaGoiBH")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BaoHiemYTe.Domain.KhachHang", "KhachHang")
                        .WithMany()
                        .HasForeignKey("MaKH")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BaoHiemYTe.Domain.NhanVien", "NhanVien")
                        .WithMany()
                        .HasForeignKey("MaNV")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("GoiBaoHiem");

                    b.Navigation("KhachHang");

                    b.Navigation("NhanVien");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.HoaDonHoanTra", b =>
                {
                    b.HasOne("BaoHiemYTe.Domain.YeuCauHoanTra", "YeuCauHoanTra")
                        .WithMany()
                        .HasForeignKey("MaYC")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("YeuCauHoanTra");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.HoaDonKhamBenh", b =>
                {
                    b.HasOne("BaoHiemYTe.Domain.BenhVien", "BenhVien")
                        .WithMany()
                        .HasForeignKey("MaBV")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BenhVien");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.HoaDonNapTien", b =>
                {
                    b.HasOne("BaoHiemYTe.Domain.KhachHang", "KhachHang")
                        .WithMany()
                        .HasForeignKey("MaKH")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BaoHiemYTe.Domain.NhanVien", "NhanVien")
                        .WithMany()
                        .HasForeignKey("MaNV")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("KhachHang");

                    b.Navigation("NhanVien");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.HoaDonThanhToanDK", b =>
                {
                    b.HasOne("BaoHiemYTe.Domain.DonDangKy", "DonDangKy")
                        .WithMany()
                        .HasForeignKey("MaDonDK")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DonDangKy");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.KhachHang", b =>
                {
                    b.HasOne("BaoHiemYTe.Domain.Users", "Users")
                        .WithMany()
                        .HasForeignKey("username")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Users");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.NhanVien", b =>
                {
                    b.HasOne("BaoHiemYTe.Domain.Users", "Users")
                        .WithMany()
                        .HasForeignKey("username")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Users");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.TinhTrangBenh", b =>
                {
                    b.HasOne("BaoHiemYTe.Domain.Benh", "Benh")
                        .WithMany()
                        .HasForeignKey("MaBenh")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BaoHiemYTe.Domain.DonDangKy", "DonDangKy")
                        .WithMany()
                        .HasForeignKey("MaDonDK")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Benh");

                    b.Navigation("DonDangKy");
                });

            modelBuilder.Entity("BaoHiemYTe.Domain.YeuCauHoanTra", b =>
                {
                    b.HasOne("BaoHiemYTe.Domain.GoiBaoHiem", "GoiBaoHiem")
                        .WithMany()
                        .HasForeignKey("MaGoiBHApDung")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("BaoHiemYTe.Domain.HoaDonKhamBenh", "HoaDonKhamBenh")
                        .WithMany()
                        .HasForeignKey("MaHDKhamBenh")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("BaoHiemYTe.Domain.KhachHang", "KhachHang")
                        .WithMany()
                        .HasForeignKey("MaKH")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BaoHiemYTe.Domain.NhanVien", "NhanVien")
                        .WithMany()
                        .HasForeignKey("MaNV")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("GoiBaoHiem");

                    b.Navigation("HoaDonKhamBenh");

                    b.Navigation("KhachHang");

                    b.Navigation("NhanVien");
                });
#pragma warning restore 612, 618
        }
    }
}