export interface FilmUpdateRequest {
    id: string;
    name: string;
    year: number | null;
    limitation: number | null;
    description: string | null;
    publish: boolean;
    isExpected: boolean;
    file: File | null;
    sources: string[];
    trailer: string;
    genreNames: string[];
}