using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260320152000)]
    public class DB_20260320_152000_SEOTitleAndDesc : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Column("report_key_words")
                .OnTable("report")
                .AsString(1000)
                .Nullable();

            Create.Column("report_web_page_title")
                .OnTable("report")
                .AsString(1000)
                .Nullable();
        }
    }
}
