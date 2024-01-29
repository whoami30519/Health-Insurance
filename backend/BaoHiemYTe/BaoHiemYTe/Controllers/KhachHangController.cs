using BaoHiemYTe.Data;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BaoHiemYTe.Controllers;
using BaoHiemYTe.Domain;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly UserDbContext userDbContext;
        private readonly TokenService tokenService;

        public KhachHangController(UserDbContext userDbContext, TokenService tokenService)
        {
            this.userDbContext = userDbContext;
            this.tokenService = tokenService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var tokenService = new TokenService();
                var username_ = tokenService.GetUsernameFromToken(HttpContext.Request);

                if (string.IsNullOrEmpty(username_))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }


                //Kiểm tra xem username có tồn tại trong bảng KhachHang hay không
                var existingKhachHang = userDbContext.KhachHang.FirstOrDefault(kh => kh.username == username_);

                if (existingKhachHang != null)
                {
                    // Return information for the found user
                    var khachHangDTO = new KhachHangDTO
                    {
                        MaKH = existingKhachHang.MaKH,
                        HoTen = existingKhachHang.HoTen,
                        CCCD = existingKhachHang.CCCD,
                        DiaChi = existingKhachHang.DiaChi,
                        SDT = existingKhachHang.SDT,
                        Email = existingKhachHang.Email,
                        SoDu = existingKhachHang.SoDu,
                        NgaySinh = existingKhachHang.NgaySinh,
                        GioiTinh = existingKhachHang.GioiTinh,
                        username = username_
                    };

                    return Ok(khachHangDTO);
                }
                else
                {
                    return NotFound($"Không tìm thấy thông tin cho người dùng có username: {username_}");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình xử lý: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] KhachHangDTO khachHangDTO)
        {
            try
            {

                var tokenService = new TokenService();
                var username_ = tokenService.GetUsernameFromToken(HttpContext.Request);

                if (string.IsNullOrEmpty(username_))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }

                // Kiểm tra xem username có tồn tại trong bảng KhachHang hay không
                var existingKhachHang = userDbContext.KhachHang.FirstOrDefault(kh => kh.username == username_);

                if (existingKhachHang != null)
                {
                    // Nếu đã có, cập nhật thông tin
                    existingKhachHang.HoTen = khachHangDTO.HoTen;
                    existingKhachHang.DiaChi = khachHangDTO.DiaChi;
                    existingKhachHang.SDT = khachHangDTO.SDT;
                    existingKhachHang.Email = khachHangDTO.Email;
                    existingKhachHang.GioiTinh = khachHangDTO.GioiTinh;
                    existingKhachHang.CCCD = khachHangDTO.CCCD;
                    existingKhachHang.NgaySinh = khachHangDTO.NgaySinh;
                    userDbContext.SaveChanges();
                    return Ok("Cập nhật thông tin thành công");
                }
                else
                {
                    // Nếu không tìm thấy username, tạo dòng mới
                    var newKhachHang = new KhachHang
                    {
                        HoTen = khachHangDTO.HoTen,
                        DiaChi = khachHangDTO.DiaChi,
                        SDT = khachHangDTO.SDT,
                        SoDu = 5000000,
                        Email = khachHangDTO.Email,
                        CCCD = khachHangDTO.CCCD,
                        GioiTinh = khachHangDTO.GioiTinh,
                        NgaySinh = khachHangDTO.NgaySinh,
                        username = username_
                    };
                    userDbContext.KhachHang.Add(newKhachHang);
                    userDbContext.SaveChanges();
                }

                var currentUser = userDbContext.Users.FirstOrDefault(u => u.username == username_);
                if (currentUser != null)
                {
                    currentUser.FirstLogin = false;
                }

                userDbContext.SaveChanges();

                return Ok("Thêm thông tin thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình xử lý: {ex.Message}");
            }
        }
      
        [HttpGet("GetAllKhachHang")]
        public IActionResult GetAllKhachHang()
        {

            try
            {
                var tokenService = new TokenService();
                var username = tokenService.GetUsernameFromToken(HttpContext.Request);

                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }
                //var username = "admin";

                // Kiểm tra xem người dùng có role "Nhân viên" hay không
                var isNhanVien = userDbContext.Users.Any(u => u.username == username && u.role == "Nhân viên");

                if (isNhanVien)
                {
                    var khachHangList = userDbContext.KhachHang
                        .Select(kh => new KhachHangDTO
                        {
                            MaKH = kh.MaKH,
                            HoTen = kh.HoTen,
                            NgaySinh= kh.NgaySinh,
                            GioiTinh= kh.GioiTinh,
                            CCCD= kh.CCCD,
                            DiaChi = kh.DiaChi,
                            SDT = kh.SDT,
                            Email = kh.Email,
                            SoDu = kh.SoDu,
                            username = kh.username
                        })
                        .ToList();

                    if (khachHangList != null && khachHangList.Any())
                    {
                        return Ok(khachHangList);
                    }
                    else
                    {
                        return NotFound("Không có khách hàng nào trong hệ thống.");
                    }
                }
                else
                {
                    return BadRequest("Không có quyền truy cập danh sách khách hàng");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình xử lý: {ex.Message}");
            }
        }
        [HttpPost("NapTien")]
        public IActionResult NapTien([FromBody] NapTienDTO napTienDTO)
        {
            try
            {
                var tokenService = new TokenService();
                var username = tokenService.GetUsernameFromToken(HttpContext.Request);

                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }
                //var username = "admin";

                // Kiểm tra xem người dùng có role "Nhân viên" hay không
                var isNhanVien = userDbContext.Users.Any(u => u.username == username && u.role == "Nhân viên");

                if (!isNhanVien)
                {
                    return BadRequest("Không có quyền truy cập chức năng nạp tiền");
                }

                // Kiểm tra xem MaKH có tồn tại hay không
                var khachHang = userDbContext.KhachHang.FirstOrDefault(kh => kh.MaKH == napTienDTO.MaKH);

                if (khachHang == null)
                {
                    return NotFound($"Không tìm thấy thông tin cho khách hàng có MaKH: {napTienDTO.MaKH}");
                }

                // Nạp tiền vào tài khoản của khách hàng
                khachHang.SoDu += napTienDTO.SoTien;
                userDbContext.SaveChanges();

                // Tạo hóa đơn nạp tiền
                var hoadonNapTien = new HoaDonNapTien
                {
                    SoTien = napTienDTO.SoTien,
                    SoDu = khachHang.SoDu,
                    ThoiGianNap = DateTime.Now,
                    MaKH = khachHang.MaKH,
                    MaNV = userDbContext.NhanVien.FirstOrDefault(nv => nv.username == username)?.MaNV ?? 0
                };

                userDbContext.HoaDonNapTien.Add(hoadonNapTien);
                userDbContext.SaveChanges();


                return Ok("Nạp tiền thành công");
                }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình xử lý: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetKhachHangById(int id)
        {
            try
            {
                var tokenService = new TokenService();
                var username = tokenService.GetUsernameFromToken(HttpContext.Request);

                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }

                // Kiểm tra xem người dùng có role "Nhân viên" hay không
                var isNhanVien = userDbContext.Users.Any(u => u.username == username && u.role == "Nhân viên");

                if (isNhanVien)
                {
                    // Tìm kiếm khách hàng theo ID
                    var khachHang = userDbContext.KhachHang
                        .FirstOrDefault(kh => kh.MaKH == id);

                    if (khachHang != null)
                    {
                        // Chuyển đổi thành đối tượng DTO để trả về
                        var khachHangDTO = new KhachHangDTO
                        {
                            MaKH = khachHang.MaKH,
                            HoTen = khachHang.HoTen,
                            NgaySinh = khachHang.NgaySinh,
                            GioiTinh = khachHang.GioiTinh,
                            CCCD = khachHang.CCCD,
                            DiaChi = khachHang.DiaChi,
                            SDT = khachHang.SDT,
                            Email = khachHang.Email,
                            SoDu = khachHang.SoDu,
                            username = khachHang.username
                        };

                        return Ok(khachHangDTO);
                    }
                    else
                    {
                        return NotFound($"Không tìm thấy khách hàng với ID: {id}");
                    }
                }
                else
                {
                    return BadRequest("Không có quyền truy cập thông tin khách hàng theo ID");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình xử lý: {ex.Message}");
            }
        }

    }
}
