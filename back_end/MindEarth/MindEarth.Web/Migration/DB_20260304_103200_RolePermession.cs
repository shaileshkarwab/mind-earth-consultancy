using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260304103200)]
    public class DB_20260304_103200_RolePermession : AutoReversingMigration
    {
        public override void Up()
        {
           Create.Table("role_permission_detail")
                .WithColumn("id").AsInt32().PrimaryKey().Identity().NotNullable()
                .WithColumn("row_id").AsFixedLengthString(26).NotNullable().Unique("UK_ROLE_PERMISSION_DETAIL_ROW_ID")
                .WithColumn("menu_detail_id").AsInt32().NotNullable()
                .WithColumn("add_right").AsBoolean().NotNullable()
                .WithColumn("view_right").AsBoolean().NotNullable()
                .WithColumn("modify_right").AsBoolean().NotNullable()
                .WithColumn("delete_right").AsBoolean().NotNullable()
                .WithColumn("created_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("created_by").AsInt32().NotNullable()
                .WithColumn("updated_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("updated_by").AsInt32().NotNullable();

            Create.ForeignKey("FK_RPD_CREATED_BY_USER")
                .FromTable("role_permission_detail").ForeignColumn("created_by")
                .ToTable("user").PrimaryColumn("id");

            Create.ForeignKey("FK_RPD_UPDATED_BY_USER")
                .FromTable("role_permission_detail").ForeignColumn("updated_by")
                .ToTable("user").PrimaryColumn("id");


            Create.ForeignKey("FK_RPD_MENU_DETAIL_ID")
                .FromTable("role_permission_detail").ForeignColumn("menu_detail_id")
                .ToTable("menu_detail").PrimaryColumn("id");
        }
    }
}
