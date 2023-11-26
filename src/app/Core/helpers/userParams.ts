import { PaginatedParams } from "./paginatedParams";

export class UserParams extends PaginatedParams {
    admin: boolean = false;
    constructor(pageSize: number, pageNumber: number, admin = false) {
        super(pageSize, pageNumber);
        this.admin = admin;
    }
}