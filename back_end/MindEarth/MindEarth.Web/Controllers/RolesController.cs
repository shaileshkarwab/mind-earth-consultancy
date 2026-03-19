using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MindEarth.Web.Common.Models;
using MindEarth.Web.Extension;
using MindEarth.Web.Features.Roles.CreateRole;
using MindEarth.Web.Features.Roles.DeleteRole;
using MindEarth.Web.Features.Roles.DTO;
using MindEarth.Web.Features.Roles.QueryRoles;

namespace MindEarth.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RolesController : APIBaseController
    {
        private readonly IMediator mediator;
        public RolesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]bool active) {
            var roles = await this.mediator.Send(new RoleQuery.RoleQueryRequest(active));
            return roles.ToActionResult();
        }

        [HttpPost("list")]
        public async Task<IActionResult> List([FromBody] Filter filter)
        {
            var roles = await this.mediator.Send(new RoleQuery.RoleAllQueryRequest(filter));
            return roles.ToActionResult();
        }

        [HttpGet("menus")]
        public async Task<IActionResult> GetAllMenuAndMenuDetails()
        {
            var roles = await this.mediator.Send(new MenuAndMenuDetailQuery());
            return roles.ToActionResult();
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] DTO_Role createRole)
        {
            var roles = await this.mediator.Send(new CreateRoleCommand(createRole));
            return roles.ToActionResult();
        }

        [HttpGet("{roleId}")]
        public async Task<IActionResult> Reterive([FromRoute] string roleId)
        {
            var roles = await this.mediator.Send(new RoleDetailByIdQuery(roleId));
            return roles.ToActionResult();
        }

        [HttpDelete("{roleId}")]
        public async Task<IActionResult> Delete([FromRoute] string roleId)
        {
            var roles = await this.mediator.Send(new DeleteRoleCommand(roleId));
            return roles.ToActionResult();
        }
    }
}
