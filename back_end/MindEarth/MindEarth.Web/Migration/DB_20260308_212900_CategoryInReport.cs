using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260308212900)]
    public class DB_20260308_212900_CategoryInReport : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("report")
                .AddColumn("sub_category_master_id").AsInt32().NotNullable();

            Create.ForeignKey("FK_REPORT_CATEGORY_SUB_CATEGORY_ID")
                .FromTable("report").ForeignColumn("sub_category_master_id")
                .ToTable("sub_category").PrimaryColumn("id");
        }
    }
}
