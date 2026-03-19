namespace MindEarth.Web.Common.Models
{
    public class Filter
    {
        public List<Criteria>? Criteria { get; set; } = null!;
        public List<BoolFilter>? BoolFilters { get; set; } = null!;

        public List<EqualityFilter>? EqualityFilters { get; set; } = null;

        public PageParameter PageParameter { get; set; } = null!;

    }

    public class Criteria
    {
        public string Value { get; set; } = null!;
        public string Entity { get; set; } = null!;
    }

    public class BoolFilter
    {
        public bool Value { get; set; }
        public string Entity { get; set; } = null!;
    }

    public class EqualityFilter
    {
        public string Value { get; set; } = null!;
        public string Entity { get; set; } = null!;
    }

    public class DateFilter
    {
        public DateTime Value { get; set; }
        public string Entity { get; set; } = null!;
    }

    public class PageParameter
    {
        public Int32 PageNo { get; set; }
        public Int32 PageSize { get; set; }
    }
}