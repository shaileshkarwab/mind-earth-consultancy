using FluentResults;
using MediatR;
using MindEarth.Web.Features.Reports.DTO;

namespace MindEarth.Web.Features.Reports.QueryReports
{
    public record ImageAndMetaDataQuery(string fileName) : IRequest<Result<DTO_MetaDataResponse>>;
}
