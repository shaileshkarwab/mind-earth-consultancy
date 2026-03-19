using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260317150600)]
    public class DB_20260317_150600_MenuForCaseStudy : AutoReversingMigration
    {
        public override void Up()
        {
            var _dateTime = System.DateTime.Now.ToUniversalTime();
            Insert.IntoTable("menu")
                .Row(new
                {
                    id = 4,
                    row_id = Ulid.NewUlid().ToString(),
                    text = "Case Study/White Pappers",
                    controller = "casestudy-whitepaper-controller",
                    seq_no = 4,
                    is_active = true,
                    created_at = _dateTime,
                    created_by = 1,
                    updated_at = _dateTime,
                    updated_by = 1,
                    fa_icon = "bx-file",
                    page_url = "list-of-case-study-white-pappers"
                });
        }
    }
}
