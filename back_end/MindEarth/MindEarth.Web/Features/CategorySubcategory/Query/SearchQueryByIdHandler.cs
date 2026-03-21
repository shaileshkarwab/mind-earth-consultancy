using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Errors;
using MindEarth.Web.Features.CategorySubcategory.Command.CreateCategory;

namespace MindEarth.Web.Features.CategorySubcategory.Query
{
    public class SearchQueryByIdHandler : IRequestHandler<SearchQueryById, Result<DTO_CreateCategory>>
    {
        private readonly MindEarthContext context;
        public SearchQueryByIdHandler(MindEarthContext context) {
            this.context = context;
        }
        public async Task<Result<DTO_CreateCategory>> Handle(SearchQueryById request, CancellationToken cancellationToken)
        {
            var response = await this.context.Categories.AsNoTracking().Include(c => c.SubCategories).SingleOrDefaultAsync(c => c.RowId == request.categoryID);
            if(response == null)
            {
                return Result.Fail(new NoDataFound());
            }
            var categoryResponse = new DTO_CreateCategory
            {
                IsActive = response.IsActive,
                Name = response.Name,
                RowId = response.RowId,
                SeqNo = response.SeqNo,
                SubCategories = response.SubCategories.Select(s => new DTO_SubCategory
                {
                    IsActive = s.IsActive,
                    Name = s.Name,
                    RowId = s.RowId,
                    SeqNo = s.SeqNo,
                    SubCategoryListUrl = s.SubCategoryListUrl
                }).ToList()
            };
            return Result.Ok(categoryResponse);
        }
    }
}
