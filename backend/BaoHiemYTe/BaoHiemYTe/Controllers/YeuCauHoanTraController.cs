using BaoHiemYTe.Data;
using BaoHiemYTe.Domain;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YeuCauHoanTraController : ControllerBase
    {
        // GET: api/<GoiBaoHiemController>
        private readonly UserDbContext userDbContext;
        private readonly TokenService tokenService;
        public YeuCauHoanTraController(UserDbContext userDbContext, TokenService tokenService)
        {
            this.userDbContext = userDbContext;
            this.tokenService = tokenService;
        }

        [HttpGet("GetAllYeuCauHoanTra")]
        public IActionResult GetAllYeuCauHoanTra()
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
                if (role != "Nhân viên")
                {
                    return Unauthorized("Unauthorized: role is missing or invalid");
                }
                // Lấy tất cả các YeuCauHoanTra từ database
                var yeuCauHoanTraList = userDbContext.YeuCauHoanTra.ToList();

                // Nếu không có yêu cầu nào, trả về NotFound
                if (yeuCauHoanTraList == null || !yeuCauHoanTraList.Any())
                {
                    return NotFound("Không có yêu cầu hoàn trả nào được tìm thấy.");
                }

                // Chuyển đổi từ List<YeuCauHoanTra> sang List<YeuCauHoanTraDTO>
                var yeuCauHoanTraDTOs = yeuCauHoanTraList.Select(y => new YeuCauHoanTraDTO
                {
                    MaYC = y.MaYC,
                    MaHDKhamBenh = y.MaHDKhamBenh,
                    TenBenhVien = y.TenBenhVien,
                    SoTienDaKham = y.SoTienDaKham,
                    Benh = y.Benh,
                    ThoiGianTao = y.ThoiGianTao,
                    TinhTrang = y.TinhTrang,
                    MaGoiBHApDung = y.MaGoiBHApDung,
                    SoTienHoanTra = y.SoTienHoanTra,
                    MaKH = y.MaKH,
                    MaNV = y.MaNV,
                    ThoiGianDuyet = y.ThoiGianDuyet
                }).ToList();


                return Ok(yeuCauHoanTraDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }
        [HttpGet("{maYC}")]
        public IActionResult GetYeuCauHoanTraById(int maYC)
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
                if (role != "Nhân viên")
                {
                    return Unauthorized("Unauthorized: role is missing or invalid");
                }
                // Tìm YeuCauHoanTra theo ID trong database
                var yeuCauHoanTra = userDbContext.YeuCauHoanTra.FirstOrDefault(y => y.MaYC == maYC);

                // Nếu không tìm thấy, trả về NotFound
                if (yeuCauHoanTra == null)
                {
                    return NotFound($"Không tìm thấy yêu cầu hoàn trả với ID {maYC}.");
                }

                // Chuyển đổi từ YeuCauHoanTra sang YeuCauHoanTraDTO
                var yeuCauHoanTraDTO = new YeuCauHoanTraDTO
                {
                    MaYC = yeuCauHoanTra.MaYC,
                    MaHDKhamBenh = yeuCauHoanTra.MaHDKhamBenh,
                    TenBenhVien = yeuCauHoanTra.TenBenhVien,
                    SoTienDaKham = yeuCauHoanTra.SoTienDaKham,
                    Benh = yeuCauHoanTra.Benh,
                    ThoiGianTao = yeuCauHoanTra.ThoiGianTao,
                    TinhTrang = yeuCauHoanTra.TinhTrang,
                    MaGoiBHApDung = yeuCauHoanTra.MaGoiBHApDung,
                    SoTienHoanTra = yeuCauHoanTra.SoTienHoanTra,
                    MaKH = yeuCauHoanTra.MaKH,
                    MaNV = yeuCauHoanTra.MaNV,
                    ThoiGianDuyet = yeuCauHoanTra.ThoiGianDuyet
                };

                return Ok(yeuCauHoanTraDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }


        [HttpGet("GetYCHTByCus")]
        public IActionResult GetYCHTByCus()
        {
            var tokenService = new TokenService();
            var username = tokenService.GetUsernameFromToken(HttpContext.Request);
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Unauthorized: Token is missing or invalid");
            }
            var maKH = userDbContext.KhachHang
            .Where(u => u.username == username)
            .Select(u => u.MaKH)
            .FirstOrDefault();

            if (maKH == 0)
            {
                return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
            }

            // Lấy danh sách Ma yeu cau
            var maYCHTs = userDbContext.YeuCauHoanTra
                .Where(d => d.MaKH == maKH)
                .Select(d => d.MaYC)
                .ToList();

            if (maYCHTs == null || !maYCHTs.Any())
            {
                return NotFound($"Không có danh sách hoàn trả");
            }
            var MaYCEntities = userDbContext.YeuCauHoanTra
                .Where(h => maYCHTs.Contains(h.MaYC))
                .ToList();

            if (MaYCEntities == null || !MaYCEntities.Any())
            {
                return NotFound($"Người dùng {maYCHTs} không có 2");
            }
            var YeuCauHoanTraDTOs = MaYCEntities.Select(h => new YeuCauHoanTraDTO
            {
                MaYC = h.MaYC,
                MaHDKhamBenh = h.MaHDKhamBenh,
                TenBenhVien = h.TenBenhVien,
                Benh = h.Benh,
                SoTienDaKham = h.SoTienDaKham,
                ThoiGianTao = h.ThoiGianTao,
                TinhTrang = h.TinhTrang,
                MaGoiBHApDung = h.MaGoiBHApDung,
                SoTienHoanTra = h.SoTienHoanTra,
                MaKH = h.MaKH,
                MaNV = h.MaNV,
                ThoiGianDuyet = h.ThoiGianDuyet,

            }).ToList();

            return Ok(YeuCauHoanTraDTOs);
        }
        [HttpPost("TaoYeuCauHoanTra")]
        public IActionResult TaoYeuCauHoanTra([FromBody] AddYeuCauHoanTraDTO yeuCauDTO)
        {
            try
            {
                // Lấy thông tin MaKH từ bảng KhachHang
                var khachHang = userDbContext.KhachHang
                    .Where(u => u.username == yeuCauDTO.username)
                    .FirstOrDefault();

                if (khachHang == null)
                {
                    return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {yeuCauDTO.username}");
                }
                // Tạo đối tượng YeuCauHoanTra từ DTO
                var yeuCauHoanTra = new YeuCauHoanTra
                {
                    MaHDKhamBenh = yeuCauDTO.MaHDKhamBenh,
                    TenBenhVien = yeuCauDTO.TenBenhVien,
                    SoTienDaKham = yeuCauDTO.SoTienDaKham,
                    Benh = yeuCauDTO.Benh,
                    MaGoiBHApDung = yeuCauDTO.MaGoiBHApDung,
                    ThoiGianTao = DateTime.Now,
                    TinhTrang = "Chờ duyệt",
                    MaKH = khachHang.MaKH,
                    ThoiGianDuyet = null,
                    MaNV = null,
                    SoTienHoanTra = yeuCauDTO.SoTienHoanTra
                };

                // Thêm vào context và lưu vào database
                userDbContext.YeuCauHoanTra.Add(yeuCauHoanTra);
                userDbContext.SaveChanges();
                // Cập nhật tình trạng của bảng hóa đơn thành 2
                var hoaDon = userDbContext.HoaDonKhamBenh
                    .Where(hd => hd.MaHDKhamBenh == yeuCauDTO.MaHDKhamBenh)
                    .FirstOrDefault();

                if (hoaDon != null)
                {
                    hoaDon.TinhTrang = 2;
                    userDbContext.SaveChanges();
                }
                return Ok("Yêu cầu hoàn trả đã được tạo thành công");
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlException && sqlException.Number == 2601)
                {
                    // Lỗi 2601 là lỗi unique constraint
                    // Xử lý lỗi unique constraint ở đây
                    return StatusCode(400, "Mã hóa đơn khám bệnh đã tồn tại.");
                }
                else
                {
                    // Xử lý các trường hợp khác của DbUpdateException
                    return StatusCode(500, "Lỗi: " + ex.InnerException?.Message);
                }
            }
            catch (Exception ex)
            {
                // Xử lý các ngoại lệ khác
                return StatusCode(500, "Lỗi: " + ex.Message);
            }

        }
        [HttpPut("CapNhat/{id}")]
        public IActionResult CapNhatTinhTrangThoiGianDuyet(int id, [FromBody] CapNhatYeuCauHoanTraDTO capNhatDTO)
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
                return Unauthorized("Unauthorized: role is missing or invalid");
            }
            try
            {
                // Lấy thông tin YeuCauHoanTra từ ID
                var yeuCauHoanTra = userDbContext.YeuCauHoanTra.Find(id);

                if (yeuCauHoanTra == null)
                {
                    return NotFound($"Không tìm thấy yêu cầu hoàn trả có ID {id}");
                }

                // Cập nhật thông tin
                yeuCauHoanTra.TinhTrang = capNhatDTO.TinhTrang;
                yeuCauHoanTra.ThoiGianDuyet = capNhatDTO.ThoiGianDuyet;
                yeuCauHoanTra.MaNV = capNhatDTO.MaNV;

                // Lưu vào database
                userDbContext.SaveChanges();

                return Ok("Cập nhật thông tin yêu cầu hoàn trả thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }

    }
}
