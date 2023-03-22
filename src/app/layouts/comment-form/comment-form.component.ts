import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { CommentsService } from 'src/app/services/comments.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent {
  commentForm!: FormGroup;
  loading: boolean = false;
  postID!: string;

  constructor(
    private formBuilder: FormBuilder,
    private loadingS: LoadingService,
    private comService: CommentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
      this.loading = this.loadingS.loadingStart();
      this.comService.saveData(comData);
      console.log(this.postID);
      setTimeout(() => {
        this.loading = this.loadingS.loadingStop();
      }, 1000);
      this.commentForm.reset();
    }
  }
}
