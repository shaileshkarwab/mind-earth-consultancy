using System;
using System.Collections.Generic;

namespace MindEarth.Database.Entity;

public partial class Role
{
    public int Id { get; set; }

    public string RowId { get; set; } = null!;

    public string RoleName { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public int CreatedBy { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int UpdatedBy { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<RolePermissionDetail> RolePermissionDetails { get; set; } = new List<RolePermissionDetail>();

    public virtual User UpdatedByNavigation { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
