using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.CategorySubcategory.Command.Delete
{
    public record DeleteSubCategoryCommand(string subCategoryID):IRequest<Result<bool>>;

}
