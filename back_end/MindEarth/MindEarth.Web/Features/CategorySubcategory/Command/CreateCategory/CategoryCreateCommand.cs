using FluentResults;
using MediatR;

namespace MindEarth.Web.Features.CategorySubcategory.Command.CreateCategory
{
    public record CategoryCreateCommand(DTO_CreateCategory CategoryCreateDto) : IRequest<Result<string>>;
}
