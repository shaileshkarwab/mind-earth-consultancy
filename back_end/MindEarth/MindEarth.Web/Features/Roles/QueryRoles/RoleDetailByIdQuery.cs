using FluentResults;
using MediatR;
using MindEarth.Web.Features.Roles.DTO;

namespace MindEarth.Web.Features.Roles.QueryRoles
{
    public record RoleDetailByIdQuery(string roleRowId) : IRequest<Result<DTO_Role>>;
    
}
