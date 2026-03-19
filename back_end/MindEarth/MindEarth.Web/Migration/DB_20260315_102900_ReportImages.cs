using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260315102901)]
    public class DB_20260315_102900_ReportImages : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Table("report_images")
                .WithColumn("id").AsInt32().PrimaryKey().NotNullable().Identity()
                .WithColumn("row_id").AsFixedLengthString(26).Unique("UK_REPORT_IMAGES_ROW_ID").NotNullable()
                .WithColumn("report_master_id").AsInt32().NotNullable()
                .WithColumn("slide_no").AsString().NotNullable()
                .WithColumn("figure_no").AsString().NotNullable()
                .WithColumn("image_title").AsString().NotNullable()
                .WithColumn("image_upload_path").AsString().Nullable()
                .WithColumn("created_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("created_by").AsInt32().NotNullable()
                .WithColumn("updated_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("updated_by").AsInt32().NotNullable();

            Create.ForeignKey("FK_REPORT_IMAGE_CREATED_BY_USER")
                .FromTable("report_images").ForeignColumn("created_by")
                .ToTable("user").PrimaryColumn("id");

            Create.ForeignKey("FK_REPORT_IMAGE_UPDATED_BY_USER")
                .FromTable("report_images").ForeignColumn("updated_by")
                .ToTable("user").PrimaryColumn("id");


            Create.ForeignKey("FK_REPORT_IMAGE_REPORT_ID")
                .FromTable("report_images").ForeignColumn("report_master_id")
                .ToTable("report").PrimaryColumn("id");


            Create.UniqueConstraint("UK_REPORT_IMAGE_SLIDE_NO")
                .OnTable("report_images")
                .Columns("report_master_id", "slide_no");

        }
    }
}
