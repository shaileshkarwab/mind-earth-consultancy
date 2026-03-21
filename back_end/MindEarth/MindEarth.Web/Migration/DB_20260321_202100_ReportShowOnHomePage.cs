using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260321202100)]
    public class DB_20260321_202100_ReportShowOnHomePage : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Column("show_on_home_page")
                .OnTable("report")
                .AsBoolean()
                .NotNullable()
                .WithDefaultValue(false);
        }
    }
}
