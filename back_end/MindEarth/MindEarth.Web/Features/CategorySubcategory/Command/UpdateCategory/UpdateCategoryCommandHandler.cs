using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.Services;

namespace MindEarth.Web.Features.CategorySubcategory.Command.UpdateCategory
{
    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, Result<string>>
    {
        private readonly MindEarthContext context;
        private readonly IUserCommonService userCommonService;
        public UpdateCategoryCommandHandler(MindEarthContext context, IUserCommonService userCommonService)
        {
            this.context = context;
            this.userCommonService = userCommonService;
        }
        public async Task<Result<string>> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await this.context.Categories.Include(c => c.SubCategories).SingleOrDefaultAsync(c => c.RowId == request.categoryId);
            if (category == null)
            {
                return Result.Fail(new NoDataFound());
            }

            //update the category first
            category.SeqNo = request.CategoryUpdateDto.SeqNo;
            category.Name = request.CategoryUpdateDto.Name;
            category.IsActive = request.CategoryUpdateDto.IsActive;
            category.UpdatedAt = userCommonService.TrasnDateTime;
            category.UpdatedBy = userCommonService.UserId;

            //update the sub categories or add a new subcategory

            foreach (var sub in request.CategoryUpdateDto.SubCategories)
            {
                // if row id is not null then update
                if (!string.IsNullOrEmpty(sub.RowId))
                {
                    var subCategory = category.SubCategories.SingleOrDefault(c => c.RowId == sub.RowId);
                    if (subCategory == null)
                    {
                        return Result.Fail(new NoDataFound());
                    }

                    subCategory.SeqNo = sub.SeqNo;
                    subCategory.Name = sub.Name;
                    subCategory.IsActive = sub.IsActive;
                    subCategory.UpdatedAt = userCommonService.TrasnDateTime;
                    subCategory.UpdatedBy = userCommonService.UserId;
                }
                else {
                    category.SubCategories.Add(new SubCategory { 
                        RowId = Ulid.NewUlid().ToString(),
                        Name = sub.Name,
                        SeqNo = sub.SeqNo,
                        IsActive = sub.IsActive,
                        CreatedAt = userCommonService.TrasnDateTime,
                        CreatedBy = userCommonService.UserId,
                        UpdatedAt = userCommonService.TrasnDateTime,
                        UpdatedBy = userCommonService.UserId
                    });
                }
            }
            await this.context.SaveChangesAsync();

            return Result.Ok(request.categoryId);
        }
    }
}
