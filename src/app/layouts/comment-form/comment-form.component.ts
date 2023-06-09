import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent {
  commentForm!: FormGroup;
  loading: boolean = false;
  postID!: string;

  @ViewChild('comment') commentComponent: any;

  constructor(
    private formBuilder: FormBuilder,
    private comService: CommentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      name: ['', Validators.required],
      comment: ['', Validators.required],
    });

    const params = this.route.snapshot.params;
    if (params && params['id']) {
      this.postID = params['id'];
    }
  }

  onSubmit(): void {
    let comData: Comment = {
      name: this.commentForm.value.name,
      comment: this.commentForm.value.comment,
      createdAt: new Date(),
      postID: this.postID
    };
    if (this.commentForm.valid) {
      this.loading = true;
      this.comService.saveData(comData);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      this.commentForm.reset();
      this.commentComponent.reload();
    }
  }
}
