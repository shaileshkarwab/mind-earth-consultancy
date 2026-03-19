namespace MindEarth.Web.Features.Roles.DTO
{
    public class DTO_Role
    {
        public string? RowId { get; set; } = null!;

        public string Text { get; set; } = null!;


        public bool IsActive { get; set; }

        public List<DTO_RoleDetail> Roles  { get; set; } = new List<DTO_RoleDetail>();
    }

    public class DTO_RoleDetail
    {
        public string? RowId { get; set; } = null!;
        public string MenuDetailId { get; set; }

        public bool AddRight { get; set; }
        public bool ViewRight { get; set; }
        public bool DeleteRight { get; set; }
        public bool ModifyRight { get; set; }

    }
}
