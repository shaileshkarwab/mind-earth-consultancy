namespace MindEarth.Web.Common.Models
{
    public class Filter
    {
        public List<Criteria>? Criteria { get; set; } = null!;
        public List<BoolFilter>? BoolFilters { get; set; } = null!;

        public List<EqualityFilter>? EqualityFilters { get; set; } = null;

        public PageParameter PageParameter { get; set; } = null!;

        public List<DateFilter>? DateFilters { get; set; } = null;

        public List<NumberRageFilter<Int32>>? IntegerRangeFilters { get; set; } = null;

    }

    public class Criteria
    {
        public string Value { get; set; } = null!;
        public string Entity { get; set; } = null!;
        public string FilterColumn { get; set; } = string.Empty;
    }


    public class BaseFilter{
        public string Entity { get; set; } = string.Empty;
        public string FilterColumn { get; set; } = string.Empty;
    }

    public class BoolFilter : BaseFilter
    {
        public bool Value { get; set; }
    }

    public class EqualityFilter : BaseFilter
    {
        public string Value { get; set; } = null!;
    }

    public class DateFilter : BaseFilter
    {
        public string RangeType { get; set; }
        public string Value { get; set; }
    }

    public class PageParameter
    {
        public Int32 PageNo { get; set; }
        public Int32 PageSize { get; set; }
    }

    public class NumberRageFilter<T> : BaseFilter
    {
        public string RangeType { get; set; }
        public T Value { get; set; }
    }
}