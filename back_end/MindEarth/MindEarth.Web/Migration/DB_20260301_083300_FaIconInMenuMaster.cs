using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260301083300)]
    public class DB_20260301_083300_FaIconInMenuMaster:AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("menu").AddColumn("fa_icon").AsString(100).Nullable();
            Alter.Table("menu_detail").AddColumn("fa_icon").AsString(100).Nullable();
        }
    }
}
