using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Services;

namespace MindEarth.Web.Features.Roles.CreateRole
{
    public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, Result<string>>
    {
        private readonly MindEarthContext context;
        private readonly IUserCommonService userCommonService;
        public CreateRoleCommandHandler(MindEarthContext context, IUserCommonService userCommonService)
        {
            this.context = context;
            this.userCommonService = userCommonService;
        }
        public async Task<Result<string>> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
        {
            var isRolePresent = await this.context.Roles.AnyAsync(c => c.RoleName == request.Role.Text);
            if(isRolePresent)
            {
                return Result.Fail(new BadRequestError());
            }

            var role = new Role
            {
                RowId = Ulid.NewUlid().ToString(),
                RoleName = request.Role.Text,
                IsActive = request.Role.IsActive,
                CreatedAt = this.userCommonService.TrasnDateTime,
                CreatedBy = this.userCommonService.UserId,
                UpdatedAt = this.userCommonService.TrasnDateTime,
                UpdatedBy = this.userCommonService.UserId
            };

            foreach (var m in request.Role.Roles)
            {
                var menuID = await this.context.MenuDetails.Where(x => x.RowId == m.MenuDetailId).Select(x => x.Id).FirstOrDefaultAsync();
                if (menuID == 0)
                {
                    return Result.Fail(new NoDataFound());
                }
                role.RolePermissionDetails.Add(new RolePermissionDetail
                {
                    RowId = Ulid.NewUlid().ToString(),
                    MenuDetailId = menuID,
                    CreatedAt = this.userCommonService.TrasnDateTime,
                    CreatedBy = this.userCommonService.UserId,
                    UpdatedAt = this.userCommonService.TrasnDateTime,
                    UpdatedBy = this.userCommonService.UserId,
                    AddRight = m.AddRight,
                    DeleteRight = m.DeleteRight,
                    ViewRight = m.ViewRight,
                    ModifyRight = m.ModifyRight,
                });
            }
            this.context.Roles.Add(role);
            await this.context.SaveChangesAsync();
            return Result.Ok(role.RowId);
        }
    }
}
