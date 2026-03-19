using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;

namespace MindEarth.Web.Features.CategorySubcategory.Command.Delete
{
    public class DeleteSubCategoryCommandHandler : IRequestHandler<DeleteSubCategoryCommand, Result<bool>>
    {
        private readonly MindEarthContext context;
        public DeleteSubCategoryCommandHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<bool>> Handle(DeleteSubCategoryCommand request, CancellationToken cancellationToken)
        {
            var subCategory = await this.context.SubCategories.SingleOrDefaultAsync(c => c.RowId == request.subCategoryID);
            if(subCategory == null)
            {
                return Result.Fail(new NoDataFound());
            }

            this.context.SubCategories.Remove(subCategory);
            await this.context.SaveChangesAsync();
            return Result.Ok(true);
        }
    }
}
