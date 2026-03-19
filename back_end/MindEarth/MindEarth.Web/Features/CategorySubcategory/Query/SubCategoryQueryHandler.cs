using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MindEarth.Database.Entity;
using MindEarth.Web.Common.Models;

namespace MindEarth.Web.Features.CategorySubcategory.Query
{
    public class SubCategoryQueryHandler : IRequestHandler<SubCategoryQuery, Result<List<DTO_LookUp>>>
    {
        private readonly MindEarthContext _context;
        public SubCategoryQueryHandler(MindEarthContext context) { 
            _context = context;
        }

        public async Task<Result<List<DTO_LookUp>>> Handle(SubCategoryQuery request, CancellationToken cancellationToken)
        {
            var subCategories = await _context.SubCategories.Select(x => new DTO_LookUp
            {
                RowId = x.RowId.ToString(),
                Value = x.Name
            }).OrderBy(c=>c.Value).ToListAsync();    
        
            return Result.Ok(subCategories);
        }
    }
}
