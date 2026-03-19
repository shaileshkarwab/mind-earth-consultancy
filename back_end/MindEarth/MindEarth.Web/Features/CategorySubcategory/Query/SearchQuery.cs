using FluentResults;
using MediatR;
using MindEarth.Web.Common.Models;
using MindEarth.Web.Features.CategorySubcategory.Command.CreateCategory;

namespace MindEarth.Web.Features.CategorySubcategory.Query
{
    public record SearchQuery(Filter Filter):IRequest<Result<List<DTO_SearchCategoryResponse>>>;

    public record SearchQueryById(string categoryID) : IRequest<Result<DTO_CreateCategory>>;


}
