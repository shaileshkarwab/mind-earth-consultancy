using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.Reports.ReportImage
{
    public record DeleteReportImageCommand(string reportImageRowId) : IRequest<Result<string>>;
    
    
}
