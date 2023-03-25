import { Component } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent {
  postArray: any[] = [];
  loading: boolean = false;
  loadData: any;

  constructor(
    private postService: PostsService,
    private comService: CommentsService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.loading = true;
    this.loadData = this.postService.loadData().subscribe((val: any) => {
      this.postArray = val;
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.loadData.unsubscribe();
  }

  onDelete(postImgPath: any, id: string): void {
    this.loading = true;
    setTimeout(() => {
      this.postService.deleteImg(postImgPath, id);
      this.comService.deleteSpecificData(id);
      this.loading = false;
    }, 1000);
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
