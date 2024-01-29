using BaoHiemYTe.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaoHiemYTe.DTOs
{
    public class YeuCauHoanTraDTO
    {
        public int MaYC { get; set; }

        public string MaHDKhamBenh { get; set; }

        public string TenBenhVien { get; set; }
        public int SoTienDaKham { get; set; }
        public string Benh { get; set; }
        public DateTime ThoiGianTao { get; set; }
        public string TinhTrang { get; set; }
        public int? MaGoiBHApDung { get; set; }

        public int? SoTienHoanTra { get; set; }
        public int MaKH { get; set; }
        public int? MaNV { get; set; }

        public DateTime? ThoiGianDuyet { get; set; }
    }
}