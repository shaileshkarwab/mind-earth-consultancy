using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Services;
using static MindEarth.Web.Features.User.CreateUser.CreateUserCommand;

namespace MindEarth.Web.Features.User.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommandRequest, Result<string>>
    {
        private readonly MindEarthContext context;
        private readonly IUserCommonService userCommonService;
        public CreateUserCommandHandler(MindEarthContext context, IUserCommonService userCommonService)
        {
            this.context = context;
            this.userCommonService = userCommonService;
        }
        public async Task<Result<string>> Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
        {
            var _salt = BCrypt.Net.BCrypt.GenerateSalt();
            var role = await this.context.Roles.SingleOrDefaultAsync(r => r.RowId == request.User.RoleId);
            if (role == null)
            {
                return Result.Fail(new NoDataFound());
            }
            var rowId = Ulid.NewUlid().ToString();
            var user = new MindEarth.Database.Entity.User
            {
                RowId = rowId,
                FirstName = request.User.FirstName,
                LastName = request.User.LastName,
                Email = request.User.Email,
                Salt = _salt,
                Password = BCrypt.Net.BCrypt.HashPassword($"{request.User.Password}{_salt}"),
                IsActive = true,
                CreatedAt = userCommonService.TrasnDateTime,
                CreatedBy = userCommonService.UserId,
                UpdatedAt = userCommonService.TrasnDateTime,
                UpdatedBy = userCommonService.UserId,
                RoleId = role.Id,
                ImagePath = request.User.ImagePath
            };
            this.context.Users.Add(user);
            await this.context.SaveChangesAsync(cancellationToken);
            return Result.Ok(rowId);
        }
    }
}
