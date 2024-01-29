using System.ComponentModel.DataAnnotations.Schema;

namespace BaoHiemYTe.Domain
{
    public class TinhTrangBenh
    {
        public int MaDonDK { get; set; }
        public int MaBenh { get; set; }
        public string TinhTrang { get; set; }

        // Khai báo quan hệ với GoiBaoHiem và Benh
        [ForeignKey("MaDonDK")]
        public DonDangKy ?DonDangKy { get; set; }

        [ForeignKey("MaBenh")]
        public Benh? Benh { get; set; }
    }
}
