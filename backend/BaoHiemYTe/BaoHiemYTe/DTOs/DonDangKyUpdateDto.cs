using BaoHiemYTe.Domain;

namespace BaoHiemYTe.DTOs
{
    public class DonDangKyUpdateDto
    {
        public string TinhTrang { get; set; }
        public int MaNV { get; set; }
        public string LiDoTuChoi { get; set; }

        public DateTime ThoiGianDuyet { get; set; }


        // Properties for updating NhanVien
        public string DiaChi { get; set; }
        public string Email { get; set; }
        public string HoTen { get; set; }
        public string SDT { get; set; }
        public List<HoaDonThanhToanDKDTO>? DS_HoaDonThanhToanDK { get; set; }  // Danh sách id bệnh

        // Add more properties as needed for updating NhanVien
    }
}