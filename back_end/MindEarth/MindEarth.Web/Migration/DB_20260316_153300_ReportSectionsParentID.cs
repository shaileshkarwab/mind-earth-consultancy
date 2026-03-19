using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260316153300)]
    public class DB_20260316_153300_ReportSectionsParentID : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("report_section")
                .AlterColumn("parent_id")
                .AsInt32()
                .Nullable();
        }
    }
}
