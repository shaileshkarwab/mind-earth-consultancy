using System.Text.Json.Serialization;

namespace MindEarth.Web.Features.AdminMenu.Query
{
    public class DTO_AdminMenu
    {


        public string Text { get; set; } = null!;

        public string Controller { get; set; } = null!;

        public string? PageUrl { get; set; }

        public string? FaIcon { get; set; }

        public int SeqNo { get; set; }

        public List<DTO_AdminMenuDetail> Details { get; set; }
    }

    public class DTO_AdminMenuDetail
    {



        public string Text { get; set; } = null!;

        public string PageUrl { get; set; } = null!;

        public bool IsActive { get; set; }
        public string? FaIcon { get; set; }

        public int SeqNo { get; set; }
    }
}