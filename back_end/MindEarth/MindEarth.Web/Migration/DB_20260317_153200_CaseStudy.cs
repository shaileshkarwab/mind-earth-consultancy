using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260317153200)]
    public class DB_20260317_153200_CaseStudy : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Table("case_study_white_papper")
                .WithColumn("id").AsInt32().PrimaryKey().NotNullable().Identity()
                .WithColumn("row_id").AsFixedLengthString(26).Unique("UK_ROW_ID_FOR_CASE_STUDY_W_P").NotNullable()
                .WithColumn("entity_type").AsInt16().NotNullable()
                .WithColumn("title").AsString(1000).NotNullable()
                .WithColumn("content").AsString(Int32.MaxValue).NotNullable()
                .WithColumn("case_wp_date").AsDate().NotNullable()
                .WithColumn("image_path").AsString().NotNullable()
                .WithColumn("pdf_path").AsString().NotNullable()
                .WithColumn("created_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("created_by").AsInt32().NotNullable()
                .WithColumn("updated_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("updated_by").AsInt32().NotNullable();

            Create.ForeignKey("FK_CS_WP_SECTION_CREATED_BY_USER")
                .FromTable("case_study_white_papper").ForeignColumn("created_by")
                .ToTable("user").PrimaryColumn("id");

            Create.ForeignKey("FK_CS_WP_SECTION_UPDATED_BY_USER")
                .FromTable("case_study_white_papper").ForeignColumn("updated_by")
                .ToTable("user").PrimaryColumn("id");
        }
    }
}
