using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaoHiemYTe.Domain
{
    public class HoaDonKhamBenh
    {
        [Key]
        public string MaHDKhamBenh { get; set; }
        public int SoTienKham { get; set; }
        public string CCCD { get; set; }

        public int MaBV { get; set; }
        // Khai báo quan hệ với GoiBaoHiem và Benh
        [ForeignKey("MaBV")]
        public BenhVien BenhVien { get; set; }
        public int TinhTrang { get; set; }

     
    }
}
