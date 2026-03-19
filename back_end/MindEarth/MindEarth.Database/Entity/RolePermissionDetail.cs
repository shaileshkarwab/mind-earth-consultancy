using System;
using System.Collections.Generic;

namespace MindEarth.Database.Entity;

public partial class RolePermissionDetail
{
    public int Id { get; set; }

    public string RowId { get; set; } = null!;

    public int MenuDetailId { get; set; }

    public bool AddRight { get; set; }

    public bool ViewRight { get; set; }

    public bool ModifyRight { get; set; }

    public bool DeleteRight { get; set; }

    public DateTime CreatedAt { get; set; }

    public int CreatedBy { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int UpdatedBy { get; set; }

    public int RoleId { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual MenuDetail MenuDetail { get; set; } = null!;

    public virtual Role Role { get; set; } = null!;

    public virtual User UpdatedByNavigation { get; set; } = null!;
}
