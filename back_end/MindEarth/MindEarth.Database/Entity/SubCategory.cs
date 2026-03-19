using System;
using System.Collections.Generic;

namespace MindEarth.Database.Entity;

public partial class SubCategory
{
    public int Id { get; set; }

    public string RowId { get; set; } = null!;

    public int CategoryId { get; set; }

    public string Name { get; set; } = null!;

    public int SeqNo { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public int CreatedBy { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int UpdatedBy { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<Report> Reports { get; set; } = new List<Report>();

    public virtual User UpdatedByNavigation { get; set; } = null!;
}
