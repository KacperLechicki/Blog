import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category-component',
  templateUrl: './single-category-component.component.html',
  styleUrls: ['./single-category-component.component.scss'],
})
export class SingleCategoryComponent {
  postArray: any[] = [];
  loading: boolean = false;
  routerParams: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.routerParams = this.route.params.subscribe((val) => {
      this.postService.loadCategoryPosts(val['id']).subscribe((post: any) => {
        this.postArray = post;
      });
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    this.routerParams.unsubscribe();
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
