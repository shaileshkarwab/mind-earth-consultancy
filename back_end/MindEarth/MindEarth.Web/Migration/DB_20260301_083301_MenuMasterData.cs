using FluentMigrator;
using MindEarth.Database.Entity;
using static System.Net.Mime.MediaTypeNames;

namespace MindEarth.Web.Migration
{
    [Migration(20260301083301)]
    public class DB_20260301_083301_MenuMasterData : AutoReversingMigration
    {
        public override void Up()
        {
            var _dateTime = System.DateTime.Now.ToUniversalTime();
            Insert.IntoTable("menu")
                .Row(new
                {
                    id = 1,
                    row_id = Ulid.NewUlid().ToString(),
                    text = "Masters",
                    controller = "master_controller",
                    seq_no = 2,
                    is_active = true,
                    created_at = _dateTime,
                    created_by = 1,
                    updated_at = _dateTime,
                    updated_by = 1,
                    fa_icon = "bx-tachometer"
                });

            Insert.IntoTable("menu_detail")
                .Row(new
                {
                    row_id = Ulid.NewUlid().ToString(),
                    menu_id = 1,
                    text = "Category",
                    page_url = "list_of_category",
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
