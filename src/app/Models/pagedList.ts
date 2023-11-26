export interface PagedList<T> extends Array<T> {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}