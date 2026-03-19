using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260303150400)]
    public class DB_20260303_150400_UserRoleUpdation : FluentMigrator.Migration
    {
        public override void Down()
        {
        }

        public override void Up()
        {
            Update.Table("user")
                .Set(new { role_id = 1 })
                .Where(new { id = 1 });

            Alter.Table("user")
                .AlterColumn("role_id")
                .AsInt32()
                .NotNullable();
        }
    }
}
