import { Component } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent {
  postArray: any[] = [];
  loading: boolean = false;

  constructor(
    private postService: PostsService,
    private loadingS: LoadingService,
    private comService: CommentsService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.loading = this.loadingS.loadingStart();
    this.postService.loadData().subscribe((val: any) => {
      this.postArray = val;
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.loading = this.loadingS.loadingStop();
    }, 1000);
  }

  onDelete(postImgPath: any, id: string): void {
    this.loading = this.loadingS.loadingStart();
    setTimeout(() => {
      this.postService.deleteImg(postImgPath, id);
      this.comService.deleteSpecificData(id);
      this.loading = this.loadingS.loadingStop();
    }, 1000);
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
