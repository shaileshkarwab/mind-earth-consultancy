using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MindEarth.Web.Common.Models;
using MindEarth.Web.Controllers;
using MindEarth.Web.Extension;
using MindEarth.Web.Features.Reports.QueryReports;

namespace MindEarth.Web.WebController
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ReportController : APIBaseController
    {
        private readonly IMediator mediatr;
        public ReportController(IMediator mediatr)
        {
            this.mediatr = mediatr;
        }

        [HttpPost("v2")]
        public async Task<IActionResult> GetReports([FromBody] Filter filter)
        {
            var response = await this.mediatr.Send(new ListReportQueryForExternal(filter));
            return response.ToActionResult();
        }

        [HttpGet("v2/{reportUrl}")]
        public async Task<IActionResult> ReportDetails([FromRoute] string reportUrl)
        {
            var response = await this.mediatr.Send(new ReteriveReportSection(reportUrl));
            return response.ToActionResult();
        }
    }
}
