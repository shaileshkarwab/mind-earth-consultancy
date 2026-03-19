using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.User.CreateUser
{
    public class CreateUserCommand
    {
        public record CreateUserCommandRequest(DTO.DTO_ManageUser User) : IRequest<Result<string>>;
    }
}
