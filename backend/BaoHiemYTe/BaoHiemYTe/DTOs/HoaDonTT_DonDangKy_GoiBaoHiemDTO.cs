using BaoHiemYTe.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaoHiemYTe.DTOs
{
    public class HoaDonTT_DonDangKy_GoiBaoHiemDTO
    {
        //Gói bảo hiểm 
        
        public string TenGoiBH { get; set; }
        public string MotaGoiBH { get; set; }
        public int Gia { get; set; }
        public int TiLeHoanTien { get; set; }
        public int ThoiHanBaoVe { get; set; }
        //DonDangKy
   

        public DateTime ThoiGianDK { get; set; }
        public DateTime? ThoiGianBD { get; set; }
        public DateTime? ThoiGianHetHan { get; set; }
        public string TinhTrang { get; set; }
        public int SoKyHanThanhToan { get; set; }
        public int TongGia { get; set; }

        //Hóa đơn thanh toán
        public int MaHD { get; set; }

        public int SoTien { get; set; }
        public int TienPhat { get; set; }
        public string? LiDoPhat { get; set; }
        public int TongTien { get; set; }

        public string HanKy { get; set; }

        public string TinhTrangThanhToan { get; set; }
        public DateTime? ThoiGianThanhToan { get; set; }
        public DateTime ThoiGianHetHanThanhToan { get; set; }
        public int MaDonDK { get; set; }

      
    }
}
