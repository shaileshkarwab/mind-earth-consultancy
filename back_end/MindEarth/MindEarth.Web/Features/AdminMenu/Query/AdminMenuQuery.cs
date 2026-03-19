using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.AdminMenu.Query
{
    public record AdminMenuQuery:IRequest<Result<List<DTO_AdminMenu>>>;
    
}
