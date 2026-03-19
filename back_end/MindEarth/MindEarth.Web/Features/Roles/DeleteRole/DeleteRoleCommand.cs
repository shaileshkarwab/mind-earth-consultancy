using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.Roles.DeleteRole
{
    public record DeleteRoleCommand(string roleId):IRequest<Result<bool>>;
}
