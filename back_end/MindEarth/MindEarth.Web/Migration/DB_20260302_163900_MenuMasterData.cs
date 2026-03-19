using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260302163900)]
    public class DB_20260302_163900_MenuMasterData : AutoReversingMigration
    {
        public override void Up()
        {
            var _dateTime = System.DateTime.Now.ToUniversalTime();
            Insert.IntoTable("menu")
                .Row(new
                {
                    id = 2,
                    row_id = Ulid.NewUlid().ToString(),
                    text = "Users & Security",
                    controller = "user-controller",
                    seq_no = 1,
                    is_active = true,
                    created_at = _dateTime,
                    created_by = 1,
                    updated_at = _dateTime,
                    updated_by = 1,
                    fa_icon = "bx-user"
                });

            Insert.IntoTable("menu_detail")
                .Row(new
                {
                    row_id = Ulid.NewUlid().ToString(),
                    menu_id = 2,
                    text = "Users",
                    page_url = "list-of-users",
                    seq_no = 1,
                    is_active = true,
                    created_at = _dateTime,
                    created_by = 1,
                    updated_at = _dateTime,
                    updated_by = 1,
                    fa_icon = "fas fa-list"
                });
        }
    }
}
