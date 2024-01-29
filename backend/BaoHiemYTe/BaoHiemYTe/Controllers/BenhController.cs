using BaoHiemYTe.Data;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Mvc;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BenhController : ControllerBase
    {
        // GET: api/<GoiBaoHiemController>
        private readonly UserDbContext userDbContext;
        private readonly TokenService tokenService;

        public BenhController(UserDbContext userDbContext, TokenService tokenService)
        {
            this.userDbContext = userDbContext;
            this.tokenService = tokenService;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var benh = userDbContext.Benh.ToList();
            return Ok(benh);
        }
        [HttpGet]
        [Route("{MaGoiBH}")]
        public IActionResult GetBenhByGoiBH(int MaGoiBH)
        {
            // Lấy danh sách Benh từ bảng ChinhSach
            var maBenhs = userDbContext.ChinhSach
                .Where(c => c.MaGoiBH == MaGoiBH)
                .Select(c => c.MaBenh)
                .ToList();

            if (maBenhs == null || !maBenhs.Any())
            {
                return NotFound();
            }
            // Lấy thông tin Benh từ bảng Benh
            var benhEntities = userDbContext.Benh
                .Where(h => maBenhs.Contains(h.MaBenh))
                .ToList();

            if (benhEntities == null || !benhEntities.Any())
            {
                return NotFound();
            }
            // Chuyển đổi từ List<HoaDonThanhToanDK> sang List<HoaDonThanhToanDKDTO>
            var benhDTOs = benhEntities.Select(h => new BenhDTO
            {
                MaBenh = h.MaBenh,
                TenBenh = h.TenBenh,
                MoTa = h.MoTa
            }).ToList();

            return Ok(benhDTOs);
        }
    }
}
