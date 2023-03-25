import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements DoCheck {
  commentsArray: any = [];
  loading: boolean = false;
  postID!: string;
  getComments: any;
  routerEvents: any;
  getCommentsRouter: any;

  constructor(
    private comService: CommentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    const params = this.route.snapshot.params;
    if (params && params['id']) {
      this.postID = params['id'];
    }
    this.getComments = this.comService
      .getComments(this.postID)
      .subscribe((val) => {
        this.commentsArray = val;
      });
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.routerEvents = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const params = this.route.snapshot.params;
        if (params && params['id']) {
          this.postID = params['id'];
        }
        this.getCommentsRouter = this.comService
          .getComments(this.postID)
          .subscribe((val) => {
            this.commentsArray = val;
          });
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
