using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.Auth.Commands
{
    public record LogoutCommand(string refreshToken):IRequest<Result<bool>>;
    
}
