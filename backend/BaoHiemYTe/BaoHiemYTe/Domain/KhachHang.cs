using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaoHiemYTe.Domain
{
    public class KhachHang
    {
        [Key]
        public int MaKH { get; set; }
        public string HoTen { get; set; }
        public DateTime NgaySinh { get; set; }
        public string GioiTinh { get; set; }
        public string CCCD { get; set; }
        public string DiaChi { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }
        public int SoDu { get; set; }

        // Khai báo khóa ngoại với User
        [ForeignKey("username")]
        public Users Users { get; set; }

        public string username { get; set; }
    }
}
