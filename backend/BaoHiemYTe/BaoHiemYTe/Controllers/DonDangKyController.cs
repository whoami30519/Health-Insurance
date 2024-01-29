using BaoHiemYTe.Data;
using BaoHiemYTe.Domain;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonDangKyController : ControllerBase
    {
        private readonly UserDbContext _dbContext;
        private readonly TokenService tokenService;

        public DonDangKyController(UserDbContext dbContext, TokenService tokenService)
        {
            _dbContext = dbContext;
            this.tokenService = tokenService;
        }

        // GET: api/DonDangKy
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DonDangKyDTO>>> GetAll()
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
                // Không phải nhân viên, lấy tất cả đơn đăng ký liên quan đến khách hàng
                var donDangKysForCustomer = await _dbContext.DonDangKy
                    .Include(d => d.KhachHang)
                    .Include(d => d.GoiBaoHiem)
                    .Include(d => d.NhanVien)
                    .Where(d => d.KhachHang.username == username)
                    .ToListAsync();

                var donDangKyDTOsForCustomer = donDangKysForCustomer.Select(d => new DonDangKyDTO
                {
                    MaDonDK = d.MaDonDK,
                    MaGoiBH = d.MaGoiBH,
                    ThoiGianDK = d.ThoiGianDK,
                    ThoiGianBD = d.ThoiGianBD,
                    ThoiGianHetHan = d.ThoiGianHetHan,
                    TinhTrang = d.TinhTrang,
                    SoKyHanThanhToan = d.SoKyHanThanhToan,
                    TongGia = d.TongGia,
                    MaKH = d.MaKH,
                    MaNV = d.MaNV,
                    KhachHang = d.KhachHang,
                    GoiBaoHiem = d.GoiBaoHiem,
                    NhanVien = d.NhanVien,
                    LiDoTuChoi = d.LiDoTuChoi,
                    ThoiGianDuyet = d.ThoiGianDuyet ?? default(DateTime),
                });
                return Ok(donDangKyDTOsForCustomer);
            }
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Unauthorized: Token is missing or invalid");
            }
            var donDangKys = await _dbContext.DonDangKy
                .Include(d => d.KhachHang)
                .Include(d => d.GoiBaoHiem)
                .Include(d => d.NhanVien)
                .ToListAsync();

            var donDangKyDTOs = donDangKys.Select(d => new DonDangKyDTO
            {
                MaDonDK = d.MaDonDK,
                MaGoiBH = d.MaGoiBH,
                ThoiGianDK = d.ThoiGianDK,
                ThoiGianBD = d.ThoiGianBD,
                ThoiGianHetHan = d.ThoiGianHetHan,
                TinhTrang = d.TinhTrang,
                SoKyHanThanhToan = d.SoKyHanThanhToan,
                TongGia = d.TongGia,
                MaKH = d.MaKH,
                MaNV = d.MaNV,
                KhachHang = d.KhachHang,
                GoiBaoHiem = d.GoiBaoHiem,
                NhanVien = d.NhanVien,
                LiDoTuChoi = d.LiDoTuChoi,
                ThoiGianDuyet = d.ThoiGianDuyet ?? default(DateTime),

            });

            return Ok(donDangKyDTOs);
        }

        // GET: api/DonDangKy/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DonDangKyDTO>> GetDonDangKyById(int id)
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
                var donDangKyKH = await _dbContext.DonDangKy
                   .Include(d => d.KhachHang)
                   .Include(d => d.GoiBaoHiem)
                   .Include(d => d.NhanVien)
                   .FirstOrDefaultAsync(d => d.MaDonDK == id && d.KhachHang.username == username);

                if (donDangKyKH == null)
                {
                    return Unauthorized("Unauthorized: You do not have permission to access this invoice");
                }
                var danhSachBenh = await _dbContext.TinhTrangBenh
     .Where(tb => tb.MaDonDK == id)
     .Include(tb => tb.Benh)  // Include the related Benh entity
     .ToListAsync();

              


                var donDangKyDTO_KH = new DonDangKyDTO
                {
                    MaDonDK = donDangKyKH.MaDonDK,
                    MaGoiBH = donDangKyKH.MaGoiBH,
                    ThoiGianDK = donDangKyKH.ThoiGianDK,
                    ThoiGianBD = donDangKyKH.ThoiGianBD,
                    ThoiGianHetHan = donDangKyKH.ThoiGianHetHan,
                    TinhTrang = donDangKyKH.TinhTrang,
                    SoKyHanThanhToan = donDangKyKH.SoKyHanThanhToan,
                    ThoiGianDuyet = donDangKyKH.ThoiGianDuyet ?? default(DateTime),
                    TongGia = donDangKyKH.TongGia,
                    MaKH = donDangKyKH.MaKH,
                    MaNV = donDangKyKH.MaNV,
                    KhachHang = donDangKyKH.KhachHang,
                    GoiBaoHiem = donDangKyKH.GoiBaoHiem,
                    NhanVien = donDangKyKH.NhanVien
                };
                donDangKyDTO_KH.Benh = danhSachBenh;
                return Ok(donDangKyDTO_KH);
            }
            //Nếu là nhân viên
            var donDangKy = await _dbContext.DonDangKy
                .Include(d => d.KhachHang)
                .Include(d => d.GoiBaoHiem)
                .Include(d => d.NhanVien)
                .FirstOrDefaultAsync(d => d.MaDonDK == id);

            if (donDangKy == null)
            {
                return NotFound();
            }

            var donDangKyDTO = new DonDangKyDTO
            {
                MaDonDK = donDangKy.MaDonDK,
                MaGoiBH = donDangKy.MaGoiBH,
                ThoiGianDK = donDangKy.ThoiGianDK,
                ThoiGianBD = donDangKy.ThoiGianBD,
                ThoiGianHetHan = donDangKy.ThoiGianHetHan,
                TinhTrang = donDangKy.TinhTrang,
                SoKyHanThanhToan = donDangKy.SoKyHanThanhToan,
                ThoiGianDuyet = donDangKy.ThoiGianDuyet ?? default(DateTime),
                TongGia = donDangKy.TongGia,
                MaKH = donDangKy.MaKH,
                MaNV = donDangKy.MaNV,
                KhachHang = donDangKy.KhachHang,
                GoiBaoHiem = donDangKy.GoiBaoHiem,
                NhanVien = donDangKy.NhanVien
            };

            return Ok(donDangKyDTO);
        }

        [HttpPost]
        public async Task<IActionResult> PostDonDangKy([FromBody] DonDangKyDTO donDangKyDTO)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }

                    var tokenService = new TokenService();
                    var username_ = tokenService.GetUsernameFromToken(HttpContext.Request);
                    //var username_ = "quyetvang";
                    if (string.IsNullOrEmpty(username_))
                    {
                        return Unauthorized("Unauthorized: Token is missing or invalid");
                    }

                    var khachHang = _dbContext.KhachHang.FirstOrDefault(kh => kh.username == username_);
                    if (khachHang == null)
                    {
                        return NotFound($"Người dùng với username {username_} không tồn tại");
                    }

                    var donDangKy = new DonDangKy
                    {
                        MaGoiBH = donDangKyDTO.MaGoiBH,
                        ThoiGianDK = donDangKyDTO.ThoiGianDK,
                        ThoiGianBD = donDangKyDTO.ThoiGianBD,
                        ThoiGianHetHan = donDangKyDTO.ThoiGianHetHan,
                        TinhTrang = donDangKyDTO.TinhTrang,
                        SoKyHanThanhToan = donDangKyDTO.SoKyHanThanhToan,
                        TongGia = donDangKyDTO.TongGia,
                        MaKH = khachHang.MaKH,
                        MaNV = null,
                    };

                    _dbContext.DonDangKy.Add(donDangKy);
                    await _dbContext.SaveChangesAsync();

                    // Chèn danh sách id bệnh vào TinhTrangBenh
                    foreach (var benh in donDangKyDTO.Benh)
                    {
                        var tinhTrangBenh = new TinhTrangBenh
                        {
                            MaDonDK = donDangKy.MaDonDK,
                            MaBenh = benh.MaBenh,
                            TinhTrang = benh.TinhTrang // Thay bằng tình trạng thích hợp
                        };

                        _dbContext.TinhTrangBenh.Add(tinhTrangBenh);
                    }



                    await _dbContext.SaveChangesAsync();
                    transaction.Commit();

                    return Ok("Đăng ký gói bảo hiểm thành công");
                }
                catch (DbUpdateException ex)
                {
                    // Xử lý lỗi từ Entity Framework, ví dụ: khóa ngoại không hợp lệ
                    transaction.Rollback();
                    return BadRequest("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin đăng ký.");
                }
                catch (Exception ex)
                {
                    // Xử lý lỗi khác
                    transaction.Rollback();
                    return StatusCode(500, "Đã xảy ra lỗi trong quá trình đăng ký gói bảo hiểm");
                }
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDonDangKyStatus(int id, [FromBody] DonDangKyUpdateDto updateDto)
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
            var donDangKy = await _dbContext.DonDangKy
                .Include(d => d.NhanVien)
                .FirstOrDefaultAsync(d => d.MaDonDK == id);

            if (donDangKy == null)
            {
                return NotFound();
            }


            // Update DonDangKy properties
            donDangKy.TinhTrang = updateDto.TinhTrang;
            donDangKy.MaNV = updateDto.MaNV;
            donDangKy.LiDoTuChoi = updateDto.LiDoTuChoi;
            donDangKy.ThoiGianDuyet = updateDto.ThoiGianDuyet;

            // Update NhanVien properties if NhanVien is not null
            if (donDangKy.NhanVien != null)
            {
                donDangKy.NhanVien.DiaChi = updateDto.DiaChi;
                donDangKy.NhanVien.Email = updateDto.Email;
                donDangKy.NhanVien.HoTen = updateDto.HoTen;
                donDangKy.NhanVien.SDT = updateDto.SDT;
                donDangKy.NhanVien.MaNV = updateDto.MaNV;
                // Add more properties as needed for updating NhanVien
            }

            // Use a transaction if needed
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    await _dbContext.SaveChangesAsync();
                    if (updateDto.TinhTrang == "Chờ thanh toán")
                    {
                        var invoices = updateDto.DS_HoaDonThanhToanDK.Select(b => new HoaDonThanhToanDK
                        {
                            SoTien = b.SoTien,
                            ThoiGianHetHan = b.ThoiGianHetHan,
                            HanKy = b.HanKy,
                            TinhTrangThanhToan = b.TinhTrangThanhToan,
                            TienPhat = 0,
                            LiDoPhat = null,
                            TongTien = b.SoTien,
                            ThoiGianThanhToan = null,
                            MaDonDK = id, // Link the invoice to the DonDangKy
                        }).ToList();

                        _dbContext.HoaDonThanhToanDK.AddRange(invoices);
                        await _dbContext.SaveChangesAsync();
                    }
                    transaction.Commit();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DonDangKyExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        // Log or handle the exception as needed
                        throw;
                    }
                }
                catch (Exception)
                {
                    // Log or handle the exception as needed
                    transaction.Rollback();
                    throw;
                }
            }

            return NoContent();
        }


        private bool DonDangKyExists(int id)
        {
            return _dbContext.DonDangKy.Any(e => e.MaDonDK == id);
        }
    }
}
