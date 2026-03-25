using Azure;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Extension;
using MindEarth.Web.Features.DTO;
using MindEarth.Web.Features.Reports.DTO;
using MindEarth.Web.Features.Services;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace MindEarth.Web.Features.Reports.QueryReports
{
    public class ListReportQueryForExternalHandler : IRequestHandler<ListReportQueryForExternal, Result<List<DTO_ReportExternal>>>
    {
        private readonly MindEarthContext context;
        private readonly IConfigParamService configuration;
        const string folderPath = "reports";
        private readonly string webDocumentPath;
        private readonly IHttpContextAccessor httpContextAccessor;
        public ListReportQueryForExternalHandler(MindEarthContext context, IConfigParamService configuration, IHttpContextAccessor httpContextAccessor )
        {
            this.context = context;
            this.configuration = configuration;
            webDocumentPath = this.configuration.GetWebPath();
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<Result<List<DTO_ReportExternal>>> Handle(ListReportQueryForExternal request, CancellationToken cancellationToken)
        {
            PaginationMeta meta;

            var reportForFilter = this.context.Set<Report>()
            .Include(r => r.SubCategoryMaster)
            .OrderBy(c => c.SubCategoryMaster.Name).ThenBy(c => c.ExcelSaveFileName)
            .AsQueryable();

            reportForFilter = reportForFilter.ApplyEqualityFilters(request.Filter);
            reportForFilter = reportForFilter.ApplyPagination(request.Filter.PageParameter, out meta);


            if (meta != null)
            {
                this.httpContextAccessor.HttpContext.Response.Headers.Add("X-PAGINATION", JsonConvert.SerializeObject(meta));
            }

            var reports = await reportForFilter.Select(c => new
            {
                ReportTitle = c.ReportTitle,
                ReportDesc = c.ReportDesc,
                ReportWebImage = string.Empty,
                ReportUrlLink = c.ReportUrlLink,
                Id = c.Id
            }).ToListAsync();


            var result = reports.Select(c => new DTO_ReportExternal
            {
                ReportTitle = c.ReportTitle,
                ReportDesc = c.ReportDesc,
                ReportWebImage = $"{webDocumentPath}/{GetWebPageImage(c.Id)}",
                ReportUrlLink = c.ReportUrlLink,
            }).ToList();

            return Result.Ok(result);
        }

       string GetWebPageImage(Int32 reportID)
        {
            var reportImages = this.context.ReportImages.Where(c => c.ReportMasterId == reportID && c.SlideNo == "web").SingleOrDefault();
            if(reportImages == null)
            {
                return "default-images/no-image-available.png";
            }
            else
            {
                return $"{folderPath}/{reportImages.ImageUploadPath}";
            }
        }
    }
}
