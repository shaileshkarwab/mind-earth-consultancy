using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Features.ManageUser.DTO;

namespace MindEarth.Web.Features.ManageUser.GetUser
{
    public class GetAllUserQueryHandler : IRequestHandler<GetAllUserQuery, Result<List<DTO.DTO_UserList>>>
    {
        private readonly MindEarthContext _context;
        public GetAllUserQueryHandler(MindEarthContext _context)
        {
            this._context = _context;
        }
        public async Task<Result<List<DTO_UserList>>> Handle(GetAllUserQuery request, CancellationToken cancellationToken)
        {
            var userQuery = this._context.Users.AsQueryable();
            if(request.active.HasValue)
            {
                userQuery = userQuery.Where(c => c.IsActive == true);
            }
            var users = await userQuery.Select(c=>new DTO_UserList {
                Email = c.Email,
                FirstName   = c.FirstName,
                ImagePath = c.ImagePath,
                IsActive = c.IsActive,
                LastName = c.LastName,
                RoleName = c.Role.RoleName,
                RowId = c.RowId
            }).OrderBy(c => c.FirstName).ThenBy(c => c.LastName).ToListAsync();   
            if(users == null || users.Count == 0)
            {
                return Result.Fail(new Errors.NoDataFound());
            }
            return Result.Ok(users);
        }
    }
}
