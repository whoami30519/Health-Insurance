using BaoHiemYTe.Data;
using BaoHiemYTe.Domain;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Mvc;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoiBaoHiemController : ControllerBase
    {
        // GET: api/<GoiBaoHiemController>
        private readonly UserDbContext userDbContext;
        private readonly TokenService _tokenService;
        public GoiBaoHiemController(UserDbContext userDbContext, TokenService tokenService)
        {
            this.userDbContext = userDbContext;
            _tokenService = tokenService;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var goiBH = userDbContext.GoiBaoHiem
                .Where(g => g.TinhTrang == "Đang cung cấp")
                .ToList();
            return Ok(goiBH);
        }
        [HttpGet]
        [Route("NhanVien")]
        public IActionResult GetAllNV()
        {
            //var tokenService = new TokenService();
            var username = _tokenService.GetUsernameFromToken(HttpContext.Request);
            Console.WriteLine("Username from token: " + username);
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Unauthorized: Token is missing or invalid");
            }
            var role = _tokenService.GetRoleFromToken(HttpContext.Request);
            if (role != "Nhân viên")
            {
                return Unauthorized("Unauthorized: role is missing or invalid");
            }
            var goiBH = userDbContext.GoiBaoHiem
                .ToList();
            return Ok(goiBH);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetGoiBHById(int id)
        {
            var goiBH = userDbContext.GoiBaoHiem.FirstOrDefault(x => x.MaGoiBH == id);
            

            var username = _tokenService.GetUsernameFromToken(HttpContext.Request);
            if (string.IsNullOrEmpty(username))
            {
                goiBH = userDbContext.GoiBaoHiem.FirstOrDefault(x => x.MaGoiBH == id && x.TinhTrang == "Đang cung cấp");
            }
            var role = _tokenService.GetRoleFromToken(HttpContext.Request);
            if (role != "Nhân viên")
            {
                goiBH = userDbContext.GoiBaoHiem.FirstOrDefault(x => x.MaGoiBH == id && x.TinhTrang == "Đang cung cấp");
            }
            if (goiBH == null)
            {
                return NotFound();
            }
            var goiBHDTO = new GoiBaoHiemDTO();
            goiBHDTO.MaGoiBH = goiBH.MaGoiBH;
            goiBHDTO.TenGoiBH = goiBH.TenGoiBH;
            goiBHDTO.MotaGoiBH = goiBH.MotaGoiBH;
            goiBHDTO.DoTuoi = goiBH.DoTuoi;
            goiBHDTO.Gia = goiBH.Gia;
            goiBHDTO.TiLeHoanTien = goiBH.TiLeHoanTien;
            goiBHDTO.ThoiHanBaoVe = goiBH.ThoiHanBaoVe;
            goiBHDTO.TinhTrang = goiBH.TinhTrang;
            return Ok(goiBHDTO);
        }
        [HttpGet]
        [Route("GetGoiBHByCus")]
        public IActionResult GetGoiBHByCus()
        {
            // Check for the presence and validity of the token
            //var tokenService = new TokenService();
            var username = _tokenService.GetUsernameFromToken(HttpContext.Request);
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Unauthorized: Token is missing or invalid");
            }
            // Lấy thông tin MaKH từ bảng KhachHang
            var maKH = userDbContext.KhachHang
                .Where(u => u.username == username)
                .Select(u => u.MaKH)
                .FirstOrDefault();

            if (maKH == 0)
            {
                return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
            }

            // Lấy danh sách Ma Goi BH từ bảng DonDangKy
            var maGoiBHs = userDbContext.DonDangKy
                .Where(d => (d.MaKH == maKH && d.TinhTrang == "Đã kích hoạt"))
                .Select(d => d.MaGoiBH)
                .ToList();

            if (maGoiBHs == null || !maGoiBHs.Any())
            {
                return NotFound($"Người dùng {username} không có Goi Bao Hiem");
            }

            // Lấy thông tin Benh từ bảng Benh
            var GoiBHEntities = userDbContext.GoiBaoHiem
                .Where(h => maGoiBHs.Contains(h.MaGoiBH ))
                .ToList();

            if (GoiBHEntities == null || !GoiBHEntities.Any())
            {
                return NotFound();
            }
            // Chuyển đổi từ List<HoaDonThanhToanDK> sang List<HoaDonThanhToanDKDTO>
            var GoiBHDTOs = GoiBHEntities.Select(h => new GoiBaoHiemDTO
            {
                MaGoiBH = h.MaGoiBH,
                TenGoiBH = h.TenGoiBH,
                MotaGoiBH = h.MotaGoiBH,
                Gia = h.Gia,
                DoTuoi = h.DoTuoi,
                TiLeHoanTien = h.TiLeHoanTien,
                ThoiHanBaoVe = h.ThoiHanBaoVe

        }).ToList();

            return Ok(GoiBHDTOs);
        }

        [HttpPut("{MaGoiBH}/update")]
        public IActionResult ChangeGBHStatus(int MaGoiBH)
        {
            try
            {
                //var tokenService = new TokenService();
                var username = _tokenService.GetUsernameFromToken(HttpContext.Request);
                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Tokennnnn is missing or invalid");
                }
                var role = _tokenService.GetRoleFromToken(HttpContext.Request);
                if (role != "Nhân viên")
                {
                    return Unauthorized("Unauthorized: role is missing or invalid");
                }
                var goiBH = userDbContext.GoiBaoHiem.FirstOrDefault(u => u.MaGoiBH == MaGoiBH);

                if (goiBH == null)
                {
                    return NotFound("Không tìm thấy gói bảo hiểm");
                }

                // Cập nhật tình trạng
                goiBH.TinhTrang = goiBH.TinhTrang == "Đang cung cấp" ? "Ngừng cung cấp" : "Đang cung cấp";

                userDbContext.SaveChanges();

                return Ok("Đổi thông tin gói bảo hiểm thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }

        [HttpPost("add")]
        public IActionResult AddGoiBaoHiem([FromBody] AddGoiBaoHiemDTO goiBaoHiemDTO)
        {
            try
            {
                //var tokenService = new TokenService();
                var username = _tokenService.GetUsernameFromToken(HttpContext.Request);             
                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }
                var role = _tokenService.GetRoleFromToken(HttpContext.Request);
                if (role != "Nhân viên")
                {
                    return Unauthorized("Unauthorized: role is missing or invalid");
                }
                var goiBaoHiem = new GoiBaoHiem
                {
                    TenGoiBH = goiBaoHiemDTO.TenGoiBH,
                    MotaGoiBH = goiBaoHiemDTO.MotaGoiBH,
                    Gia = goiBaoHiemDTO.Gia,
                    DoTuoi = goiBaoHiemDTO.DoTuoi,
                    TiLeHoanTien = goiBaoHiemDTO.TiLeHoanTien,
                    ThoiHanBaoVe = goiBaoHiemDTO.ThoiHanBaoVe,
                    TinhTrang = "Đang cung cấp"
                };

                // Thêm vào context và lưu vào database
                userDbContext.GoiBaoHiem.Add(goiBaoHiem);
                userDbContext.SaveChanges();

                return Ok("Gói Bảo Hiểm được tạo thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }
    }
}
