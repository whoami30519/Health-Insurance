using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BaoHiemYTe.Domain
{
    public class HoaDonNapTien
    {
        [Key]
        public int MaHD { get; set; }

        public int SoTien { get; set; }
        public int SoDu { get; set; }

        public DateTime ThoiGianNap { get; set; }
        public int MaKH { get; set; }
        public int MaNV { get; set; }

        [ForeignKey("MaKH")]
        public KhachHang KhachHang { get; set; }

        [ForeignKey("MaNV")]
        public NhanVien NhanVien { get; set; }
    }
}
