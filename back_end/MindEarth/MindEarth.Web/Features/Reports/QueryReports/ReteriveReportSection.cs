using FluentResults;
using MediatR;
using MindEarth.Web.Features.Reports.DTO;

namespace MindEarth.Web.Features.Reports.QueryReports
{
    public record ReteriveReportSection(string reportURL) : IRequest<Result<List<DTO_Excel>>>;
    
}
