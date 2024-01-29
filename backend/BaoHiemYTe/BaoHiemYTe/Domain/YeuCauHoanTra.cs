using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BaoHiemYTe.Domain
{
    public class YeuCauHoanTra
    {
        [Key]
        public int MaYC { get; set; }
    
        public string MaHDKhamBenh { get; set; }
        [ForeignKey("MaHDKhamBenh")]
        public HoaDonKhamBenh HoaDonKhamBenh { get; set; }

        public string  TenBenhVien { get; set; }
        public int SoTienDaKham { get; set; }
        public string  Benh { get; set; }
        public DateTime ThoiGianTao { get; set; }
        public string TinhTrang { get; set; }
        public int?  MaGoiBHApDung { get; set; }
        [ForeignKey("MaGoiBHApDung")]
        public GoiBaoHiem GoiBaoHiem { get; set; }
        public int?  SoTienHoanTra { get; set; }
        public int MaKH { get; set; }
        public int? MaNV { get; set; }

        [ForeignKey("MaKH")]
        public KhachHang KhachHang { get; set; }

        [ForeignKey("MaNV")]
        public NhanVien NhanVien { get; set; }
        public DateTime? ThoiGianDuyet { get; set; }
    }
}
