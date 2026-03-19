using FluentResults;
using MediatR;
using MindEarth.Web.Features.Reports.DTO;

namespace MindEarth.Web.Features.Reports.ReportImage
{
    public record UpdateReportImageCommand(string imageRowId, DTO_ReportImage createImage) : IRequest<Result<bool>>;
    
}
