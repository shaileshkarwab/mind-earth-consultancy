using FluentMigrator;

namespace MindEarth.Web.Migration
{
    [Migration(20260221123900)]
    public class DB_20260221_123900_UserTokens : AutoReversingMigration
    {
        public override void Up()
        {
            Create.Table("user_tokens")
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("row_id").AsFixedLengthString(26).Unique("UK_USER_TOKENS_ROW_ID").WithDefaultValue(Ulid.NewUlid().ToString()).NotNullable()
                .WithColumn("user_id").AsInt32().NotNullable()
                .WithColumn("hashed_refresh_token").AsString().NotNullable()
                .WithColumn("token_expiry").AsDateTime().NotNullable()
                .WithColumn("created_at").AsDateTime().WithDefault(SystemMethods.CurrentUTCDateTime).NotNullable()
                .WithColumn("is_revoked").AsBoolean().WithDefaultValue(false).NotNullable()
                .WithColumn("revoked_at").AsDateTime().Nullable()
                .WithColumn("replaced_by_token").AsString().Nullable();

            Create.ForeignKey("FK_USER_TOKENS_USER_ID")
                .FromTable("user_tokens").ForeignColumn("user_id")
                .ToTable("user").PrimaryColumn("id");
        }
    }
}
