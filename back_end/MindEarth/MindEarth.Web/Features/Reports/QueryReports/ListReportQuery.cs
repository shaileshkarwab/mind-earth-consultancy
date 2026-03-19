using FluentResults;
using MediatR;
using MindEarth.Web.Common.Models;
using MindEarth.Web.Features.Reports.DTO;

namespace MindEarth.Web.Features.Reports.QueryReports
{
    public record ListReportQuery(Filter Filter) : IRequest<Result<List<DTO_ReportList>>>;

    public record ReteriveReportQuery(string reportId) : IRequest<Result<DTO_Report>>;
}
