import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent {
  commentsArray: any = [];
  loading: boolean = false;
  postID!: string;

  constructor(
    private comService: CommentsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    const params = this.route.snapshot.params;
    if (params && params['id']) {
      this.postID = params['id'];
    }
    this.comService.getComments(this.postID).subscribe((val) => {
      this.commentsArray = val;
    });
  }
}
