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
        private readonly IGenericIDService genericIDService;
        public UpdateCategoryCommandHandler(MindEarthContext context, IUserCommonService userCommonService, IGenericIDService genericIDService)
        {
            this.context = context;
            this.userCommonService = userCommonService;
            this.genericIDService = genericIDService;
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
                //check if the sub category url exists
                var result = await this.genericIDService.GetAnyAsync<SubCategory>(c => c.SubCategoryListUrl == sub.SubCategoryListUrl && c.RowId != sub.RowId);
                if(result)
                {
                    return Result.Fail(new ValidationError($"The subcategory URL {sub.SubCategoryListUrl} already exists"));
                }
                // if row id is not null then update
                if (!string.IsNullOrEmpty(sub.RowId))
                {
                    var subCategory = category.SubCategories.SingleOrDefault(c => c.RowId == sub.RowId);
                    subCategory.SeqNo = sub.SeqNo;
                    subCategory.Name = sub.Name;
                    subCategory.IsActive = sub.IsActive;
                    subCategory.UpdatedAt = userCommonService.TrasnDateTime;
                    subCategory.UpdatedBy = userCommonService.UserId;
                    subCategory.SubCategoryListUrl = sub.SubCategoryListUrl;
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
                        UpdatedBy = userCommonService.UserId,
                        SubCategoryListUrl = sub.SubCategoryListUrl
                    });
                }
            }
            await this.context.SaveChangesAsync();

            return Result.Ok(request.categoryId);
        }
    }
}
