using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MindEarth.Web.Extension;
using MindEarth.Web.Features.File;

namespace MindEarth.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FileUploadController : APIBaseController
    {
        private readonly IMediator mediator;
        public FileUploadController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("{uploadFolder}")]
        public async Task<IActionResult> Upload([FromRoute] string uploadFolder, [FromForm] IFormFile file)
        {
            var uploadCommand = new UploadFileCommand { file = file, uploadsFolder = uploadFolder};
            var response = await this.mediator.Send(uploadCommand);
            return response.ToActionResult();
        }
    }
}
