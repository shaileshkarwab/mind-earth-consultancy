namespace MindEarth.Web.Features.ManageUser.DTO
{
    public class DTO_UserList
    {
        public string RowId { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public bool IsActive { get; set; }

        public string RoleName { get; set; } = null;

        public string? ImagePath { get; set; } = null!;
    }
}
