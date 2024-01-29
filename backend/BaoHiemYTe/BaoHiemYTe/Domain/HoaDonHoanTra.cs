using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BaoHiemYTe.Domain
{
    public class HoaDonHoanTra
    {
        [Key]
        public int MaHDHoanTra { get; set; }

        public int SoTien { get; set; }

        public DateTime ThoiGianTao { get; set; }
        public int MaYC { get; set; }

      

        [ForeignKey("MaYC")]
        public YeuCauHoanTra YeuCauHoanTra { get; set; }
    }
}
