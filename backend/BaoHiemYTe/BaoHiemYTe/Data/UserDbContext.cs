using BaoHiemYTe.Domain;
using Microsoft.EntityFrameworkCore;

namespace BaoHiemYTe.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {

        }
        public DbSet<Users> Users { get; set; }
        public DbSet<KhachHang> KhachHang { get; set; }
        public DbSet<NhanVien> NhanVien { get; set; }
        public DbSet<GoiBaoHiem> GoiBaoHiem { get; set; }
        public DbSet<Benh> Benh { get; set; }
        public DbSet<ChinhSach> ChinhSach { get; set; }
        //Ràng buộc 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChinhSach>()
                .HasKey(cs => new { cs.MaGoiBH, cs.MaBenh });

            // Điều này chỉ định rằng MaGoiBH là khóa ngoại trỏ đến GoiBaoHiem
            modelBuilder.Entity<ChinhSach>()
                .HasOne(cs => cs.GoiBaoHiem)
                .WithMany()
                .HasForeignKey(cs => cs.MaGoiBH)
                .OnDelete(DeleteBehavior.Restrict);

            // Tương tự cho MaBenh
            modelBuilder.Entity<ChinhSach>()
                .HasOne(cs => cs.Benh)
                .WithMany()
                .HasForeignKey(cs => cs.MaBenh)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TinhTrangBenh>()
               .HasKey(tt => new { tt.MaDonDK, tt.MaBenh });

            modelBuilder.Entity<TinhTrangBenh>()
                .HasOne(tt => tt.DonDangKy)
                .WithMany()
                .HasForeignKey(tt => tt.MaDonDK)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TinhTrangBenh>()
                .HasOne(tt => tt.Benh)
                .WithMany()
                .HasForeignKey(tt => tt.MaBenh)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<BenhVien>()
                .HasIndex(bv => bv.TenBV)
                .IsUnique();

            //DonDangKy
            modelBuilder.Entity<DonDangKy>()
                .HasOne(d => d.NhanVien)
                .WithMany()
                .HasForeignKey(d => d.MaNV)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DonDangKy>()
                .HasOne(d => d.KhachHang)
                .WithMany()
                .HasForeignKey(d => d.MaKH)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DonDangKy>()
              .Property(y => y.ThoiGianDuyet)
              .IsRequired(false);
            modelBuilder.Entity<DonDangKy>()
             .Property(y => y.LiDoTuChoi)
             .IsRequired(false);
            //YeuCauHoanTra
            modelBuilder.Entity<YeuCauHoanTra>()
                .HasOne(y => y.NhanVien)
                .WithMany()
                .HasForeignKey(y => y.MaNV)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<YeuCauHoanTra>()
                .HasOne(y => y.GoiBaoHiem)
                .WithMany()
                .HasForeignKey(y => y.MaGoiBHApDung)
                .IsRequired(false)  // Đây là nơi bạn thêm IsRequired(false) để cho phép giá trị null
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<YeuCauHoanTra>()
                .HasOne(y => y.KhachHang)
                .WithMany()
                .HasForeignKey(y => y.MaKH)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<YeuCauHoanTra>()
                .Property(y => y.ThoiGianDuyet)
                .IsRequired(false);
            modelBuilder.Entity<YeuCauHoanTra>()
                .Property(y => y.SoTienHoanTra)
                .IsRequired(false);
            modelBuilder.Entity<YeuCauHoanTra>()
                .HasOne(y => y.HoaDonKhamBenh)
                .WithMany()
                .HasForeignKey(y => y.MaHDKhamBenh)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<YeuCauHoanTra>()
                .HasIndex(y => y.MaHDKhamBenh)
                .IsUnique();

            //HoaDonThanhToanDK
            modelBuilder.Entity<HoaDonThanhToanDK>()
               .HasIndex(hd => hd.LiDoPhat)
               .IsUnique();
            modelBuilder.Entity<HoaDonThanhToanDK>()
              .HasIndex(hd => hd.ThoiGianThanhToan)
              .IsUnique();
            modelBuilder.Entity<HoaDonNapTien>()
              .HasOne(h => h.NhanVien)
              .WithMany()
              .HasForeignKey(h => h.MaNV)
              .OnDelete(DeleteBehavior.Restrict); // Chỉnh sửa dòng này
        }

        public DbSet<DonDangKy> DonDangKy { get; set; }
        public DbSet<TinhTrangBenh> TinhTrangBenh { get; set; }
        public DbSet<HoaDonThanhToanDK> HoaDonThanhToanDK { get; set; }
        public DbSet<BenhVien> BenhVien { get; set; }
        public DbSet<HoaDonKhamBenh> HoaDonKhamBenh { get; set; }
        public DbSet<YeuCauHoanTra> YeuCauHoanTra { get; set; }
        public DbSet<HoaDonHoanTra> HoaDonHoanTra { get; set; }
        public DbSet<HoaDonNapTien> HoaDonNapTien { get; set; }


    }
}