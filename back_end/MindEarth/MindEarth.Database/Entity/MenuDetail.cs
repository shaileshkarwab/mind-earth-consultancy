using System;
using System.Collections.Generic;

namespace MindEarth.Database.Entity;

public partial class MenuDetail
{
    public int Id { get; set; }

    public string RowId { get; set; } = null!;

    public int MenuId { get; set; }

    public string Text { get; set; } = null!;

    public string PageUrl { get; set; } = null!;

    public short SeqNo { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public int CreatedBy { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int UpdatedBy { get; set; }

    public string? FaIcon { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual Menu Menu { get; set; } = null!;

    public virtual ICollection<RolePermissionDetail> RolePermissionDetails { get; set; } = new List<RolePermissionDetail>();

    public virtual User UpdatedByNavigation { get; set; } = null!;
}
