using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260228225800)]
    public class DB_20260228_225800_CategorySubCategory : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Table("category")
                .WithColumn("id").AsInt32().PrimaryKey().Identity().NotNullable()
                .WithColumn("row_id").AsFixedLengthString(26).Unique("UK_CATEGORY_ROW_ID").WithDefaultValue(Ulid.NewUlid().ToString()).NotNullable()
                .WithColumn("name").AsString().NotNullable().Unique("UK_CATEGORY_NAME")
                .WithColumn("seq_no").AsInt32().NotNullable().WithDefaultValue(1)
                .WithColumn("is_active").AsBoolean().WithDefaultValue(true).NotNullable()
                .WithColumn("created_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("created_by").AsInt32().NotNullable()
                .WithColumn("updated_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("updated_by").AsInt32().NotNullable();

            Create.ForeignKey("FK_CATEGORY_CREATED_BY_USER")
                .FromTable("category").ForeignColumn("created_by")
                .ToTable("user").PrimaryColumn("id");

            Create.ForeignKey("FK_CATEGORY_UPDATED_BY_USER")
                .FromTable("category").ForeignColumn("updated_by")
                .ToTable("user").PrimaryColumn("id");


            Create.Table("sub_category")
                .WithColumn("id").AsInt32().PrimaryKey().Identity().NotNullable()
                .WithColumn("row_id").AsFixedLengthString(26).Unique("UK_SUB_CATEGORY_ROW_ID").WithDefaultValue(Ulid.NewUlid().ToString()).NotNullable()
                .WithColumn("category_id").AsInt32().NotNullable()
                .WithColumn("name").AsString().NotNullable().Indexed("IDX_SUB_CATEGORY_NAME")
                .WithColumn("seq_no").AsInt32().NotNullable().WithDefaultValue(1)
                .WithColumn("is_active").AsBoolean().WithDefaultValue(true).NotNullable()
                .WithColumn("created_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("created_by").AsInt32().NotNullable()
                .WithColumn("updated_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("updated_by").AsInt32().NotNullable();

            Create.ForeignKey("FK_SUB_CATEGORY_CREATED_BY_USER")
                .FromTable("sub_category").ForeignColumn("created_by")
                .ToTable("user").PrimaryColumn("id");

            Create.ForeignKey("FK_SUB_CATEGORY_UPDATED_BY_USER")
                .FromTable("sub_category").ForeignColumn("updated_by")
                .ToTable("user").PrimaryColumn("id");

            Create.ForeignKey("FK_SUB_CATEGORY_CATEGORY_ID")
                .FromTable("sub_category").ForeignColumn("category_id")
                .ToTable("category").PrimaryColumn("id");


            Create.UniqueConstraint("UK_SUB_CATEGORY_NAME_CATEGORY_ID")
                .OnTable("sub_category").Columns("name", "category_id");    

        }
    }
}
