using BaoHiemYTe.Data;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Mvc;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonKhamBenhController : ControllerBase
    {
        private readonly UserDbContext userDbContext;
        private readonly TokenService tokenService;

        public HoaDonKhamBenhController(UserDbContext userDbContext, TokenService tokenService)
        {
            this.userDbContext = userDbContext;
            this.tokenService = tokenService;
        }

        [HttpGet("GetSoTienKham/{MaHDKhamBenh}/{MaBV}")]
        public IActionResult GetSoTienKham(string MaHDKhamBenh, int MaBV)
        {
            var tokenService = new TokenService();
            var username = tokenService.GetUsernameFromToken(HttpContext.Request);
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Unauthorized: Token is missing or invalid");
            }
            var KH = userDbContext.KhachHang
            .Where(u => u.username == username)
            .FirstOrDefault();

            if (KH == null)
            {
                return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
            }
            var hoaDon = userDbContext.HoaDonKhamBenh
                .FirstOrDefault(hd => hd.MaHDKhamBenh == MaHDKhamBenh &&
                                        hd.CCCD == KH.CCCD &&
                                        hd.MaBV == MaBV);

            if (hoaDon == null)
            {
                return NotFound("Không tìm thấy hóa đơn"); // Trả về 404 nếu không tìm thấy hóa đơn
            }
            if (hoaDon.TinhTrang == 1)
            {
                return NotFound("Hóa đơn đã được sử dụng");
            }
            if (hoaDon.TinhTrang == 2)
            {
                return NotFound("Hóa đơn đang chờ duyệt");
            }
            return Ok(hoaDon.SoTienKham); // Trả về SoTienKham nếu tìm thấy và TinhTrang bằng 0
        }
    }
}
