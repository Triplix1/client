export interface FilmAddRequest {
    name: string;
    year: number;
    limitation: number;
    description: string;
    publish: boolean;
    isExpected: boolean;
    file: File;
    sources: string[];
    trailer: string;
    genreNames: string[];
}