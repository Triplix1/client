import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommentService } from '../_services/comment.service';
import { CommentResponse } from '../Dto/Comment/commentResponse';
import { User } from '../_models/user';
import { AuthorizationUseDeepLinkingService } from '../_services/authorization-use-deep-linking.service';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { CommentParams } from '../_helpers/commentParams';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input({ required: true }) filmId: string = ''
  commentForm: FormGroup = new FormGroup({});
  comments: CommentResponse[] = [];
  currentUser: User | null = null;
  commentParams: CommentParams = new CommentParams(this.filmId, 5, 1);
  commentEditingId: string | null = null;
  possibleLoadMore: boolean = false;
  commentEditForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]]
  });
  authorizationUseDeepLinkingService: AuthorizationUseDeepLinkingService = new AuthorizationUseDeepLinkingService(this.router, this.route, this.urlSerializer);

  get commentLength() {
    const d = this.commentForm.get("comment")?.value as string;
    return d.length;
  }

  convertDate(date: Date) {
    return formatDate(date, "short", this.locale);
  }

  constructor(private accountService: AccountService,
    private fb: FormBuilder,
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute,
    private urlSerializer: UrlSerializer,
    @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void {
    this.commentParams = new CommentParams(this.filmId, 5, 1);
    this.initializeForm();

    this.accountService.currentUser$.subscribe(user => this.currentUser = user);

    const comment = localStorage.getItem("comment");

    if (comment) {
      this.commentForm.get("comment")?.setValue(comment);
      localStorage.removeItem("comment");
    }

    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments(this.commentParams).subscribe(
      response => {
        if (response.items && response.currentPage && response.pageSize && response.totalCount) {
          this.possibleLoadMore = (response.currentPage * response.pageSize) < response.totalCount;
          this.comments = [...this.comments, ...response.items];
        }
      }
    );
    this.commentParams.pageNumber += 1;
  }

  initializeForm() {
    this.commentForm = this.fb.group({
      comment: ['',]
    });
  }

  getFormControl(controlName: string) {
    return this.commentForm.get(controlName) as FormControl;
  }

  setEditMode(commentId: string) {
    const comment = this.comments.find(c => c.id === commentId);
    if (comment) {
      this.commentEditingId = commentId;
      this.commentEditForm.controls['text'].setValue(comment.text);
    }

  }

  cancelEditingMode() {
    this.commentEditingId = null;
    this.commentEditForm.controls['text'].setValue('');
  }

  publishComment() {
    const commentText = this.commentForm.controls["comment"].value as string;

    if (this.currentUser) {
      this.commentService.postComment({ filmId: this.filmId, text: commentText }).subscribe(
        response => {
          this.comments = [response, ...this.comments];
          this.commentForm.controls["comment"].setValue("");
        }
      );
    }
    else {
      localStorage.setItem('comment', commentText);
      this.authorizationUseDeepLinkingService.navigateToLogin()
    }
  }

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe(
      _ => this.comments = this.comments.filter(c => c.id !== commentId)
    );
  }

  editComment(comment: CommentResponse) {
    const text = this.commentEditForm.controls['text'].value;

    if (this.commentEditForm.valid && text) {
      this.commentService.updateComment({ id: comment.id, text: text }).subscribe(
        response => this.comments[this.comments.indexOf(comment)] = response
      )
      this.commentEditingId = null;
    }
  }
}
