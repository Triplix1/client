import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../../Core/services/account.service';
import { CommentService } from '../../../Core/services/comment.service';
import { CommentResponse } from '../../../Models/Comment/commentResponse';
import { User } from '../../../Models/User/user';
import { AuthorizationUseDeepLinkingService } from '../../../Core/services/authorization-use-deep-linking.service';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { CommentParams } from '../../../Core/helpers/commentParams';
import { formatDate } from '@angular/common';
import { CanComponentDeactivate } from 'src/app/Core/guards/can-deactivate.guard';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss', '../../../Shared/styles/items-list.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input({ required: true }) filmId: string = '';
  @Output() canLeave: EventEmitter<boolean> = new EventEmitter<boolean>();
  comments: CommentResponse[] = [];
  currentUser: User | null = null;
  commentParams: CommentParams = new CommentParams(this.filmId, 5, 1);
  commentEditingId: string | null = null;
  possibleLoadMore: boolean = false;
  isAdmin: boolean = false;
  commentForm: FormGroup = this.fb.group({
    comment: ['',]
  });
  commentEditForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]]
  });
  authorizationUseDeepLinkingService: AuthorizationUseDeepLinkingService = new AuthorizationUseDeepLinkingService(this.router, this.route, this.urlSerializer);
  private subscriptions: Subscription[] = []


  get commentLength() {
    const d = this.commentForm.get("comment")?.value as string;
    return d.length;
  }

  constructor(private accountService: AccountService,
    private fb: FormBuilder,
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute,
    private urlSerializer: UrlSerializer,
    @Inject(LOCALE_ID) private locale: string) { }


  ngOnInit(): void {
    this.accountService.isCurrentUserAdmin().pipe(take(1)).subscribe(isAdmin => this.isAdmin = isAdmin ?? false);
    this.commentParams = new CommentParams(this.filmId, 5, 1);

    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.currentUser = user);

    const comment = localStorage.getItem("comment");

    if (comment) {
      this.commentForm.get("comment")?.setValue(comment);
      localStorage.removeItem("comment");
    }

    this.subscriptions.push(this.commentForm.valueChanges.subscribe(
      v => this.canLeave.emit(false)
    ));

    this.subscriptions.push(this.commentEditForm.valueChanges.subscribe(
      v => this.canLeave.emit(false)
    ));

    this.loadComments();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  convertDate(date: Date) {
    return formatDate(date, "short", this.locale);
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
    this.canLeave.emit(true);
  }

  publishComment() {
    const commentText = this.commentForm.controls["comment"].value as string;
    if (this.currentUser) {
      this.commentService.postComment({ filmId: this.filmId, text: commentText }).subscribe(
        response => {
          this.comments = [response, ...this.comments];
          this.commentForm.controls["comment"].setValue("");
          this.canLeave.emit(true);
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
        response => {
          this.comments[this.comments.indexOf(comment)] = response;
          this.canLeave.emit(true);
          this.commentEditingId = null;
        }
      )
    }
  }
}
