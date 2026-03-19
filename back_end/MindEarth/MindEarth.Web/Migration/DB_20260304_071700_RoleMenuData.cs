using FluentMigrator;
using System;

namespace MindEarth.Web.Migration
{
    [Migration(20260304071700)]
    public class DB_20260304_071700_RoleMenuData : AutoReversingMigration
    {
        public override void Up()
        {
            var _dateTime = System.DateTime.Now.ToUniversalTime();
            Insert.IntoTable("menu_detail")
                .Row(new
                {
                    row_id = Ulid.NewUlid().ToString(),
                    menu_id = 2,
                    text = "Roles",
                    page_url = "list-of-roles",
                    seq_no = 2,
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
