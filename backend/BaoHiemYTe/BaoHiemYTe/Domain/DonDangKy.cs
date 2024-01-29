using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaoHiemYTe.Domain
{
    public class DonDangKy
    {
        [Key]
        public int MaDonDK { get; set; }
       
        public int MaGoiBH { get; set; }

        public DateTime ThoiGianDK { get; set; }
        public DateTime ThoiGianBD { get; set; }
        public DateTime ThoiGianHetHan { get; set; }
        public string TinhTrang { get; set; }
        public string? LiDoTuChoi { get; set; }
        //LuaChonThanhToan(1 lần/Năm)
        public int SoKyHanThanhToan { get; set; }
        public int TongGia { get; set; }
        public int MaKH { get; set; }
        public int? MaNV { get; set; }
        [ForeignKey("MaKH")]
        public KhachHang KhachHang { get; set; }

        [ForeignKey("MaGoiBH")]
        public GoiBaoHiem GoiBaoHiem { get; set; }

        [ForeignKey("MaNV")]
        public NhanVien NhanVien { get; set; }
        public DateTime? ThoiGianDuyet { get; set; }


    }
}
