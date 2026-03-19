export interface Filter {
    criteria?: Criteria[] | null;
    boolFilters?: BoolFilter[] | null;
    equalityFilters?: EqualityFilter[] | null;
    pageParameter: PageParameter;
}

export interface Criteria {
    value: string;
    entity: string;
}

export interface BoolFilter {
    value: boolean;
    entity: string;
}

export interface EqualityFilter {
    value: string;
    entity: string;
}

export interface DateFilter {
    value: string;
    entity: string;
}

export interface PageParameter {
    pageNo: number;
    pageSize: number;
}