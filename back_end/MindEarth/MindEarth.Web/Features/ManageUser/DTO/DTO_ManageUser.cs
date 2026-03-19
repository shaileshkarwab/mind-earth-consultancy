using System.Text.Json.Serialization;

namespace MindEarth.Web.Features.User.DTO
{
    public class DTO_ManageUser
    {

        public string? RowId { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public bool IsActive { get; set; }


        public string RoleId { get; set; } = null;

        public string? ImagePath { get; set; } = null!;
    }
}
