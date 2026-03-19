using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MindEarth.Database.Entity;
using MindEarth.Web.Features.Auth.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace MindEarth.Web.Features.Services
{
    public class TokenService
    {
        private readonly JWTModel model;
        private const string AllowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
        public TokenService(IOptions<JWTModel> options) {
            this.model = options.Value;
        }

        public string GetJWTToken(MindEarth.Database.Entity.User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.model.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Email)
            };
            var token = new JwtSecurityToken(this.model.Issuer,
                this.model.Audience,
                claims,
                expires: DateTime.Now.AddMinutes(this.model.ExpireMinutes),
                signingCredentials: credentials
                );


            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string RefreshToken()
        {
            int length = 128;
            var result = new StringBuilder(length);
            var random = RandomNumberGenerator.Create(); // Use the recommended static methods in newer .NET

            // Create a buffer to hold a random number for each character
            byte[] randomBytes = new byte[1];

            for (int i = 0; i < length; i++)
            {
                // Use rejection sampling to ensure uniform distribution across the character set
                int randomIndex;
                do
                {
                    random.GetBytes(randomBytes);
                    // Convert the byte to an integer (0-255)
                    randomIndex = randomBytes[0];
                } while (randomIndex >= AllowedChars.Length * (256 / AllowedChars.Length)); // Rejection check

                randomIndex %= AllowedChars.Length;
                result.Append(AllowedChars[randomIndex]);
            }

            return result.ToString();
        }
    }
}
