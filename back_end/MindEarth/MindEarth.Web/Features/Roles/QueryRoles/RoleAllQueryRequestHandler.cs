using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Features.Roles.DTO;
using static MindEarth.Web.Features.Roles.QueryRoles.RoleQuery;

namespace MindEarth.Web.Features.Roles.QueryRoles
{
    public class RoleAllQueryRequestHandler : IRequestHandler<RoleAllQueryRequest, Result<List<RoleList>>>
    {
        private readonly MindEarthContext context;
        public RoleAllQueryRequestHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<List<RoleList>>> Handle(RoleAllQueryRequest request, CancellationToken cancellationToken)
        {
            var roles = this.context.Roles.AsQueryable();
            var roleResponse = await roles.Select(c => new RoleList { 
                IsActive = c.IsActive,
                RoleName = c.RoleName,
                RowId = c.RowId
            }).ToListAsync();
            return Result.Ok(roleResponse);
        }
    }
}
