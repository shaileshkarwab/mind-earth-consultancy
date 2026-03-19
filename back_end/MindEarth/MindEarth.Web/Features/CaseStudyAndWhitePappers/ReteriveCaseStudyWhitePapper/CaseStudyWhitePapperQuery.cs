using FluentResults;
using MediatR;
using MindEarth.Web.Common.Models;
using MindEarth.Web.Features.CaseStudyAndWhitePappers.DTO;

namespace MindEarth.Web.Features.CaseStudyAndWhitePappers.ReteriveCaseStudyWhitePapper
{
    public record CaseStudyWhitePapperQuery(Filter Filter) : IRequest<Result<List<DTO_CaseStudyList>>>;

    public record CaseStudyWhitePapperQueryByRowId(string rowId) : IRequest<Result<DTO_ManageCaseStudyWhitePaper>>;

}
