using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.ManageUser.DeleteUser
{
    public record DeleteUserCommand(string userId):IRequest<Result<bool>>;

}
