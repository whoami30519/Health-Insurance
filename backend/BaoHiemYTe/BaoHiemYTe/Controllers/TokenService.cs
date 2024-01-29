using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BaoHiemYTe.Controllers
{
    public class TokenService
    {
        private readonly string secretKey;

        public TokenService()
        {
            this.secretKey = "your-secret-key-should-be-at-least-128-bits";
        }

        public string GenerateJwtToken(string username, string role)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: new[] { new Claim(ClaimTypes.Name, username),new Claim(ClaimTypes.Role, role) },

                expires: DateTime.UtcNow.AddMonths(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public string GetUsernameFromToken(HttpRequest request)
        {
            var authorizationHeader = request.Headers["Authorization"].FirstOrDefault();
            Console.WriteLine("ab" + authorizationHeader);
            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return null;
            }

            var token = authorizationHeader.Substring("Bearer ".Length);

            // Validate and decode the token
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
            };

            var handler = new JwtSecurityTokenHandler();

            try
            {
                var principal = handler.ValidateToken(token, tokenValidationParameters, out var securityToken);

                // Kiểm tra xem token có được validate thành công hay không
                if (principal != null && principal.Identity != null && principal.Identity.IsAuthenticated)
                {
                    // Lấy username từ thông tin xác thực
                    //return principal.Identity.Name;
                    var usernameClaim = principal.FindFirst(ClaimTypes.Name);
                    // Check if the "role" claim exists
                    if (usernameClaim != null)
                    {
                        // Return the value of the "role" claim
                        return usernameClaim.Value;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }

            return null;
        }

        //
        public string GetRoleFromToken(HttpRequest request)
        {
            var authorizationHeader = request.Headers["Authorization"].FirstOrDefault();

            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return null;
            }

            var token = authorizationHeader.Substring("Bearer ".Length);

            // Validate and decode the token
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
            };

            var handler = new JwtSecurityTokenHandler();

            try
            {
                var principal = handler.ValidateToken(token, tokenValidationParameters, out var securityToken);

                // Kiểm tra xem token có được validate thành công hay không
                if (principal != null && principal.Identity != null && principal.Identity.IsAuthenticated)
                {
                    var roleClaim = principal.FindFirst(ClaimTypes.Role);

                    // Check if the "role" claim exists
                    if (roleClaim != null)
                    {
                        // Return the value of the "role" claim
                        return roleClaim.Value;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }

            return null;
        }
        public ClaimsPrincipal ValidateTokenAndGetClaimsPrincipal(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = new SymmetricSecurityKey(key),
            };

            try
            {
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
                return principal;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return null;
            }
        }
    }
}