import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentAddRequest } from '../../Models/Comment/commentAddRequest';
import { Constants } from '../constants/Constants';
import { CommentResponse } from '../../Models/Comment/commentResponse';
import { CommentParams } from '../helpers/commentParams';
import { PaginationService } from './pagination.service';
import { CommentUpdateRequest } from '../../Models/Comment/commentUpdateRequest';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  localUrl: string = "comments/";

  constructor(private httpClient: HttpClient, private paginationService: PaginationService) { }

  getComments(commentParams: CommentParams) {
    const params = this.getCommentHeaders(commentParams);

    return this.paginationService.getPaginatedResult<CommentResponse[]>(Constants.baseApiUrl + this.localUrl, params, this.httpClient);
  }

  private getCommentHeaders(commentParams: CommentParams) {
    let params = new HttpParams();
    params = this.paginationService.includePaginationHeaders(commentParams, params);
    params = params.append("filmId", commentParams.filmId);
    return params;
  }

  postComment(commentAddRequest: CommentAddRequest) {
    return this.httpClient.post<CommentResponse>(Constants.baseApiUrl + this.localUrl + "create", commentAddRequest);
  }

  updateComment(commentUpdateRequest: CommentUpdateRequest) {
    return this.httpClient.put<CommentResponse>(Constants.baseApiUrl + this.localUrl + "edit", commentUpdateRequest);
  }

  deleteComment(commentId: string) {
    return this.httpClient.delete(Constants.baseApiUrl + this.localUrl + "delete/" + commentId);
  }
}
