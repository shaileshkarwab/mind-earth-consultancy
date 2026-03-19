using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.CaseStudyAndWhitePappers.DeleteCaseStudyWhitePapper
{
    public record DeleteCasePaperCaseStudyCommand(string rowID) : IRequest<Result<bool>>;
    
    
}
