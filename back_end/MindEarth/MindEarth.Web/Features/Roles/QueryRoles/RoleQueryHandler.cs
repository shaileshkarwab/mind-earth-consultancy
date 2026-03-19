using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Roles.DTO;
using static MindEarth.Web.Features.Roles.QueryRoles.RoleQuery;

namespace MindEarth.Web.Features.Roles.QueryRoles
{
    public class RoleQueryHandler : IRequestHandler<RoleQueryRequest, Result<List<RoleQueryResponse>>>
    {
        private readonly MindEarthContext context;
        public RoleQueryHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<List<RoleQueryResponse>>> Handle(RoleQueryRequest request, CancellationToken cancellationToken)
        {

            var roleQuery = this.context.Roles.AsQueryable();
            if(request.active)
            {
                roleQuery = roleQuery.Where(c => c.IsActive == true);
            }

            var roles = await roleQuery.Select(c => new RoleQueryResponse
            {
                RowId = c.RowId,
                Value = c.RoleName.Trim()
            }).OrderBy(c=>c.Value).ToListAsync();



            if (roles == null || roles.Count == 0)
            {
                return Result.Fail(new NoDataFound());
            }
            return Result.Ok(roles);
        }
    }
}
