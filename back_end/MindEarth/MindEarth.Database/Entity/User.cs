using System;
using System.Collections.Generic;

namespace MindEarth.Database.Entity;

public partial class User
{
    public int Id { get; set; }

    public string RowId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public string Password { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public int CreatedBy { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int UpdatedBy { get; set; }

    public int RoleId { get; set; }

    public string ImagePath { get; set; } = null!;

    public virtual ICollection<CaseStudyWhitePapper> CaseStudyWhitePapperCreatedByNavigations { get; set; } = new List<CaseStudyWhitePapper>();

    public virtual ICollection<CaseStudyWhitePapper> CaseStudyWhitePapperUpdatedByNavigations { get; set; } = new List<CaseStudyWhitePapper>();

    public virtual ICollection<Category> CategoryCreatedByNavigations { get; set; } = new List<Category>();

    public virtual ICollection<Category> CategoryUpdatedByNavigations { get; set; } = new List<Category>();

    public virtual ICollection<Menu> MenuCreatedByNavigations { get; set; } = new List<Menu>();

    public virtual ICollection<MenuDetail> MenuDetailCreatedByNavigations { get; set; } = new List<MenuDetail>();

    public virtual ICollection<MenuDetail> MenuDetailUpdatedByNavigations { get; set; } = new List<MenuDetail>();

    public virtual ICollection<Menu> MenuUpdatedByNavigations { get; set; } = new List<Menu>();

    public virtual ICollection<Report> ReportCreatedByNavigations { get; set; } = new List<Report>();

    public virtual ICollection<ReportImage> ReportImageCreatedByNavigations { get; set; } = new List<ReportImage>();

    public virtual ICollection<ReportImage> ReportImageUpdatedByNavigations { get; set; } = new List<ReportImage>();

    public virtual ICollection<Report> ReportUpdatedByNavigations { get; set; } = new List<Report>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<Role> RoleCreatedByNavigations { get; set; } = new List<Role>();

    public virtual ICollection<RolePermissionDetail> RolePermissionDetailCreatedByNavigations { get; set; } = new List<RolePermissionDetail>();

    public virtual ICollection<RolePermissionDetail> RolePermissionDetailUpdatedByNavigations { get; set; } = new List<RolePermissionDetail>();

    public virtual ICollection<Role> RoleUpdatedByNavigations { get; set; } = new List<Role>();

    public virtual ICollection<SubCategory> SubCategoryCreatedByNavigations { get; set; } = new List<SubCategory>();

    public virtual ICollection<SubCategory> SubCategoryUpdatedByNavigations { get; set; } = new List<SubCategory>();

    public virtual ICollection<UserToken> UserTokens { get; set; } = new List<UserToken>();
}
