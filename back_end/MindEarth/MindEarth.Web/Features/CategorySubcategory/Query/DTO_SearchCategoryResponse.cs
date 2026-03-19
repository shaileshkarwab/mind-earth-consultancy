namespace MindEarth.Web.Features.CategorySubcategory.Query
{
    public class DTO_SearchCategoryResponse
    {
        public string? RowId { get; set; } = null!;

        public string Name { get; set; } = null!;

        public bool IsActive { get; set; }
    }
}
