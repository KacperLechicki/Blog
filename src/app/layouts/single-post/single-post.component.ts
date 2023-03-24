import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
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
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.loading = false;
    }, 2000);
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
