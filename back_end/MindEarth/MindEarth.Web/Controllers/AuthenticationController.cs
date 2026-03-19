using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MindEarth.Web.Extension;
using MindEarth.Web.Features.Auth.Commands;
using MindEarth.Web.Features.Auth.DTO;

namespace MindEarth.Web.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthenticationController : APIBaseController
    {
        private readonly IMediator mediator;
        public AuthenticationController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("authenticate")]
        [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AuthenticateUser([FromBody]LoginRequestCommand loginRequest)
        {
            var loginResponse = await mediator.Send(loginRequest);
            return loginResponse.ToActionResult();
        }

        [Authorize]
        [HttpPost("authenticate/{refreshToken}")]
        public async Task<IActionResult> LogOut([FromRoute]string refreshToken)
        {
            var loginResponse = await mediator.Send(new LogoutCommand(  refreshToken));
            return loginResponse.ToActionResult();
        }
    }
}
