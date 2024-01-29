using BaoHiemYTe.Domain;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BaoHiemYTe.DTOs
{
    public class KhachHangDTO
    {
        public int? MaKH { get; set; }
        public string HoTen { get; set; }
        public DateTime NgaySinh { get; set; }
        public string GioiTinh { get; set; }
        public string CCCD { get; set; }
        public string DiaChi { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }
        public int? SoDu { get; set; }
        public string? username { get; set; }
    }
}
