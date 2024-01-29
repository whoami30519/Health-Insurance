using BaoHiemYTe.Data;
using BaoHiemYTe.Domain;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class HoaDonThanhToanDKController : ControllerBase
    {
        // GET: api/<GoiBaoHiemController>

        private readonly UserDbContext userDbContext;
        private readonly TokenService tokenService;
        private readonly ILogger<HoaDonThanhToanDKController> _logger;

        public HoaDonThanhToanDKController(UserDbContext userDbContext, TokenService tokenService, ILogger<HoaDonThanhToanDKController> logger)
        {
            this.userDbContext = userDbContext;
            this.tokenService = tokenService;
            this._logger = logger;
        }
        public class CombinedHoaDon
        {
            public int MaHD { get; set; }
            public int SoTien { get; set; }
            public DateTime? ThoiGianThanhToan { get; set; }
            public int MaDon { get; set; }
            public string LoaiHoaDon { get; set; }
        }
        [HttpGet("KH_GetLichSuGiaoDich")]
        public IActionResult KH_GetLichSuGiaoDich()
        {
            try
            {
                // Sử dụng TokenService để lấy username từ token
                var tokenService = new TokenService();
                var username = tokenService.GetUsernameFromToken(HttpContext.Request);

                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }

                // Lấy thông tin MaKH từ bảng KhachHang
                var maKH = userDbContext.KhachHang
                    .Where(kh => kh.Users.username == username)
                    .Select(kh => kh.MaKH)
                    .FirstOrDefault();

                if (maKH == 0)
                {
                    return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
                }

                // Lấy danh sách MaDonDK từ bảng DonDangKy
                var maDonDKs = userDbContext.DonDangKy
                    .Where(d => d.MaKH == maKH)
                    .Select(d => d.MaDonDK)
                    .ToList();

                if (maDonDKs == null || !maDonDKs.Any())
                {
                    return NotFound($"Người dùng {username} không có Đơn Đăng Ký");
                }

                // Lấy thông tin Hóa Đơn Thanh Toán Đăng Ký từ bảng HoaDonThanhToanDK
                var hoaDonThanhToanEntities = userDbContext.HoaDonThanhToanDK
                    .Where(h => maDonDKs.Contains(h.MaDonDK) && h.TinhTrangThanhToan == "Đã thanh toán")
                    .Select(h => new CombinedHoaDon
                    {
                        MaHD = h.MaHD,
                        SoTien = h.SoTien,
                        ThoiGianThanhToan = h.ThoiGianThanhToan,
                        MaDon = h.MaDonDK,
                        LoaiHoaDon = "Thanh toán"
                    })
                    .ToList();

                var maDonYCs = userDbContext.YeuCauHoanTra
                    .Where(d => d.MaKH == maKH)
                    .Select(d => d.MaYC)
                    .ToList();
                // Lấy thông tin Hóa Đơn Hoàn Trả từ bảng HoaDonHoanTra
                var hoaDonHoanTraEntities = userDbContext.HoaDonHoanTra
                    .Where(h => maDonYCs.Contains(h.MaYC))
                    .Select(h => new CombinedHoaDon
                    {
                        MaHD = h.MaHDHoanTra,
                        SoTien = h.SoTien,
                        ThoiGianThanhToan = h.ThoiGianTao,
                        MaDon = h.MaYC,
                        LoaiHoaDon = "Hoàn trả"
                    })
                    .ToList();

                // Kết hợp cả hai danh sách hóa đơn
                var combinedHoaDons = hoaDonThanhToanEntities
                    .Union(hoaDonHoanTraEntities)
                    .ToList();

                if (combinedHoaDons == null || !combinedHoaDons.Any())
                {
                    return NotFound($"Người dùng {username} không có Hóa Đơn Thanh Toán Đăng Ký");
                }

                return Ok(combinedHoaDons);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }

        [HttpGet("GetHoaDonThanhToanByUserName/{username}")]
        public IActionResult GetHoaDonThanhToanByUserName(string username)
        {
            try
            {
                // Lấy thông tin MaKH từ bảng KhachHang
                var maKH = userDbContext.KhachHang
                    .Where(u => u.username == username)
                    .Select(u => u.MaKH)
                    .FirstOrDefault();

                if (maKH == 0)
                {
                    return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
                }

                // Lấy danh sách MaDonDK từ bảng DonDangKy
                var maDonDKs = userDbContext.DonDangKy
                    .Where(d => d.MaKH == maKH)
                    .Select(d => d.MaDonDK)
                    .ToList();

                if (maDonDKs == null || !maDonDKs.Any())
                {
                    return NotFound($"Người dùng {username} không có Đơn Đăng Ký");
                }

                // Lấy thông tin Hóa Đơn từ bảng HoaDonThanhToanDK
                var hoaDonThanhToanEntities = userDbContext.HoaDonThanhToanDK
                    .Where(h => maDonDKs.Contains(h.MaDonDK))
                    .ToList();

                if (hoaDonThanhToanEntities == null || !hoaDonThanhToanEntities.Any())
                {
                    return NotFound($"Người dùng {username} không có Hóa Đơn Thanh Toán Đăng Ký");
                }

                // Chuyển đổi từ List<HoaDonThanhToanDK> sang List<HoaDonThanhToanDKDTO>
                var hoaDonThanhToanDTOs = hoaDonThanhToanEntities.Select(h => new HoaDonThanhToanDKDTO
                {
                    MaHD = h.MaHD,
                    SoTien = h.SoTien,
                    ThoiGianHetHan = h.ThoiGianHetHan,
                    HanKy = h.HanKy,
                    TinhTrangThanhToan = h.TinhTrangThanhToan,
                    ThoiGianThanhToan = h.ThoiGianThanhToan,
                    MaDonDK = h.MaDonDK
                }).ToList();

                return Ok(hoaDonThanhToanDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }
        [HttpGet("GetHoaDonThanhToanByTinhTrang/{tinhTrang}")]
        public IActionResult GetHoaDonThanhToanByTinhTrang(string tinhTrang)
        {
            try
            {
                var tokenService = new TokenService();
                // Sử dụng TokenService để lấy username từ token
                var username = tokenService.GetUsernameFromToken(HttpContext.Request);

                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }
                //var username = "khachhang";
                // Lấy thông tin MaKH từ bảng KhachHang
                var maKH = userDbContext.KhachHang
                    .Where(u => u.username == username)
                    .Select(u => u.MaKH)
                    .FirstOrDefault();

                if (maKH == 0)
                {
                    return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
                }

                // Lấy danh sách MaDonDK từ bảng DonDangKy
                var maDonDKs = userDbContext.DonDangKy
                    .Where(d => d.MaKH == maKH)
                    .Select(d => d.MaDonDK)
                    .ToList();

                if (maDonDKs == null || !maDonDKs.Any())
                {
                    return NotFound($"Người dùng {username} không có Đơn Đăng Ký");
                }

                // Lấy thông tin Hóa Đơn từ bảng HoaDonThanhToanDK với điều kiện TinhTrangThanhToan
                var hoaDonThanhToanEntities = userDbContext.HoaDonThanhToanDK
                    .Where(h => maDonDKs.Contains(h.MaDonDK) && h.TinhTrangThanhToan == tinhTrang)
                    .ToList();

                if (hoaDonThanhToanEntities == null || !hoaDonThanhToanEntities.Any())
                {
                    return NotFound($"Người dùng {username} không có hóa đơn {tinhTrang}!");
                }

                // Chuyển đổi từ List<HoaDonThanhToanDK> sang List<HoaDonThanhToanDKDTO>
                var hoaDonThanhToanDTOs = hoaDonThanhToanEntities.Select(h => new HoaDonThanhToanDKDTO
                {
                    MaHD = h.MaHD,
                    SoTien = h.SoTien,
                    ThoiGianHetHan = h.ThoiGianHetHan,
                    HanKy = h.HanKy,
                    TinhTrangThanhToan = h.TinhTrangThanhToan,
                    TienPhat = h.TienPhat,
                    LiDoPhat = h.LiDoPhat,
                    TongTien = h.TongTien,
                    ThoiGianThanhToan = h.ThoiGianThanhToan,
                    MaDonDK = h.MaDonDK,
                    // Thêm tên Gói Bảo Hiểm
                    TenGoiBH = userDbContext.GoiBaoHiem
                        .Where(g => g.MaGoiBH == userDbContext.DonDangKy
                                                        .Where(d => d.MaDonDK == h.MaDonDK)
                                                        .Select(d => d.MaGoiBH)
                                                        .FirstOrDefault())
                        .Select(g => g.TenGoiBH)
                        .FirstOrDefault()
                }).ToList();

                return Ok(hoaDonThanhToanDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }
        [HttpGet("GetHoaDonDetails/{maHD}")]
        public IActionResult GetHoaDonDetails(int maHD)
        {
            try
            {
                var hoaDonDetailsDTO = userDbContext.HoaDonThanhToanDK
                    .Where(h => h.MaHD == maHD)
                    .Select(h => new HoaDonTT_DonDangKy_GoiBaoHiemDTO
                    {
                        // Thông tin Gói Bảo Hiểm
                        TenGoiBH = h.DonDangKy.GoiBaoHiem.TenGoiBH,
                        MotaGoiBH = h.DonDangKy.GoiBaoHiem.MotaGoiBH,
                        Gia = h.DonDangKy.GoiBaoHiem.Gia,
                        TiLeHoanTien = h.DonDangKy.GoiBaoHiem.TiLeHoanTien,
                        ThoiHanBaoVe = h.DonDangKy.GoiBaoHiem.ThoiHanBaoVe,

                        // Thông tin Đơn Đăng Ký
                        ThoiGianDK = h.DonDangKy.ThoiGianDK,
                        ThoiGianBD = h.DonDangKy.ThoiGianBD,
                        ThoiGianHetHan = h.DonDangKy.ThoiGianHetHan,
                        TinhTrang = h.DonDangKy.TinhTrang,
                        SoKyHanThanhToan = h.DonDangKy.SoKyHanThanhToan,
                        TongGia = h.DonDangKy.TongGia,
                        // Thông tin Hóa Đơn Thanh Toán
                        MaHD = h.MaHD,
                        SoTien = h.SoTien,
                        TienPhat = h.TienPhat,
                        LiDoPhat = h.LiDoPhat,
                        TongTien = h.TongTien,
                        HanKy = h.HanKy,
                        TinhTrangThanhToan = h.TinhTrangThanhToan,
                        ThoiGianThanhToan = h.ThoiGianThanhToan,
                        MaDonDK = h.MaDonDK,
                        ThoiGianHetHanThanhToan = h.ThoiGianHetHan,
                    })
                    .FirstOrDefault();

                if (hoaDonDetailsDTO == null)
                {
                    return NotFound($"Không tìm thấy Hóa Đơn Thanh Toán có mã {maHD}");
                }

                return Ok(hoaDonDetailsDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }
        //Truyền vào maHD Từ token lấy username và từ user name lấy về SoDu trong table KhachHang,
        //nếu SoDu lớn hơn hoặc bằng TongTien trong HoaDonThanhToanDK thì 
        //Update tình trạng và thời gian thanh toán của hóa đơn khi bấm nút ThanhToan, nếu TinhTrang trong đơn đăng ký là "Chờ thanh toán" thì 
        //cập nhập thành Đã kích hoạt, Sau đó update lại SoDu trong KhachHang =SoDu-TongTien
        //nếu SoDu<TongTien thì báo SoDu k đủ
        [HttpPost("updateKhiThanhToan/{maHD}")]
        public async Task<IActionResult> UpdateKhiThanhToan(int maHD)
        {
            try
            {
                // Lấy thông tin từ token để lấy username
                var tokenService = new TokenService();
                var username = tokenService.GetUsernameFromToken(HttpContext.Request);
                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }
                //var username = "khachhang";
                // Lấy thông tin MaKH từ bảng KhachHang
                var maKH = userDbContext.KhachHang
                    .Where(u => u.username == username)
                    .Select(u => u.MaKH)
                    .FirstOrDefault();

                if (maKH == 0)
                {
                    return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
                }

                // Lấy thông tin số dư từ bảng KhachHang
                var soDu = userDbContext.KhachHang
                    .Where(kh => kh.MaKH == maKH)
                    .Select(kh => kh.SoDu)
                    .FirstOrDefault();

                // Lấy hóa đơn từ database
                var hoaDon = userDbContext.HoaDonThanhToanDK
                    .FirstOrDefault(hd => hd.MaHD == maHD);

                if (hoaDon == null)
                {
                    return NotFound($"Không tìm thấy hóa đơn");
                }

                // Kiểm tra nếu số dư không đủ
                if (soDu < hoaDon.TongTien)
                {
                    return BadRequest("Số dư không đủ để thanh toán hóa đơn");
                }

                // Cập nhật tình trạng hóa đơn
                hoaDon.TinhTrangThanhToan = "Đã thanh toán";
                hoaDon.ThoiGianThanhToan = DateTime.Now;

                // Lấy đơn đăng ký từ database
                var donDangKy = userDbContext.DonDangKy
                    .FirstOrDefault(d => d.MaDonDK == hoaDon.MaDonDK);

                if (donDangKy == null)
                {
                    return NotFound($"Không tìm thấy đơn đăng ký với mã {hoaDon.MaDonDK}");
                }

                // Cập nhật tình trạng đơn đăng ký
                donDangKy.TinhTrang = "Đã kích hoạt";

                // Cập nhật số dư trong bảng KhachHang
                var khachHang = userDbContext.KhachHang
                    .FirstOrDefault(kh => kh.MaKH == maKH);
                khachHang.SoDu -= hoaDon.TongTien;

                // Lưu thay đổi vào database
                await userDbContext.SaveChangesAsync();

                return Ok("Thanh toán thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }



        //API xử lý vấn đề khách hàng thanh toán trễ hạn, nếu hóa đơn thanh toán trễ hạn thì sẽ bị phạt 2% soTien.
        [HttpPost("capNhatHoaDon")]
        public async Task<IActionResult> CapNhatHoaDon()
        {
            try
            {
                var username = "khachhang";

                var maKH = userDbContext.KhachHang
                    .Where(u => u.username == username)
                    .Select(u => u.MaKH)
                    .FirstOrDefault();

                if (maKH == 0)
                {
                    return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
                }

                using (var transaction = await userDbContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        var donDangKys = userDbContext.DonDangKy
                            .Where(d => d.MaKH == maKH)
                            .ToList();

                        foreach (var donDangKy in donDangKys)
                        {
                            var hoaDons = userDbContext.HoaDonThanhToanDK
                                .Where(hd => hd.MaDonDK == donDangKy.MaDonDK && hd.ThoiGianHetHan <= DateTime.Now && hd.TinhTrangThanhToan == "Chưa thanh toán")
                                .ToList();

                            foreach (var hoaDon in hoaDons)
                            {
                                var tienPhat = (int)(0.02 * hoaDon.SoTien);
                                hoaDon.TienPhat = tienPhat;
                                hoaDon.LiDoPhat = "Thanh toán trễ hạn";
                                hoaDon.TongTien = hoaDon.SoTien + tienPhat;

                                userDbContext.Update(hoaDon);
                            }
                        }

                        await userDbContext.SaveChangesAsync();
                        transaction.Commit();

                        return Ok("Cập nhật hóa đơn thành công");
                    }
                    catch (DbUpdateException ex)
                    {
                        transaction.Rollback();
                        var innerException = ex.InnerException;
                        while (innerException != null)
                        {
                            Console.WriteLine(innerException.Message);
                            innerException = innerException.InnerException;
                        }
                        _logger.LogError(ex, "Lỗi khi cập nhật hóa đơn");
                        return StatusCode(500, "Lỗi khi lưu thay đổi vào cơ sở dữ liệu.");
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        _logger.LogError(ex, "Lỗi khi cập nhật hóa đơn");
                        return StatusCode(500, $"Lỗi: {ex.Message}");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Lỗi khi xử lý API: {ex.Message}");
                return StatusCode(500, $"Lỗi khi xử lý API: {ex.Message}");
            }
        }


        [HttpGet("GetTongHopHoaDon")]
        public IActionResult GetTongHopHoaDon()
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

                if (!isNhanVien)
                {
                    return Forbid("Forbidden: Access denied. Only employees are allowed.");
                }

                var tongHopHoaDonDTOs = new List<TongHopHoaDonDTO>();

                // Lấy các hóa đơn từ bảng HoaDonThanhToanDK
                var hoaDonThanhToanEntities = userDbContext.HoaDonThanhToanDK
                    .Where(h => h.TinhTrangThanhToan == "Đã thanh toán")
                    .Select(h => new TongHopHoaDonDTO
                    {
                        MaHD = h.MaHD,
                        SoTien = h.TongTien,
                        ThoiGianGiaoDich = h.ThoiGianThanhToan,
                        LoaiHoaDon = "Đơn đăng ký"
                    })
                    .ToList();

                // Lấy các hóa đơn từ bảng HoaDonHoanTra
                var hoaDonHoanTraEntities = userDbContext.HoaDonHoanTra
                    .Select(h => new TongHopHoaDonDTO
                    {
                        MaHD = h.MaHDHoanTra,
                        SoTien = h.SoTien,
                        ThoiGianGiaoDich = h.ThoiGianTao,
                        LoaiHoaDon = "Hoàn trả"
                    })
                    .ToList();

                // Gộp danh sách hóa đơn từ cả hai bảng
                tongHopHoaDonDTOs.AddRange(hoaDonThanhToanEntities);
                tongHopHoaDonDTOs.AddRange(hoaDonHoanTraEntities);

                // Sắp xếp danh sách theo thời gian giao dịch giảm dần
                tongHopHoaDonDTOs = tongHopHoaDonDTOs.OrderByDescending(h => h.ThoiGianGiaoDich).ToList();

                // Thêm thuộc tính STT vào danh sách
                for (int i = 0; i < tongHopHoaDonDTOs.Count; i++)
                {
                    tongHopHoaDonDTOs[i].STT = i + 1;
                }

                return Ok(tongHopHoaDonDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }

        [HttpGet("LichSuThanhToan/{maKH}")]
        public IActionResult LichSuDaThanhToan(int maKH)
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
                    // Lấy danh sách MaDonDK từ bảng DonDangKy
                    var maDonDKs = userDbContext.DonDangKy
                        .Where(d => d.MaKH == maKH)
                        .Select(d => d.MaDonDK)
                        .ToList();

                    if (maDonDKs == null || !maDonDKs.Any())
                    {
                        return NotFound($"Người dùng {maKH} không có Đơn Đăng Ký");
                    }

                    // Lấy thông tin Hóa Đơn từ bảng HoaDonThanhToanDK
                    var hoaDonThanhToanEntities = userDbContext.HoaDonThanhToanDK
                        .Where(h => maDonDKs.Contains(h.MaDonDK))
                        .ToList();

                    if (hoaDonThanhToanEntities == null || !hoaDonThanhToanEntities.Any())
                    {
                        return NotFound($"Người dùng {maKH} không có Hóa Đơn Thanh Toán Đăng Ký");
                    }

                    // Chuyển đổi từ List<HoaDonThanhToanDK> sang List<HoaDonThanhToanDKDTO>
                    var hoaDonThanhToanDTOs = hoaDonThanhToanEntities.Select(h => new HoaDonThanhToanDKDTO
                    {
                        MaHD = h.MaHD,
                        SoTien = h.SoTien,
                        ThoiGianHetHan = h.ThoiGianHetHan,
                        HanKy = h.HanKy,
                        TinhTrangThanhToan = h.TinhTrangThanhToan,
                        ThoiGianThanhToan = h.ThoiGianThanhToan,
                        MaDonDK = h.MaDonDK,
                        TongTien = h.TongTien,
                        MaKH = userDbContext.DonDangKy
                                .Where(g => g.MaDonDK == h.MaDonDK)
                                .Select(g => g.MaKH)
                                .FirstOrDefault(),
                    }).ToList();

                    return Ok(hoaDonThanhToanDTOs);
                }
                else
                {
                    return BadRequest("Không có quyền truy cập danh sách khách hàng");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }


    }
}
