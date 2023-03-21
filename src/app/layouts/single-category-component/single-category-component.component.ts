import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category-component',
  templateUrl: './single-category-component.component.html',
  styleUrls: ['./single-category-component.component.scss'],
})
export class SingleCategoryComponent {
  postArray: any[] = [];
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private loadingS: LoadingService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loading = this.loadingS.loadingStart();
    this.route.params.subscribe((val) => {
      console.log(val);
      this.postService.loadCategoryPosts(val['id']).subscribe((post: any) => {
        console.log(post);
        this.postArray = post;
      });
      setTimeout(() => {
        this.loading = this.loadingS.loadingStop();
      }, 1000);
    });
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
