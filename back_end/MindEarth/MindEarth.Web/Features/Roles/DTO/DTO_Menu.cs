using MindEarth.Database.Entity;

namespace MindEarth.Web.Features.Roles.DTO
{
    public class DTO_Menu
    {

        public string RowId { get; set; } = null!;

        public string Text { get; set; } = null!;


        public bool IsActive { get; set; }

        public List<DTO_MenuDetail> MenuDetails { get; set; } = new List<DTO_MenuDetail>();

    }

    public class DTO_MenuDetail
    {

        public string MenuDetailId { get; set; } = null!;
        public string Text { get; set; } = null!;
        public bool IsActive { get; set; }
        public bool AddRight { get; set; }
        public bool ViewRight { get; set; }
        public bool ModifyRight { get; set; }
        public bool DeleteRight { get; set; }
    }
}
