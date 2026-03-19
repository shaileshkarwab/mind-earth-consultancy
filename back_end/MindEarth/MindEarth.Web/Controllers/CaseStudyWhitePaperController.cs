using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MindEarth.Web.Common.Models;
using MindEarth.Web.Extension;
using MindEarth.Web.Features.CaseStudyAndWhitePappers.CreateCaseStudy;
using MindEarth.Web.Features.CaseStudyAndWhitePappers.DeleteCaseStudyWhitePapper;
using MindEarth.Web.Features.CaseStudyAndWhitePappers.DTO;
using MindEarth.Web.Features.CaseStudyAndWhitePappers.ReteriveCaseStudyWhitePapper;
using MindEarth.Web.Features.CaseStudyAndWhitePappers.UpdateCaseStudyWhitePapper;

namespace MindEarth.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CaseStudyWhitePaperController : APIBaseController
    {
        private readonly IMediator mediator;
        public CaseStudyWhitePaperController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> SaveCaseStudyWhitePaper([FromBody] DTO_ManageCaseStudyWhitePaper manageCaseStudyWhitePaper)
        {
            var response = await this.mediator.Send(new CreateCaseStudyCommand(manageCaseStudyWhitePaper));
            return response.ToActionResult();
        }

        [HttpPost("list")]
        public async Task<IActionResult> ListCaseStudyWhitePaper([FromBody] Filter filter)
        {
            var response = await this.mediator.Send(new CaseStudyWhitePapperQuery(filter));
            return response.ToActionResult();
        }

        [HttpGet("{rowId}")]
        public async Task<IActionResult> ReteriveCaseStudyWhitePaper([FromRoute] string rowId)
        {
            var response = await this.mediator.Send(new CaseStudyWhitePapperQueryByRowId(rowId));
            return response.ToActionResult();
        }

        [HttpPut("{rowId}")]
        public async Task<IActionResult> UpdateCaseStudyWhitePaper([FromRoute]string rowId, [FromBody] DTO_ManageCaseStudyWhitePaper manageCaseStudyWhitePaper)
        {
            var response = await this.mediator.Send(new UpdateCaseStudyWhitePaperCommand(rowId,manageCaseStudyWhitePaper));
            return response.ToActionResult();
        }

        [HttpDelete("{rowId}")]
        public async Task<IActionResult> DeleteCaseStudyWhitePaper([FromRoute] string rowId)
        {
            var response = await this.mediator.Send(new DeleteCasePaperCaseStudyCommand(rowId));
            return response.ToActionResult();
        }
    }
}
