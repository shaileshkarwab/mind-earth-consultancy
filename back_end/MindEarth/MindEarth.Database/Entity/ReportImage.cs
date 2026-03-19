using System;
using System.Collections.Generic;

namespace MindEarth.Database.Entity;

public partial class ReportImage
{
    public int Id { get; set; }

    public string RowId { get; set; } = null!;

    public int ReportMasterId { get; set; }

    public string SlideNo { get; set; } = null!;

    public string FigureNo { get; set; } = null!;

    public string ImageTitle { get; set; } = null!;

    public string? ImageUploadPath { get; set; }

    public DateTime CreatedAt { get; set; }

    public int CreatedBy { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int UpdatedBy { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual Report ReportMaster { get; set; } = null!;

    public virtual User UpdatedByNavigation { get; set; } = null!;
}
