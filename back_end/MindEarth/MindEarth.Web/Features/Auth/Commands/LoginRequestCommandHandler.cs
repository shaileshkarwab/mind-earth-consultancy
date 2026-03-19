using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Auth.DTO;
using MindEarth.Web.Features.Services;

namespace MindEarth.Web.Features.Auth.Commands
{
    public class LoginRequestCommandHandler : IRequestHandler<LoginRequestCommand, Result<LoginResponse>>
    {
        private readonly ILogger<LoginRequestCommandHandler> logger;
        private readonly MindEarthContext dbContext;
        private readonly TokenService tokenService;
        public LoginRequestCommandHandler(MindEarthContext dbContext, ILogger<LoginRequestCommandHandler> logger, TokenService tokenService) {
            this.dbContext = dbContext;
            this.logger = logger;
            this.tokenService = tokenService;
        }

        public async Task<Result<LoginResponse>> Handle(LoginRequestCommand request, CancellationToken cancellationToken)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == request.UserName);
            if (user == null) { 
                return Result.Fail(new UnAuthorisedError());
            }

            
            var refreshToken = this.tokenService.RefreshToken();
            //adding the token to token service to manage the refresh token
            MangeRefreshToken(refreshToken, user);


            return Result.Ok(new LoginResponse
            {
                RefreshToken = refreshToken,
                Token = this.tokenService.GetJWTToken(user)
            });
        }

        void MangeRefreshToken(string refreshToken, MindEarth.Database.Entity.User user) {

            //check if there is existing token for the user and revok it
            var hashedRefreshToken = BCrypt.Net.BCrypt.HashPassword(refreshToken);
            var userToken = this.dbContext.UserTokens.SingleOrDefault(ut => ut.UserId == user.Id  && ut.IsRevoked == false);
            if(userToken != null)
            {
                userToken.IsRevoked = true;
                userToken.ReplacedByToken = hashedRefreshToken;
                userToken.RevokedAt = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified);
                this.dbContext.Update(userToken);
            }

            this.dbContext.UserTokens.Add(new UserToken
            {
                CreatedAt = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified),
                RowId = Ulid.NewUlid().ToString(),
                UserId = user.Id,
                HashedRefreshToken = hashedRefreshToken,
                TokenExpiry = DateTime.SpecifyKind(DateTime.UtcNow.AddDays(30), DateTimeKind.Unspecified),
            });
            this.dbContext.SaveChanges();
        }

    }
}
