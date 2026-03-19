using FluentResults;
using MediatR;
using MindEarth.Web.Features.CaseStudyAndWhitePappers.DTO;

namespace MindEarth.Web.Features.CaseStudyAndWhitePappers.CreateCaseStudy
{
    public record CreateCaseStudyCommand(DTO_ManageCaseStudyWhitePaper CaseStudyWhitePaper) : IRequest<Result<string>>;
}
