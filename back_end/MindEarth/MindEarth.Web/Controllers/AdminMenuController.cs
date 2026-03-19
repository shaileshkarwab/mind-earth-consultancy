using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MindEarth.Web.Extension;

namespace MindEarth.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AdminMenuController : APIBaseController
    {
        private readonly IMediator mediator;
        public AdminMenuController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> GetAdminMenu(CancellationToken cancellationToken)
        {
            var response = await this.mediator.Send(new Features.AdminMenu.Query.AdminMenuQuery(), cancellationToken);
            return response.ToActionResult();
        }
    }
}
