import { PaginatedParams } from "./paginatedParams";
import { FilterParams } from "./filterParams";

export class FilmParams extends PaginatedParams {
    filterParams: FilterParams = new FilterParams(null, null, null, null);
    showHiddens: boolean | null = null;
}