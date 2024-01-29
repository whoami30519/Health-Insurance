using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BaoHiemYTe.Domain
{
    public class HoaDonThanhToanDK
    {
        [Key]
        public int MaHD { get; set; }

        public int SoTien { get; set; }

        public DateTime ThoiGianHetHan { get; set; }
        public string HanKy { get; set; }
        
        public string TinhTrangThanhToan { get; set; }
        public int TienPhat { get; set; }
        public string? LiDoPhat { get; set; }
        public int TongTien { get; set; }

        public DateTime? ThoiGianThanhToan { get; set; }
        public int MaDonDK { get; set; }
        
        [ForeignKey("MaDonDK")]
        public DonDangKy DonDangKy { get; set; }
    }
}
