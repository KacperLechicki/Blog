import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoadingService } from 'src/app/services/loading.service';
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

  constructor(
    private loadingS: LoadingService,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingS.loadingStart();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.route.params.subscribe((data: any) => {
      this.postService.loadOnePost(data['id']).subscribe((post: any) => {
        this.postData = post;
        this.loadSimilarPost(this.postData.category.idID);
      });
      const params = this.route.snapshot.params;
      if (params && params['id']) {
        this.postID = params['id'];
      }
      setTimeout(() => {
        this.loading = this.loadingS.loadingStop();
      }, 2000);
    });
  }

  loadSimilarPost(catID: any) {
    this.postService.loadSimilar(catID).subscribe((val: any) => {
      this.similarPostArray = val;
    });
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
