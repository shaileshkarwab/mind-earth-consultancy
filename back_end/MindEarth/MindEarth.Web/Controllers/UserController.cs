using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MindEarth.Web.Extension;
using MindEarth.Web.Features.ManageUser.DeleteUser;
using MindEarth.Web.Features.ManageUser.GetUser;
using MindEarth.Web.Features.User.DTO;
using static MindEarth.Web.Features.User.CreateUser.CreateUserCommand;

namespace MindEarth.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : APIBaseController
    {
        private readonly IMediator mediator;
        public UserController(IMediator mediator) {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody]DTO_ManageUser manageUser)
        {
            var response = await this.mediator.Send(new CreateUserCommandRequest(manageUser));
            return response.ToActionResult();
        }

        [HttpGet]
        public async Task<IActionResult> List([FromQuery]bool? active)
        {
            var response = await this.mediator.Send(new GetAllUserQuery(active));
            return response.ToActionResult();
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Reterive([FromRoute]string userId)
        {
            var response = await this.mediator.Send(new GetUserByIdQuery(userId));
            return response.ToActionResult();
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> Delete([FromRoute] string userId)
        {
            var response = await this.mediator.Send(new DeleteUserCommand(userId));
            return response.ToActionResult();
        }
    }
}
