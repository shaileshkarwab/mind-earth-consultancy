using ClosedXML.Excel;
using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MindEarth.Web.Common.Models;
using MindEarth.Web.Extension;
using MindEarth.Web.Features.Reports.CreateReport;
using MindEarth.Web.Features.Reports.DeleteReport;
using MindEarth.Web.Features.Reports.DTO;
using MindEarth.Web.Features.Reports.QueryReports;
using MindEarth.Web.Features.Reports.ReportImage;
using MindEarth.Web.Features.Reports.UpdateReport;

namespace MindEarth.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReportController : APIBaseController
    {
        private readonly IMediator mediator;
        public ReportController(IMediator mediator) {
            this.mediator = mediator;
        }

        

        [HttpPost]
        public async Task<IActionResult> SaveReportFile([FromBody] DTO_Report report)
        {
            var response = await this.mediator.Send(new CreateReportCommand(report));
            return response.ToActionResult();
        }


        [HttpPost("list")]
        public async Task<IActionResult> List([FromBody] Filter reportFilter)
        {
            var response = await this.mediator.Send(new ListReportQuery(reportFilter));
            return response.ToActionResult();
        }


        [HttpGet("reterive/{reportID}")]
        public async Task<IActionResult> List([FromRoute] string reportID)
        {
            var response = await this.mediator.Send(new ReteriveReportQuery(reportID));
            return response.ToActionResult();
        }

        [HttpDelete("{reportID}")]
        public async Task<IActionResult> DeleteReportFile([FromRoute] string reportID)
        {
            var response = await this.mediator.Send(new DeleteReportCommand(reportID));
            return response.ToActionResult();
        }

        [HttpPatch("Image/{imageRowId}")]
        public async Task<IActionResult> SaveReportImage([FromRoute] string imageRowId, [FromBody]DTO_ReportImage reportImage)
        {
            var response = await this.mediator.Send(new UpdateReportImageCommand(imageRowId,reportImage));
            return response.ToActionResult();
        }

        [HttpDelete("Image/{reportImageID}")]
        public async Task<IActionResult> DeleteReportImage([FromRoute] string reportImageID)
        {
            var response = await this.mediator.Send(new DeleteReportImageCommand(reportImageID));
            return response.ToActionResult();
        }

        [HttpPut("{reportId}")]
        public async Task<IActionResult> UpdateReportFile([FromRoute]string reportId, [FromBody] DTO_Report report)
        {
            var response = await this.mediator.Send(new UpdateReportCommand(reportId, report));
            return response.ToActionResult();
        }
    }
}
