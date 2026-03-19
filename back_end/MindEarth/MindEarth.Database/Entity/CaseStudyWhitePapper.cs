using System;
using System.Collections.Generic;

namespace MindEarth.Database.Entity;

public partial class CaseStudyWhitePapper
{
    public int Id { get; set; }

    public string RowId { get; set; } = null!;

    public short EntityType { get; set; }

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateOnly CaseWpDate { get; set; }

    public string ImagePath { get; set; } = null!;

    public string PdfPath { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public int CreatedBy { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int UpdatedBy { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual User UpdatedByNavigation { get; set; } = null!;
}
