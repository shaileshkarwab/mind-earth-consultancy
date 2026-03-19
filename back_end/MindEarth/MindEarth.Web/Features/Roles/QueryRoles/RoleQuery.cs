using FluentResults;
using MediatR;
using MindEarth.Web.Common.Models;
using MindEarth.Web.Features.Roles.DTO;

namespace MindEarth.Web.Features.Roles.QueryRoles
{
    public class RoleQuery
    {
        public record RoleQueryRequest(bool active = false) : IRequest<Result<List<RoleQueryResponse>>>;

        public record RoleAllQueryRequest(Filter Filter) : IRequest<Result<List<RoleList>>>;
    }
}
