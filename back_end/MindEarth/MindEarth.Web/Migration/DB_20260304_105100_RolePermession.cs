using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260304105100)]
    public class DB_20260304_105100_RolePermession : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("role_permission_detail")
                .AddColumn("role_id").AsInt32().NotNullable();

            Create.ForeignKey("FK_ROLE_ROLE_DETAIL_ID")
                .FromTable("role_permission_detail").ForeignColumn("role_id")
                .ToTable("role").PrimaryColumn("id");
        }
    }
}
