export interface Filter {
    criteria?: Criteria[] | null;
    boolFilters?: BoolFilter[] | null;
    equalityFilters?: EqualityFilter[] | null;
    pageParameter: PageParameter;
    integerRangeFilters?: IntegerRangeFilters[] | null;
    dateFilters?: DateFilter[] | null;
}

export interface Criteria {
    value: string;
    entity: string;
}

export interface BoolFilter {
    value: boolean;
    entity: string;
    filterColumn?: string;
}

export interface EqualityFilter {
    value: string;
    entity: string;
    filterColumn: string;
}

export interface DateFilter {
    value: string;
    entity: string;
    filterColumn: string;
    rangeType?: string;
}

export interface PageParameter {
    pageNo: number;
    pageSize: number;
}

export interface IntegerRangeFilters {
    value: string;
    entity: string;
    filterColumn: string;
    rangeType?: string;
}

export interface Datafilter {

}