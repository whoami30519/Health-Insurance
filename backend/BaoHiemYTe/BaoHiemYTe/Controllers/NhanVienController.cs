using BaoHiemYTe.Data;
using BaoHiemYTe.Domain;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanVienController: ControllerBase
    {
        private readonly UserDbContext userDbContext;
        public NhanVienController(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }
        [HttpGet]
        public IActionResult GetAllNhanVien()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var tokenService = new TokenService();
                var username = tokenService.GetUsernameFromToken(HttpContext.Request);
                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }
                var role = tokenService.GetRoleFromToken(HttpContext.Request);
                if (role != "Admin")
                {
                    return Unauthorized("Unauthorized: Chỉ có Admin mới có quyền tạo nhân viên");
                }
                var nhanVienList = userDbContext.NhanVien
                    .Select(u => new NhanVienDTO
                    {
                        MaNV = u.MaNV,
                        HoTen = u.HoTen,
                        DiaChi = u.DiaChi,
                        SDT = u.SDT,
                        Email = u.Email
                    })
                    .ToList();

                return Ok(nhanVienList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình lấy dữ liệu: {ex.Message}");
            }
        }

        [HttpGet("{username}")]
        public IActionResult GetByUsername()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check for the presence and validity of the token
            var tokenService = new TokenService();
            var username = tokenService.GetUsernameFromToken(HttpContext.Request);
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Unauthorized: Token is missing or invalid");
            }
            var role = tokenService.GetRoleFromToken(HttpContext.Request);
            if (role != "Nhân viên")
            {
                return Unauthorized("Unauthorized: Role is missing or invalid");
            }
            try
            {
                var user = userDbContext.NhanVien.FirstOrDefault(u => u.username == username);

                if (user == null)
                {
                    return NotFound("Không tìm thấy username");
                }

                var NhanVienDTO = new NhanVienDTO
                {
                    MaNV = user.MaNV,
                    HoTen = user.HoTen,
                    DiaChi = user.DiaChi,
                    SDT = user.SDT,
                    Email = user.Email
                };

                return Ok(NhanVienDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình lấy dữ liệu: {ex.Message}");
            }
        }
        [HttpPost]
        public IActionResult CreateNhanVien([FromBody] TaoNhanVienDTO newNhanVienDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Thực hiện kiểm tra quyền truy cập và xác minh thông tin     
                var tokenService = new TokenService();
                var username = tokenService.GetUsernameFromToken(HttpContext.Request);
                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }

                var role = tokenService.GetRoleFromToken(HttpContext.Request);
                if (role != "Admin")
                {
                    return Unauthorized("Unauthorized: Chỉ có Admin mới có quyền tạo nhân viên");
                }

                // Kiểm tra xem username đã tồn tại chưa
                var existingUser = userDbContext.Users.FirstOrDefault(u => u.username == newNhanVienDTO.Username);
                if (existingUser != null)
                {
                    return BadRequest("Username đã tồn tại. Vui lòng chọn username khác.");
                }

                // Kiểm tra xem Email đã tồn tại chưa
                var existingEmail = userDbContext.NhanVien.FirstOrDefault(nv => nv.Email == newNhanVienDTO.Email);
                if (existingEmail != null)
                {
                    return BadRequest("Email đã tồn tại. Vui lòng sử dụng Email khác.");
                }

                // Tạo mới tài khoản người dùng
                var newUser = new Users
                {
                    username = newNhanVienDTO.Username,
                    password = newNhanVienDTO.Password,
                    role = newNhanVienDTO.Role,
                    FirstLogin = false
                };

                // Thêm người dùng mới vào cơ sở dữ liệu
                userDbContext.Users.Add(newUser);
                userDbContext.SaveChanges();

                // Tạo mới nhân viên với thông tin từ DTO và username của người dùng
                var newNhanVien = new NhanVien
                {
                    HoTen = newNhanVienDTO.HoTen,
                    DiaChi = newNhanVienDTO.DiaChi,
                    SDT = newNhanVienDTO.SDT,
                    Email = newNhanVienDTO.Email,
                    username = newNhanVienDTO.Username
                };

                // Thêm nhân viên mới vào cơ sở dữ liệu
                userDbContext.NhanVien.Add(newNhanVien);
                userDbContext.SaveChanges();

                // Trả về thông tin nhân viên vừa tạo
                var createdNhanVienDTO = new NhanVienDTO
                {
                    MaNV = newNhanVien.MaNV,
                    HoTen = newNhanVien.HoTen,
                    DiaChi = newNhanVien.DiaChi,
                    SDT = newNhanVien.SDT,
                    Email = newNhanVien.Email
                };

                return CreatedAtAction(nameof(GetByUsername), new { username = newNhanVien.username }, createdNhanVienDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình tạo mới nhân viên: {ex.Message}");
            }
        }



        [HttpGet("GetHoaDonNapTien")]
        public IActionResult GetHoaDonNapTien()
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
                // Kiểm tra xem MaNV có tồn tại và có role Nhân viên hay không
                var nhanVien = userDbContext.NhanVien
                    .FirstOrDefault(nv => nv.username == username);

                if (nhanVien == null)
                {
                    return Unauthorized("Không có quyền truy cập");
                }

                // Lấy danh sách hóa đơn nạp tiền
                var hoaDonNapTienList = userDbContext.HoaDonNapTien
                    .Where(hd => hd.MaNV == nhanVien.MaNV)
                    .Select(hd => new HoaDonNapTienDTO
                    {
                        MaHD = hd.MaHD,
                        SoTien = hd.SoTien,
                        SoDu = hd.SoDu,
                        ThoiGianNap = hd.ThoiGianNap,
                        MaKH = hd.MaKH,
                        MaNV = hd.MaNV
                    })
                    .ToList();

                if (hoaDonNapTienList != null && hoaDonNapTienList.Any())
                {
                    return Ok(hoaDonNapTienList);
                }
                else
                {
                    return NotFound("Không có hóa đơn nạp tiền nào");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình xử lý: {ex.Message}");
            }
        }


        [HttpGet("ThongTinTongHop")]
        public async Task<ActionResult<ThongTinTongHopDTO>> GetThongTinTongHop()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check for the presence and validity of the token
            var tokenService = new TokenService();
            var username = tokenService.GetUsernameFromToken(HttpContext.Request);
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Unauthorized: Token is missing or invalid");
            }
            var role = tokenService.GetRoleFromToken(HttpContext.Request);
            if (role != "Nhân viên")
            {
                return Unauthorized("Unauthorized: Role is missing or invalid");
            }
            var donDangKyChuaDuyet = await userDbContext.DonDangKy.CountAsync(d => d.TinhTrang == "Chờ duyệt");
            var goiBaoHiemDangCungCap = await userDbContext.GoiBaoHiem.CountAsync(g => g.TinhTrang == "Đang cung cấp");
            var yeuCauHoanTraChuaDuyet = await userDbContext.YeuCauHoanTra.CountAsync(y => y.TinhTrang == "Chờ duyệt");
            var khachHangTinhTrang1 = await userDbContext.KhachHang.CountAsync();
            var baoCaoTaiChinhGiaTri1000000 = 1000000;

            var thongTinTongHopDTO = new ThongTinTongHopDTO
            {
                DonDangKyChuaDuyet = donDangKyChuaDuyet,
                GoiBaoHiemDangCungCap = goiBaoHiemDangCungCap,
                YeuCauHoanTraChuaDuyet = yeuCauHoanTraChuaDuyet,
                KhachHangTinhTrang1 = khachHangTinhTrang1,
                BaoCaoTaiChinhGiaTri1000000 = baoCaoTaiChinhGiaTri1000000
            };

            return thongTinTongHopDTO;
        }
    

    public class ThongTinTongHopDTO
    {
        public int DonDangKyChuaDuyet { get; set; }
        public int GoiBaoHiemDangCungCap { get; set; }
        public int YeuCauHoanTraChuaDuyet { get; set; }
        public int KhachHangTinhTrang1 { get; set; }
        public int BaoCaoTaiChinhGiaTri1000000 { get; set; }
    }
}
}
