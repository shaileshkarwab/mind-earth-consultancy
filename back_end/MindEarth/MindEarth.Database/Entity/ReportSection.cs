using System;
using System.Collections.Generic;

namespace MindEarth.Database.Entity;

public partial class ReportSection
{
    public int Id { get; set; }

    public string RowId { get; set; } = null!;

    public int ReportMasterId { get; set; }

    public string SheetName { get; set; } = null!;

    public int? SheetRowId { get; set; }

    public int? ParentId { get; set; }

    public string? Title { get; set; }

    public string? Type { get; set; }

    public string? Content { get; set; }

    public int? Order { get; set; }

    public string? ImageName { get; set; }

    public string? Figure { get; set; }

    public string? ImageTitle { get; set; }

    public DateTime CreatedAt { get; set; }

    public int CreatedBy { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int UpdatedBy { get; set; }

    public virtual Report ReportMaster { get; set; } = null!;
}
