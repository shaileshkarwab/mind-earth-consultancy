using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260319170500)]
    public class DB_20260319_170500_ReportChanges : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Column("report_title")
                 .OnTable("report")
                 .AsString(1000)
                 .Nullable();

            Create.Column("report_desc")
                 .OnTable("report")
                 .AsString(Int32.MaxValue)
                 .Nullable();

            Create.Column("report_web_image")
                 .OnTable("report")
                 .AsString(256)
                 .Nullable();
        }
    }
}
