using DocumentFormat.OpenXml.Bibliography;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Extension;
using MindEarth.Web.Features.CategorySubcategory.Query;
using MindEarth.Web.Features.DTO;
using MindEarth.Web.Features.Reports.DTO;
using Newtonsoft.Json;

namespace MindEarth.Web.Features.Reports.QueryReports
{
    public class ListReportQueryHandler : IRequestHandler<ListReportQuery, Result<List<DTO_ReportList>>>
    {
        private readonly MindEarthContext context;
        private readonly IHttpContextAccessor httpContextAccessor; 
        public ListReportQueryHandler(MindEarthContext context, IHttpContextAccessor httpContextAccessor)
        {
            this.context = context;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<Result<List<DTO_ReportList>>> Handle(ListReportQuery request, CancellationToken cancellationToken)
        {
            PaginationMeta meta;
            var reportForFilter = this.context.Set<Report>()
            .Include(r => r.SubCategoryMaster)
            .OrderBy(c => c.SubCategoryMaster.Name).ThenBy(c => c.ExcelSaveFileName)
            .AsQueryable();

            reportForFilter = reportForFilter.ApplyEqualityFilters(request.Filter);
            reportForFilter = reportForFilter.ApplyPagination(request.Filter.PageParameter, out meta);
            if(meta != null)
            {
                this.httpContextAccessor.HttpContext.Response.Headers.Add("X-PAGINATION", JsonConvert.SerializeObject(meta));
            }
            var reports = await reportForFilter.Select(c => new DTO_ReportList
            {
                ReportId = c.RowId,
                ReportName = c.ExcelFileName,
                Category = c.SubCategoryMaster.Name,
                ReportURLLink = c.ReportUrlLink,
                IsActive = c.IsActive
            }).ToListAsync();

            return Result.Ok(reports);
        }
    }
}
