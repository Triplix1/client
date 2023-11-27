import { OrderByParams } from "./orderByParams";

export class FilterParams {
    year: number | null = null;
    genre: string | null = null;
    expected: boolean | null = null;
    orderByParams: OrderByParams | null = null;
    search: string | null = null;

    constructor(year: number | null = null, genre: string | null = null, orderBy: OrderByParams | null = null, expected: boolean | null = null, search: string | null = null) {
        this.year = year;
        this.genre = genre;
        this.orderByParams = orderBy;
        this.expected = expected;
        this.search = search;
    }
}