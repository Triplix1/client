export class PaginatedParams {
    pageSize: number;
    pageNumber: number;
    constructor(pageSize: number, pageNumber: number) {
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
    }
}