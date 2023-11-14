import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommentService } from '../_services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input({ required: true }) filmId: string | undefined
  commentForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService,
    private fb: FormBuilder, private commentService: CommentService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.commentForm = this.fb.group({
      comment: ['',]
    });
  }

  publishComment() {

  }
}
