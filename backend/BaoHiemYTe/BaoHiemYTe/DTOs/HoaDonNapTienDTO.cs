using BaoHiemYTe.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaoHiemYTe.DTOs
{
    public class HoaDonNapTienDTO
    {
        public int MaHD { get; set; }

        public int SoTien { get; set; }
        public int SoDu { get; set; }

        public DateTime ThoiGianNap { get; set; }
        public int MaKH { get; set; }
        public int MaNV { get; set; }

     
    }
}
