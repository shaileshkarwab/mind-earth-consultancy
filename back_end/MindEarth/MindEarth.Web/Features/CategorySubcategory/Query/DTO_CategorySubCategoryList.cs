namespace MindEarth.Web.Features.CategorySubcategory.Query
{
    public class DTO_CategorySubCategoryList
    {
        public string CategoryName { get; set; }
        public List<SubCategory> SubCategories { get; set; }
    }

    public class SubCategory
    {
        public string SubCategoryName { get; set; }
        public string SubCategoryLink { get; set; }
    }
}
