export interface CommentResponse {
    id: string;
    filmId: string;
    userNickname: string;
    created: Date;
    text: string;
    userPhotoUrl: string | null;
}