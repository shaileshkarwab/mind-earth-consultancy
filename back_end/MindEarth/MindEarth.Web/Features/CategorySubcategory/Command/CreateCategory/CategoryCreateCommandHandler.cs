using FluentResults;
using MediatR;
using MindEarth.Database.Entity;
using MindEarth.Web.Features.Services;

namespace MindEarth.Web.Features.CategorySubcategory.Command.CreateCategory
{
    public class CategoryCreateCommandHandler : IRequestHandler<CategoryCreateCommand, Result<string>>
    {

        private readonly MindEarthContext _context;
        private readonly IUserCommonService _userCommonService;
        private readonly IExistenceChecker existenceChecker;
        public CategoryCreateCommandHandler(MindEarthContext context, IUserCommonService userCommonService, IExistenceChecker existenceChecker)
        {
            _context = context;
            _userCommonService = userCommonService;
            this.existenceChecker = existenceChecker;
        }
        public async Task<Result<string>> Handle(CategoryCreateCommand request, CancellationToken cancellationToken)
        {
            var isCatgoryExisting = await this.existenceChecker.CheckExistenceAsync<Category>(c => c.Name == request.CategoryCreateDto.Name);
            if(isCatgoryExisting)
            {
                return Result.Fail(new FluentResults.Error("Category with the same name already exists"));
            }

            var rowID = Ulid.NewUlid().ToString();
            var categoryEntity = new Category
            {
                RowId = rowID,
                Name = request.CategoryCreateDto.Name,
                SeqNo = request.CategoryCreateDto.SeqNo,
                IsActive = request.CategoryCreateDto.IsActive,
                CreatedAt = _userCommonService.TrasnDateTime,
                CreatedBy = _userCommonService.UserId,
                UpdatedAt = _userCommonService.TrasnDateTime,
                UpdatedBy = _userCommonService.UserId
            };
            var subCategories = new List<SubCategory>();
            foreach (var item in request.CategoryCreateDto.SubCategories)
            {
                subCategories.Add(new SubCategory { 
                    CreatedAt = _userCommonService.TrasnDateTime,
                    CreatedBy = _userCommonService.UserId,
                    UpdatedAt = _userCommonService.TrasnDateTime,
                    UpdatedBy= _userCommonService.UserId,
                    IsActive = item.IsActive,
                    RowId = Ulid.NewUlid().ToString(),
                    Name = item.Name,
                });
            }
            categoryEntity.SubCategories = subCategories;
            this._context.Categories.Add(categoryEntity);
            await this._context.SaveChangesAsync();
            return Result.Ok(rowID);
        }
    }
}
