using FluentResults;
using MediatR;
using MindEarth.Web.Features.Roles.DTO;

namespace MindEarth.Web.Features.Roles.QueryRoles
{
    public record MenuAndMenuDetailQuery:IRequest<Result<List<DTO_Menu>>>;
}
