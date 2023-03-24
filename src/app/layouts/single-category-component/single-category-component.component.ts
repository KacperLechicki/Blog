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

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((val) => {
      this.postService.loadCategoryPosts(val['id']).subscribe((post: any) => {
        this.postArray = post;
      });
    });
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
