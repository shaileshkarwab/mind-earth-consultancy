using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;

namespace MindEarth.Web.Features.Roles.DeleteRole
{
    public class DeleteRoleCommandHandler : IRequestHandler<DeleteRoleCommand, Result<bool>>
    {
        private readonly MindEarthContext context;
        public DeleteRoleCommandHandler(MindEarthContext context) { 
            this.context = context;
        }
        public async Task<Result<bool>> Handle(DeleteRoleCommand request, CancellationToken cancellationToken)
        {
            var role = await context.Roles.Include(c=>c.RolePermissionDetails).SingleOrDefaultAsync(r => r.RowId == request.roleId);
            if (role == null) {
                return Result.Fail(new NoDataFound());
            }

            //delete the permessiondetails and then role
            this.context.RolePermissionDetails.RemoveRange(role.RolePermissionDetails);
            this.context.Roles.Remove(role);
            await this.context.SaveChangesAsync();
            return true;
        }
    }
}
