using FluentResults;
using MediatR;
using MindEarth.Web.Features.Reports.DTO;

namespace MindEarth.Web.Features.Reports.UpdateReport
{
    public record UpdateReportCommand(string reportID, DTO_Report Report) : IRequest<Result<DTO_CreateReportReponse>>;
    
}
