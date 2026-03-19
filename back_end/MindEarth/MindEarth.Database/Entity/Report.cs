using System;
using System.Collections.Generic;

namespace MindEarth.Database.Entity;

public partial class Report
{
    public int Id { get; set; }

    public string RowId { get; set; } = null!;

    public string ExcelFileName { get; set; } = null!;

    public string ExcelSaveFileName { get; set; } = null!;

    public string ReportUrlLink { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public int CreatedBy { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int UpdatedBy { get; set; }

    public int SubCategoryMasterId { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<ReportImage> ReportImages { get; set; } = new List<ReportImage>();

    public virtual ICollection<ReportSection> ReportSections { get; set; } = new List<ReportSection>();

    public virtual SubCategory SubCategoryMaster { get; set; } = null!;

    public virtual User UpdatedByNavigation { get; set; } = null!;
}
