using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.Reports.ReteriveReport
{
    public record ReteriveReportQuery(string reportURL) : IRequest<Result<object>>;
    
}
