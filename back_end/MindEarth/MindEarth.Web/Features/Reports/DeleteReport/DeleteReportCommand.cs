using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.Reports.DeleteReport
{
    public record DeleteReportCommand(string reportId) : IRequest<Result<bool>>;
}
