namespace MindEarth.Web.Features.Roles.DTO
{
    public class RoleQueryResponse
    {
        public string RowId { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
    }

    public class RoleList
    {

        public string RowId { get; set; } = null!;

        public string RoleName { get; set; } = null!;

        public bool IsActive { get; set; }

    }
}
