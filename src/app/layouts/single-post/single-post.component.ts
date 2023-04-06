import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent {
  loading: boolean = false;
  postData: any;
  similarPostArray: any[] = [];
  postID!: string;
  routerParams: any;
  similarSub!: Subscription;

  @ViewChild('commentlist') commentList: any;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    window.scrollTo(0, 0);
    this.routerParams = this.route.params.subscribe((data: any) => {
      this.postService.loadOnePost(data['id']).subscribe((post: any) => {
        this.postData = post;
        this.loadSimilarPost(this.postData.category.idID);
      });
    });

    const params = this.route.snapshot.params;
    if (params && params['id']) {
      this.postID = params['id'];
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    this.routerParams.unsubscribe();
    this.similarSub.unsubscribe();
  }

  loadSimilarPost(catID: any) {
    this.similarSub = this.postService
      .loadSimilar(catID)
      .subscribe((val: any) => {
        this.similarPostArray = val;
      });
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
