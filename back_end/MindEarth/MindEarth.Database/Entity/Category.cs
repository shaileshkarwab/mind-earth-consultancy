using System;
using System.Collections.Generic;

namespace MindEarth.Database.Entity;

public partial class Category
{
    public int Id { get; set; }

    public string RowId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int SeqNo { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public int CreatedBy { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int UpdatedBy { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<SubCategory> SubCategories { get; set; } = new List<SubCategory>();

    public virtual User UpdatedByNavigation { get; set; } = null!;
}
