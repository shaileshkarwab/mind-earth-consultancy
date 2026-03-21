using FluentResults;
using MediatR;
using MindEarth.Web.Common.Models;

namespace MindEarth.Web.Features.CategorySubcategory.Query
{
    public record SubCategoryQuery : IRequest<Result<List<DTO_LookUp>>>;

    public record CategorySubCategoryListQuery : IRequest<Result<List<DTO_CategorySubCategoryList>>>;
    
}
