using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Features.Reports.DTO;

namespace MindEarth.Web.Features.Reports.QueryReports
{
    public class ListReportQueryHandler : IRequestHandler<ListReportQuery, Result<List<DTO_ReportList>>>
    {
        private readonly MindEarthContext context;
        public ListReportQueryHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<List<DTO_ReportList>>> Handle(ListReportQuery request, CancellationToken cancellationToken)
        {
            var reports = (from report in context.Reports
                           join subCategory in context.SubCategories on report.SubCategoryMasterId equals subCategory.Id
                           select new DTO_ReportList
                           {
                               ReportId = report.RowId,
                               ReportName = report.ExcelFileName,
                               Category = subCategory.Name,
                               ReportURLLink = report.ReportUrlLink,
                               IsActive = report.IsActive
                           }
                           )
                           .Skip((request.Filter.PageParameter.PageNo - 1) * request.Filter.PageParameter.PageSize)
                           .Take(request.Filter.PageParameter.PageSize)
                           .OrderBy(c => c.Category).ThenBy(c => c.ReportName).AsQueryable();

            var response = await reports.ToListAsync();
            return Result.Ok(response);
        }
    }
}
