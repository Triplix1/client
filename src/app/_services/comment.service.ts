import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentAddRequest } from '../Dto/Comment/commentAddRequest';
import { Constants } from '../Constants/Constants';
import { CommentResponse } from '../Dto/Comment/commentResponse';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  localUrl: string = "comments/";

  constructor(private httpClient: HttpClient) { }

  postComment(commentAddRequest: CommentAddRequest) {
    return this.httpClient.post<CommentResponse>(Constants.baseApiUrl + this.localUrl + "create", commentAddRequest);
  }

  getComments() {
    return this.httpClient.get<CommentResponse[]>(Constants.baseApiUrl + this.localUrl);
  }

  updateComment(commentUpdateRequest: Comment) {
    return this.httpClient.put<CommentResponse>(Constants.baseApiUrl + this.localUrl + "edit", commentUpdateRequest);
  }
}
