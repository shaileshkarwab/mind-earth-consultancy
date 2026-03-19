using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.CategorySubcategory.Command.Delete
{
    public record DeleteCategoryCommand(string categoryID) : IRequest<Result<bool>>;
}
