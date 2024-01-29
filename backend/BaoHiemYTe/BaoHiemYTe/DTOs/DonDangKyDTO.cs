
using BaoHiemYTe.Domain;

public class DonDangKyDTO
{
    public int MaDonDK { get; set; }

    public int MaGoiBH { get; set; }

    public DateTime ThoiGianDK { get; set; }
    public DateTime ThoiGianBD { get; set; }
    public DateTime ThoiGianHetHan { get; set; }
    public string TinhTrang { get; set; }
    //LuaChonThanhToan(1 lần/Năm)
    public string? LiDoTuChoi {  get; set; }
    public DateTime? ThoiGianDuyet {  get; set; }
    public int SoKyHanThanhToan { get; set; }
    public int TongGia { get; set; }
    public int? MaKH { get; set; }
    public int? MaNV { get; set; }
    public KhachHang? KhachHang { get; set; }

    public GoiBaoHiem? GoiBaoHiem { get; set; }

    public NhanVien? NhanVien { get; set; }
    public List<TinhTrangBenh> Benh { get; set; }  // Danh sách id bệnh
}



