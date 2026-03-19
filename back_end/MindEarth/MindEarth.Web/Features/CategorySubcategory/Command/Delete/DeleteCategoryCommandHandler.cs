using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;

namespace MindEarth.Web.Features.CategorySubcategory.Command.Delete
{
    public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, Result<bool>>
    {
        private readonly MindEarthContext context;
        public DeleteCategoryCommandHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<bool>> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await context.Categories.Include(c=>c.SubCategories).SingleOrDefaultAsync(c => c.RowId == request.categoryID);
            if(category == null)
            {
                return Result.Fail(new NoDataFound());
            }
            context.SubCategories.RemoveRange(category.SubCategories);
            context.Categories.Remove(category);

            await context.SaveChangesAsync();
            return true;
        }
    }
}
