export interface FilmUpdateRequest {
    id: string;
    name: string;
    year: number | null;
    limitation: number | null;
    description: string | null;
    publish: boolean;
    isExpected: boolean;
    file: File | null;
    sourceNames: string[];
    trailer: string;
    genreNames: string[];
}