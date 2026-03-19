using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;

namespace MindEarth.Web.Features.ManageUser.DeleteUser
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Result<bool>>
    {
        private readonly MindEarthContext context;
        public DeleteUserCommandHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<bool>> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var user = await this.context.Users.SingleOrDefaultAsync(c => c.RowId == request.userId,cancellationToken);
            if (user == null) {
                return Result.Fail(new NoDataFound());
            }
            this.context.Users.Remove(user);
            await this.context.SaveChangesAsync();
            return true;
        }
    }
}
