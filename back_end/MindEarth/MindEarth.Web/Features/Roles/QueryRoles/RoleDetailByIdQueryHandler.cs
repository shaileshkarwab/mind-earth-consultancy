using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Roles.DTO;

namespace MindEarth.Web.Features.Roles.QueryRoles
{
    public class RoleDetailByIdQueryHandler : IRequestHandler<RoleDetailByIdQuery, Result<DTO_Role>>
    {
        private readonly MindEarthContext context;
        public RoleDetailByIdQueryHandler(MindEarthContext context) {
            this.context = context;
        }
        public async Task<Result<DTO_Role>> Handle(RoleDetailByIdQuery request, CancellationToken cancellationToken)
        {
            var role = await this.context.Roles.Include(c=>c.RolePermissionDetails)
                .Include(c=>c.RolePermissionDetails).ThenInclude(c=>c.MenuDetail)
                .SingleOrDefaultAsync(c=>c.RowId == request.roleRowId);
            if (role == null) { 
                return Result.Fail(new NoDataFound());
            }

            return new DTO_Role { 
                IsActive = role.IsActive,
                RowId = request.roleRowId,
                Text = role.RoleName,
                Roles = role.RolePermissionDetails.Select(c=>new DTO_RoleDetail { 
                    AddRight = c.AddRight,
                    DeleteRight = c.DeleteRight,
                    RowId = c.RowId,
                    MenuDetailId = c.MenuDetail.RowId,
                    ModifyRight = c.ModifyRight,
                    ViewRight = c.ViewRight
                }).ToList()
            };    
        }
    }
}
