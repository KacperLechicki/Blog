import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private loadingS: LoadingService,
    private comService: CommentsService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.commentForm = this.formBuilder.group({
      name: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  onSubmit(): void {
    let comData: Comment = {
      name: this.commentForm.value.name,
      comment: this.commentForm.value.comment,
      createdAt: new Date(),
    };
    if (this.commentForm.valid) {
      window.scrollTo(0, 0);
      this.loading = this.loadingS.loadingStart();
      this.comService.saveData(comData);
      setTimeout(() => {
        this.loading = this.loadingS.loadingStop();
      }, 1000);
      this.commentForm.reset();
    }
  }
}
