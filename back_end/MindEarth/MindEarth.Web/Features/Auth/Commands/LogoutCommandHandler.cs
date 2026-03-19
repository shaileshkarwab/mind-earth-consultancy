using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Auth.DTO;
using System.Security.Claims;

namespace MindEarth.Web.Features.Auth.Commands
{
    public class LogoutCommandHandler : IRequestHandler<LogoutCommand, Result<bool>>
    {
        private readonly MindEarthContext context;
        private readonly IHttpContextAccessor httpContextAccessor;
        public LogoutCommandHandler(MindEarthContext context, IHttpContextAccessor httpContextAccessor)
        {
            this.context = context;
            this.httpContextAccessor = httpContextAccessor; 
        }

        public async Task<Result<bool>> Handle(LogoutCommand request, CancellationToken cancellationToken)
        {
            var userName = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userToken = await (from u in context.Users
                                   join ut in context.UserTokens on u.Id equals ut.UserId
                                   where u.Email == userName
                                   && ut.IsRevoked == false
                                   select ut
                                   ).SingleOrDefaultAsync(cancellationToken);
                
            if(userToken == null)
            {
                return Result.Fail(new BadRequestError());
            }

            userToken.IsRevoked = true;
            userToken.RevokedAt = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified);
            this.context.Update(userToken);
            this.context.SaveChanges();
            return Result.Ok(true);
        }
    }
}
