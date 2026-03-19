using System;
using System.Collections.Generic;

namespace MindEarth.Database.Entity;

public partial class UserToken
{
    public int Id { get; set; }

    public string RowId { get; set; } = null!;

    public int UserId { get; set; }

    public string HashedRefreshToken { get; set; } = null!;

    public DateTime TokenExpiry { get; set; }

    public DateTime CreatedAt { get; set; }

    public bool IsRevoked { get; set; }

    public DateTime? RevokedAt { get; set; }

    public string? ReplacedByToken { get; set; }

    public virtual User User { get; set; } = null!;
}
