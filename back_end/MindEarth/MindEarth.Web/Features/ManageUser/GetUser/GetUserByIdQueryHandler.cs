using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Features.User.DTO;

namespace MindEarth.Web.Features.ManageUser.GetUser
{
    public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, Result<DTO_ManageUser>>
    {
        private readonly MindEarthContext context;
        public GetUserByIdQueryHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<DTO_ManageUser>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await this.context.Users.Include(c=>c.Role).SingleOrDefaultAsync(c => c.RowId == request.userId);
            if(user == null)
            {
                return Result.Fail(new Errors.NoDataFound());
            }
            return new DTO_ManageUser
            {
                Email = user.Email,
                FirstName = user.FirstName,
                ImagePath = user.ImagePath,
                IsActive = user.IsActive,
                LastName = user.LastName,
                RoleId = user.Role.RowId,
                RowId = user.RowId
            };
        }
    }
}
