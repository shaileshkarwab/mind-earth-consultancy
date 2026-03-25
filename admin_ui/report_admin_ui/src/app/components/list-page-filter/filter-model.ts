export interface FilterModel {
  rows?: Row[]
}

export interface Row {
  columns?: Column[]
}

export interface Column {
  colSize?: string
  fields?: Field[]
}

export interface Field {
  type?: string
  label?: string
  name?: string
  class?: string
  placeHolder?:string;
  serviceName?:string;
  filter?:string;
  datafilter?:Datafilter;
}

export interface Datafilter{
  entity?:string;
  fieldName?:string;
  range?:string;
}
