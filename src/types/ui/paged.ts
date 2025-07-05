export interface Paged<T> {
  content: T[];
  last: boolean;
  pageable: pageableType;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: sortType;
  empty: boolean;
}

export type pageableType = {
  pageNumber: number;
  pageSize: number;
  sort: sortType;
  offset: number;
  unpaged: boolean;
  paged: boolean;
};

export type sortType = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};
