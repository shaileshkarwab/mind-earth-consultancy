using FluentResults;
using MediatR;
using MindEarth.Web.Features.Auth.DTO;

namespace MindEarth.Web.Features.Auth.Commands
{
    public record LoginRequestCommand(string UserName, string Password) : IRequest<Result<LoginResponse>>;
}
