using FluentResults;
using MediatR;
using MindEarth.Web.Features.Reports.DTO;

namespace MindEarth.Web.Features.Reports.CreateReport
{
    public record CreateReportCommand(DTO_Report Report) : IRequest<Result<DTO_CreateReportReponse>>;
    
}
