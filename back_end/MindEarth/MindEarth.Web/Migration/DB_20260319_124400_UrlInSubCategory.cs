using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260319124400)]
    public class DB_20260319_124400_UrlInSubCategory : AutoReversingMigration
    {
        public override void Up()
        {
            Alter.Table("sub_category")
                .AddColumn("sub_category_list_url")
                .AsString()
                .Nullable()
                .Unique("UK_SUB_CATEGORY_LIST_URL");
        }
    }
}
