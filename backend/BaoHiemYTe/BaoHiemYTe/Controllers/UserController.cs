using BaoHiemYTe.Data;
using BaoHiemYTe.Domain;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserDbContext userDbContext;

        public UserController(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var users = userDbContext.Users.ToList();

                if (users.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ user nào.");
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình lấy dữ liệu: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> post([FromBody] UserDTO userDto)
        {
            if (userDto == null)
            {
                return BadRequest("Dữ liệu không hợp lệ");
            }

            // Kiểm tra xem username đã tồn tại hay chưa
            var existingUser = await userDbContext.Users.FirstOrDefaultAsync(u => u.username == userDto.username);

            if (existingUser != null)
            {
                return BadRequest("Tên người dùng đã tồn tại");
            }

            // Nếu username chưa tồn tại, tạo tài khoản mới
            var newUser = new Users
            {
                username = userDto.username,
                password = userDto.password,
                role = "Khách hàng",
                FirstLogin = true
            };

            userDbContext.Users.Add(newUser);
            await userDbContext.SaveChangesAsync();

            return Ok("Đăng ký người dùng thành công");
        }


        [HttpPut("{username}/changepassword")]
        public IActionResult ChangePassword(string username, [FromBody] ChangePasswordDTO changePasswordDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Check for the presence and validity of the token
                var tokenService = new TokenService();
                var username_ = tokenService.GetUsernameFromToken(HttpContext.Request);
                if (string.IsNullOrEmpty(username_))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }
                var user = userDbContext.Users.FirstOrDefault(u => u.username == username);

                if (user == null)
                {
                    return NotFound("Không tìm thấy username");
                }

                // Kiểm tra mật khẩu hiện tại của người dùng trước khi đổi mật khẩu
                if (user.password != changePasswordDTO.CurrentPassword)
                {
                    return BadRequest("Mật khẩu hiện tại không đúng");
                }

                // Kiểm tra mật khẩu mới và mật khẩu xác nhận
                if (changePasswordDTO.NewPassword != changePasswordDTO.ConfirmPassword)
                {
                    return BadRequest("Mật khẩu mới và xác nhận mật khẩu không khớp");
                }

                // Cập nhật mật khẩu mới
                user.password = changePasswordDTO.NewPassword;
                user.FirstLogin = false; // Đánh dấu rằng người dùng đã thay đổi mật khẩu từ lần đăng nhập đầu tiên

                userDbContext.SaveChanges();

                return Ok("Đổi mật khẩu thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình đổi mật khẩu: {ex.Message}");
            }
        }

    }
}
