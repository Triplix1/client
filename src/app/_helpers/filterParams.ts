import { OrderByParams } from "./orderByParams";

export class FilterParams {
    year: number | null = null;
    genre: string | null = null;
    orderBy: OrderByParams | null = null;
    expected: boolean | null = null;

    constructor(year: number | null, genre: string | null, orderBy: OrderByParams | null, expected: boolean | null) {
        this.year = year;
        this.genre = genre;
        this.orderBy = orderBy;
    }
}