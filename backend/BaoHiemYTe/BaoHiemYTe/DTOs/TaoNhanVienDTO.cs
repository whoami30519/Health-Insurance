namespace BaoHiemYTe.DTOs
{
    public class TaoNhanVienDTO
    {
        public string HoTen { get; set; }
        public string DiaChi { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }

        // Thêm các thông tin cần thiết cho tài khoản người dùng
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
