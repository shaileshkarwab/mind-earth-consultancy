using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260303162000)]
    public class DB_20260303_162000_ImageInUserMaster : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("user")
                .AddColumn("image_path")
                .AsString().NotNullable().WithDefaultValue("default-user.png");
        }
    }
}
