using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260323140100)]
    public class DB_20260323_140100_ReportChanges : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Column("published_date")
                .OnTable("report")
                .AsDate()
                .Nullable();


            Create.Column("price_in_usd")
                .OnTable("report")
                .AsCurrency()
                .Nullable();
        }
    }
}
