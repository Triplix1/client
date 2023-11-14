import { PaginatedParams } from "./paginatedParams";

export class CommentParams extends PaginatedParams {
    filmId: string;
    constructor(filmId: string, pageSize: number, pageNumber: number) {
        super(pageSize, pageNumber);
        this.filmId = filmId;
    }
}