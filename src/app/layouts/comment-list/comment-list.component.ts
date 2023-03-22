import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
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
  postID!: string;

  constructor(
    private loadingS: LoadingService,
    private comService: CommentsService,
    private route: ActivatedRoute,
    private fs: AngularFirestore
  ) {}
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.loading = this.loadingS.loadingStart();
    const params = this.route.snapshot.params;
    if (params && params['id']) {
      this.postID = params['id'];
      console.log(this.postID);
    }
    this.comService.getComments(this.postID).subscribe(val => {
      console.log(val);
      this.commentsArray = val;
    })

    console.log(this.commentsArray);
  }
}
