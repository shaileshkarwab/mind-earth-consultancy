using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260308204300)]
    public class DB_20260308_204300_Report : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Table("report")
                .WithColumn("id").AsInt32().Nullable().PrimaryKey().Identity()
                .WithColumn("row_id").AsFixedLengthString(26).NotNullable().Unique("UK_REPORT_ROW_ID")
                .WithColumn("excel_file_name").AsString(255).NotNullable()
                .WithColumn("excel_save_file_name").AsString(255).NotNullable().Unique("UK_REPORT_EXCEL_SAVE_FILE_NAME")
                .WithColumn("report_url_link").AsString().NotNullable().Unique("UK_REPORT_URL_LINK")
                .WithColumn("is_active").AsBoolean().NotNullable().WithDefaultValue(true)
                .WithColumn("created_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("created_by").AsInt32().NotNullable()
                .WithColumn("updated_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("updated_by").AsInt32().NotNullable();

            Create.ForeignKey("FK_REPORT_CREATED_BY_USER")
                .FromTable("report").ForeignColumn("created_by")
                .ToTable("user").PrimaryColumn("id");

            Create.ForeignKey("FK_REPORT_UPDATED_BY_USER")
                .FromTable("report").ForeignColumn("updated_by")
                .ToTable("user").PrimaryColumn("id");

        }
    }
}
