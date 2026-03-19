using FluentResults;
using MediatR;
using MindEarth.Web.Features.CategorySubcategory.Command.CreateCategory;

namespace MindEarth.Web.Features.CategorySubcategory.Command.UpdateCategory
{
    public record UpdateCategoryCommand(string categoryId, DTO_CreateCategory CategoryUpdateDto):IRequest<Result<string>>;
    
}
