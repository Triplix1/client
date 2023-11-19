export interface FilmAddRequest {
    name: string;
    year: number | null;
    limitation: number | null;
    description: string | null;
    publish: boolean;
    isExpected: boolean;
    file: File | null;
    sourceNames: string[] | null;
    trailer: string;
    genreNames: string[];
}