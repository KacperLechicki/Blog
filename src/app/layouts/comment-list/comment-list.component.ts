import { Component } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent {
  commentsArray: any = [];
  loading: boolean = false;

  constructor(
    private loadingS: LoadingService,
    private comService: CommentsService
  ) {}
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.loading = this.loadingS.loadingStart();
    this.comService.loadData().subscribe((val: any) => {
      this.commentsArray = val;
      setTimeout(() => {
        this.loading = this.loadingS.loadingStop();
      }, 1000);
    });
  }
}
