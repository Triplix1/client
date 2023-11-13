import { PaginatedParams } from "./paginatedParams";
import { OrderByParams } from "./orderByParams";
import { FilterParams } from "./filterParams";

export class FilmParams extends PaginatedParams {
    filterParams: FilterParams = new FilterParams(null, null, null, null);
}