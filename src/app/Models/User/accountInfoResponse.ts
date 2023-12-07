import { FilmCardResponse } from "../Film/FilmCardResponse";

export interface AccountInfoResponse {
    id: string;
    nickname: string;
    email: string;
    photoUrl: string | null;
    subscribedTo: FilmCardResponse[];
}