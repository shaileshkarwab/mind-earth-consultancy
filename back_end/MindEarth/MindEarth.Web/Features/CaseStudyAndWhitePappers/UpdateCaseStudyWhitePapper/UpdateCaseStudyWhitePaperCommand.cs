using FluentResults;
using MediatR;
using MindEarth.Web.Features.CaseStudyAndWhitePappers.DTO;

namespace MindEarth.Web.Features.CaseStudyAndWhitePappers.UpdateCaseStudyWhitePapper
{
    public record UpdateCaseStudyWhitePaperCommand(string rowId, DTO_ManageCaseStudyWhitePaper CaseStudyWhitePaper) : IRequest<Result<string>>;
    
}
