using FluentResults;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;

namespace MindEarth.Web.Features.CategorySubcategory.Query
{
    public class SearchQueryHandler : IRequestHandler<SearchQuery, Result<List<DTO_SearchCategoryResponse>>>
    {
        private readonly MindEarthContext context;
        public SearchQueryHandler(MindEarthContext context)
        {
            this.context = context;
        }
        public async Task<Result<List<DTO_SearchCategoryResponse>>> Handle(SearchQuery request, CancellationToken cancellationToken)
        {
            var categoryQuery = context.Categories.AsQueryable();
            var categoryQueryResponse = await categoryQuery.Select(c => new DTO_SearchCategoryResponse
            {
                IsActive = c.IsActive,
                Name = c.Name,
                RowId = c.RowId,
            }).OrderBy(c => c.Name).ToListAsync();
            return Result.Ok(categoryQueryResponse);
        }
    }
}
