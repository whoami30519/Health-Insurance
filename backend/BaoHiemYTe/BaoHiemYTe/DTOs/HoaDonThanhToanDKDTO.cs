using BaoHiemYTe.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaoHiemYTe.DTOs
{
    public class HoaDonThanhToanDKDTO
    {
        public int MaHD { get; set; }

        public int SoTien { get; set; }

        public DateTime ThoiGianHetHan { get; set; }
        public string HanKy { get; set; }

        public string TinhTrangThanhToan { get; set; }
        public int ?TienPhat { get; set; }
        public string? LiDoPhat { get; set; }
        public int? TongTien { get; set; }
        public DateTime? ThoiGianThanhToan { get; set; }
        public int ?MaDonDK { get; set; }
        public string ?TenGoiBH { get; set; }
        public int ?MaKH { get; set; }
    }
}