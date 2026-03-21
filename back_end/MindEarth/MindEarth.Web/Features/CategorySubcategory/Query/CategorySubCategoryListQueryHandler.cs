using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Features.CategorySubcategory.Command.CreateCategory;

namespace MindEarth.Web.Features.CategorySubcategory.Query
{
    public class CategorySubCategoryListQueryHandler : IRequestHandler<CategorySubCategoryListQuery, Result<List<DTO_CategorySubCategoryList>>>
    {
        private readonly MindEarthContext context;
        public CategorySubCategoryListQueryHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<List<DTO_CategorySubCategoryList>>> Handle(CategorySubCategoryListQuery request, CancellationToken cancellationToken)
        {
            var response = await this.context.Categories
            .Where(c => c.IsActive)
            .OrderBy(c => c.SeqNo)
            .Select(c => new DTO_CategorySubCategoryList
            {
                CategoryName = c.Name,
                SubCategories = c.SubCategories
            .Where(sc => sc.IsActive)
            .OrderBy(sc => sc.SeqNo)
            .Select(sc => new SubCategory
            {
                SubCategoryName = sc.Name,
                SubCategoryLink = sc.SubCategoryListUrl
            })
            .ToList()
            })
            .ToListAsync();

            return response;
        }
    }
}
