using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260306151900)]
    public class DB_20260306_151900_ReportsMenu : AutoReversingMigration
    {
        public override void Up()
        {
            var _dateTime = System.DateTime.Now.ToUniversalTime();
            Insert.IntoTable("menu")
                .Row(new
                {
                    id = 3,
                    row_id = Ulid.NewUlid().ToString(),
                    text = "Reports",
                    controller = "reports-controller",
                    seq_no = 3,
                    is_active = true,
                    created_at = _dateTime,
                    created_by = 1,
                    updated_at = _dateTime,
                    updated_by = 1,
                    fa_icon = "bx-report",
                    page_url = "list-of-reports"

                });
        }
    }
}
