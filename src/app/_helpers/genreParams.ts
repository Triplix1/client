import { PaginatedParams } from "./paginatedParams";

export class GenreParams extends PaginatedParams {
    constructor(pageSize: number, pageNumber: number) {
        super(pageSize, pageNumber);
    }
}