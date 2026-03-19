using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MindEarth.Database.Entity;

public partial class MindEarthContext : DbContext
{
    public MindEarthContext()
    {
    }

    public MindEarthContext(DbContextOptions<MindEarthContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CaseStudyWhitePapper> CaseStudyWhitePappers { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Menu> Menus { get; set; }

    public virtual DbSet<MenuDetail> MenuDetails { get; set; }

    public virtual DbSet<Report> Reports { get; set; }

    public virtual DbSet<ReportImage> ReportImages { get; set; }

    public virtual DbSet<ReportSection> ReportSections { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<RolePermissionDetail> RolePermissionDetails { get; set; }

    public virtual DbSet<SubCategory> SubCategories { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserToken> UserTokens { get; set; }

    public virtual DbSet<VersionInfo> VersionInfos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CaseStudyWhitePapper>(entity =>
        {
            entity.ToTable("case_study_white_papper");

            entity.HasIndex(e => e.RowId, "UK_ROW_ID_FOR_CASE_STUDY_W_P").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.CaseWpDate).HasColumnName("case_wp_date");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.EntityType).HasColumnName("entity_type");
            entity.Property(e => e.ImagePath).HasColumnName("image_path");
            entity.Property(e => e.PdfPath).HasColumnName("pdf_path");
            entity.Property(e => e.RowId)
                .HasMaxLength(26)
                .IsFixedLength()
                .HasColumnName("row_id");
            entity.Property(e => e.Title)
                .HasMaxLength(1000)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.CaseStudyWhitePapperCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CS_WP_SECTION_CREATED_BY_USER");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.CaseStudyWhitePapperUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CS_WP_SECTION_UPDATED_BY_USER");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("category");

            entity.HasIndex(e => e.Name, "UK_CATEGORY_NAME").IsUnique();

            entity.HasIndex(e => e.RowId, "UK_CATEGORY_ROW_ID").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.RowId)
                .HasMaxLength(26)
                .HasDefaultValueSql("'01KJY75JAQQ9WPGSWBZY0F73NM'::bpchar")
                .IsFixedLength()
                .HasColumnName("row_id");
            entity.Property(e => e.SeqNo)
                .HasDefaultValue(1)
                .HasColumnName("seq_no");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.CategoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CATEGORY_CREATED_BY_USER");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.CategoryUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CATEGORY_UPDATED_BY_USER");
        });

        modelBuilder.Entity<Menu>(entity =>
        {
            entity.ToTable("menu");

            entity.HasIndex(e => e.RowId, "UK_MENU_ROW_ID").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Controller).HasColumnName("controller");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.FaIcon)
                .HasMaxLength(100)
                .HasColumnName("fa_icon");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.PageUrl).HasColumnName("page_url");
            entity.Property(e => e.RowId)
                .HasMaxLength(50)
                .IsFixedLength()
                .HasColumnName("row_id");
            entity.Property(e => e.SeqNo).HasColumnName("seq_no");
            entity.Property(e => e.Text).HasColumnName("text");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.MenuCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MENU_CREATED_BY_USER");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.MenuUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MENU_UPDATED_BY_USER");
        });

        modelBuilder.Entity<MenuDetail>(entity =>
        {
            entity.ToTable("menu_detail");

            entity.HasIndex(e => e.RowId, "UK_MENU_DETAIL_ROW_ID").IsUnique();

            entity.HasIndex(e => new { e.Text, e.MenuId }, "UK_MENU_DETAIL_TEXT_MENU_ID").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.FaIcon)
                .HasMaxLength(100)
                .HasColumnName("fa_icon");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.MenuId).HasColumnName("menu_id");
            entity.Property(e => e.PageUrl).HasColumnName("page_url");
            entity.Property(e => e.RowId)
                .HasMaxLength(50)
                .IsFixedLength()
                .HasColumnName("row_id");
            entity.Property(e => e.SeqNo).HasColumnName("seq_no");
            entity.Property(e => e.Text).HasColumnName("text");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.MenuDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MENU_DETAIL_CREATED_BY_USER");

            entity.HasOne(d => d.Menu).WithMany(p => p.MenuDetails)
                .HasForeignKey(d => d.MenuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MENU_DETAIL_MENU_ID");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.MenuDetailUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MENU_DETAIL_UPDATED_BY_USER");
        });

        modelBuilder.Entity<Report>(entity =>
        {
            entity.ToTable("report");

            entity.HasIndex(e => e.ExcelSaveFileName, "UK_REPORT_EXCEL_SAVE_FILE_NAME").IsUnique();

            entity.HasIndex(e => e.RowId, "UK_REPORT_ROW_ID").IsUnique();

            entity.HasIndex(e => e.ReportUrlLink, "UK_REPORT_URL_LINK").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.ExcelFileName)
                .HasMaxLength(255)
                .HasColumnName("excel_file_name");
            entity.Property(e => e.ExcelSaveFileName)
                .HasMaxLength(255)
                .HasColumnName("excel_save_file_name");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.ReportUrlLink).HasColumnName("report_url_link");
            entity.Property(e => e.RowId)
                .HasMaxLength(26)
                .IsFixedLength()
                .HasColumnName("row_id");
            entity.Property(e => e.SubCategoryMasterId).HasColumnName("sub_category_master_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ReportCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_REPORT_CREATED_BY_USER");

            entity.HasOne(d => d.SubCategoryMaster).WithMany(p => p.Reports)
                .HasForeignKey(d => d.SubCategoryMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_REPORT_CATEGORY_SUB_CATEGORY_ID");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.ReportUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_REPORT_UPDATED_BY_USER");
        });

        modelBuilder.Entity<ReportImage>(entity =>
        {
            entity.ToTable("report_images");

            entity.HasIndex(e => e.RowId, "UK_REPORT_IMAGES_ROW_ID").IsUnique();

            entity.HasIndex(e => new { e.ReportMasterId, e.SlideNo }, "UK_REPORT_IMAGE_SLIDE_NO").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.FigureNo).HasColumnName("figure_no");
            entity.Property(e => e.ImageTitle).HasColumnName("image_title");
            entity.Property(e => e.ImageUploadPath).HasColumnName("image_upload_path");
            entity.Property(e => e.ReportMasterId).HasColumnName("report_master_id");
            entity.Property(e => e.RowId)
                .HasMaxLength(26)
                .IsFixedLength()
                .HasColumnName("row_id");
            entity.Property(e => e.SlideNo).HasColumnName("slide_no");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ReportImageCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_REPORT_IMAGE_CREATED_BY_USER");

            entity.HasOne(d => d.ReportMaster).WithMany(p => p.ReportImages)
                .HasForeignKey(d => d.ReportMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_REPORT_IMAGE_REPORT_ID");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.ReportImageUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_REPORT_IMAGE_UPDATED_BY_USER");
        });

        modelBuilder.Entity<ReportSection>(entity =>
        {
            entity.ToTable("report_section");

            entity.HasIndex(e => e.RowId, "UK_REPORT_SECTION_ROW_iD").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.Figure)
                .HasMaxLength(256)
                .HasColumnName("figure");
            entity.Property(e => e.ImageName)
                .HasMaxLength(256)
                .HasColumnName("image_name");
            entity.Property(e => e.ImageTitle)
                .HasMaxLength(256)
                .HasColumnName("image_title");
            entity.Property(e => e.Order).HasColumnName("order");
            entity.Property(e => e.ParentId).HasColumnName("parent_id");
            entity.Property(e => e.ReportMasterId).HasColumnName("report_master_id");
            entity.Property(e => e.RowId)
                .HasMaxLength(26)
                .IsFixedLength()
                .HasColumnName("row_id");
            entity.Property(e => e.SheetName).HasColumnName("sheet_name");
            entity.Property(e => e.SheetRowId).HasColumnName("sheet_row_id");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.Type)
                .HasMaxLength(256)
                .HasColumnName("type");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

            entity.HasOne(d => d.ReportMaster).WithMany(p => p.ReportSections)
                .HasForeignKey(d => d.ReportMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_REPORT_SECTION_REPORT_ID");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("role");

            entity.HasIndex(e => e.RowId, "UK_ROLE_ID").IsUnique();

            entity.HasIndex(e => e.RoleName, "UK_ROLE_NAME").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.RoleName).HasColumnName("role_name");
            entity.Property(e => e.RowId)
                .HasMaxLength(30)
                .IsFixedLength()
                .HasColumnName("row_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RoleCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ROLE_CREATED_BY_USER");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.RoleUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ROLE_UPDATED_BY_USER");
        });

        modelBuilder.Entity<RolePermissionDetail>(entity =>
        {
            entity.ToTable("role_permission_detail");

            entity.HasIndex(e => e.RowId, "UK_ROLE_PERMISSION_DETAIL_ROW_ID").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.AddRight).HasColumnName("add_right");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.DeleteRight).HasColumnName("delete_right");
            entity.Property(e => e.MenuDetailId).HasColumnName("menu_detail_id");
            entity.Property(e => e.ModifyRight).HasColumnName("modify_right");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.RowId)
                .HasMaxLength(26)
                .IsFixedLength()
                .HasColumnName("row_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
            entity.Property(e => e.ViewRight).HasColumnName("view_right");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RolePermissionDetailCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RPD_CREATED_BY_USER");

            entity.HasOne(d => d.MenuDetail).WithMany(p => p.RolePermissionDetails)
                .HasForeignKey(d => d.MenuDetailId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RPD_MENU_DETAIL_ID");

            entity.HasOne(d => d.Role).WithMany(p => p.RolePermissionDetails)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ROLE_ROLE_DETAIL_ID");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.RolePermissionDetailUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RPD_UPDATED_BY_USER");
        });

        modelBuilder.Entity<SubCategory>(entity =>
        {
            entity.ToTable("sub_category");

            entity.HasIndex(e => e.Name, "IDX_SUB_CATEGORY_NAME");

            entity.HasIndex(e => new { e.Name, e.CategoryId }, "UK_SUB_CATEGORY_NAME_CATEGORY_ID").IsUnique();

            entity.HasIndex(e => e.RowId, "UK_SUB_CATEGORY_ROW_ID").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.RowId)
                .HasMaxLength(26)
                .HasDefaultValueSql("'01KJY75JAR077TDVJ9JNWRXW1M'::bpchar")
                .IsFixedLength()
                .HasColumnName("row_id");
            entity.Property(e => e.SeqNo)
                .HasDefaultValue(1)
                .HasColumnName("seq_no");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

            entity.HasOne(d => d.Category).WithMany(p => p.SubCategories)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SUB_CATEGORY_CATEGORY_ID");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.SubCategoryCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SUB_CATEGORY_CREATED_BY_USER");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.SubCategoryUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SUB_CATEGORY_UPDATED_BY_USER");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("user");

            entity.HasIndex(e => e.Email, "UK_USER_EMAIL").IsUnique();

            entity.HasIndex(e => e.RowId, "UK_USER_ROW_ID").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.FirstName).HasColumnName("first_name");
            entity.Property(e => e.ImagePath)
                .HasDefaultValueSql("'default-user.png'::text")
                .HasColumnName("image_path");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(false)
                .HasColumnName("is_active");
            entity.Property(e => e.LastName).HasColumnName("last_name");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.RowId)
                .HasMaxLength(26)
                .HasDefaultValueSql("'01KJY75J08YDGFYNC35WWTMWHN'::bpchar")
                .IsFixedLength()
                .HasColumnName("row_id");
            entity.Property(e => e.Salt)
                .HasDefaultValueSql("'fb9dbc8a-6df3-4dda-9bfa-4b8c8a3a0b42'::text")
                .HasColumnName("salt");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_USER_ROLE_ID_ROLE");
        });

        modelBuilder.Entity<UserToken>(entity =>
        {
            entity.ToTable("user_tokens");

            entity.HasIndex(e => e.RowId, "UK_USER_TOKENS_ROW_ID").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(now() AT TIME ZONE 'UTC'::text)")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.HashedRefreshToken).HasColumnName("hashed_refresh_token");
            entity.Property(e => e.IsRevoked)
                .HasDefaultValue(false)
                .HasColumnName("is_revoked");
            entity.Property(e => e.ReplacedByToken).HasColumnName("replaced_by_token");
            entity.Property(e => e.RevokedAt)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("revoked_at");
            entity.Property(e => e.RowId)
                .HasMaxLength(26)
                .HasDefaultValueSql("'01KJY75J91FPXQYDFW8QERVZEZ'::bpchar")
                .IsFixedLength()
                .HasColumnName("row_id");
            entity.Property(e => e.TokenExpiry)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("token_expiry");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.UserTokens)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_USER_TOKENS_USER_ID");
        });

        modelBuilder.Entity<VersionInfo>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("VersionInfo");

            entity.HasIndex(e => e.Version, "UC_Version").IsUnique();

            entity.Property(e => e.AppliedOn).HasColumnType("timestamp without time zone");
            entity.Property(e => e.Description).HasMaxLength(1024);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
