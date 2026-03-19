using MindEarth.Database.Entity;

namespace MindEarth.Web.Features.CategorySubcategory.Command.CreateCategory
{
    public class DTO_CreateCategory
    {

        public string? RowId { get; set; } = null!;

        public string Name { get; set; } = null!;

        public int SeqNo { get; set; }

        public bool IsActive { get; set; }

        public List<DTO_SubCategory> SubCategories { get; set; } = new List<DTO_SubCategory>();
    }

    public class DTO_SubCategory
    {

        public string? RowId { get; set; } = null!;


        public string Name { get; set; } = null!;

        public int SeqNo { get; set; }

        public bool IsActive { get; set; }
    }
}
