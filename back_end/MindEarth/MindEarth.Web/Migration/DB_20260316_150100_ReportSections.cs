using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260316150100)]
    public class DB_20260316_150100_ReportSections : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Table("report_section")
                .WithColumn("id").AsInt32().PrimaryKey().NotNullable().Identity()
                .WithColumn("row_id").AsFixedLengthString(26).Unique("UK_REPORT_SECTION_ROW_iD").NotNullable()
                .WithColumn("report_master_id").AsInt32().NotNullable()
                .WithColumn("sheet_name").AsString().NotNullable()
                .WithColumn("sheet_row_id").AsInt32().Nullable()
                .WithColumn("parent_id").AsInt16().Nullable()
                .WithColumn("title").AsString(Int32.MaxValue).Nullable()
                .WithColumn("type").AsString(256).Nullable()
                .WithColumn("content").AsString(Int32.MaxValue).Nullable()
                .WithColumn("order").AsInt32().Nullable()
                .WithColumn("image_name").AsString(256).Nullable()
                .WithColumn("figure").AsString(256).Nullable()
                .WithColumn("image_title").AsString(256).Nullable()
                .WithColumn("created_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("created_by").AsInt32().NotNullable()
                .WithColumn("updated_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("updated_by").AsInt32().NotNullable();

            Create.ForeignKey("FK_REPORT_SECTION_CREATED_BY_USER")
                .FromTable("report_images").ForeignColumn("created_by")
                .ToTable("user").PrimaryColumn("id");

            Create.ForeignKey("FK_REPORT_SECTION_UPDATED_BY_USER")
                .FromTable("report_images").ForeignColumn("updated_by")
                .ToTable("user").PrimaryColumn("id");


            Create.ForeignKey("FK_REPORT_SECTION_REPORT_ID")
                .FromTable("report_section").ForeignColumn("report_master_id")
                .ToTable("report").PrimaryColumn("id");
        }
    }
}
