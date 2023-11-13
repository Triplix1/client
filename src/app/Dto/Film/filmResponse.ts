export interface FilmResponse {
    id: string;
    name: string;
    year: number | null;
    limitation: number | null;
    description: string | null;
    publish: boolean;
    isExpected: boolean;
    photoUrl: string | null;
    sources: string[];
    trailer: string;
    genreNames: string[];
}