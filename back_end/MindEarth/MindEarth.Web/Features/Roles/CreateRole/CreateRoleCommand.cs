using FluentResults;
using MediatR;
using MindEarth.Web.Features.Roles.DTO;

namespace MindEarth.Web.Features.Roles.CreateRole
{
    public record CreateRoleCommand(DTO_Role Role):IRequest<Result<string>>;
    
}
