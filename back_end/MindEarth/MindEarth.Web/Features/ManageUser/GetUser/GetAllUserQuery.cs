using FluentResults;
using MediatR;
using MindEarth.Web.Features.ManageUser.DTO;
using MindEarth.Web.Features.User.DTO;

namespace MindEarth.Web.Features.ManageUser.GetUser
{
    public record GetAllUserQuery(bool? active) : IRequest<Result<List<DTO_UserList>>>;

    public record GetUserByIdQuery(string userId) : IRequest<Result<DTO_ManageUser>>;

}
