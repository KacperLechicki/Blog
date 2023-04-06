import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  loading: boolean = false;
  postArray: any[] = [];
  loadData: any;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.loading = true;
    window.scrollTo(0, 0);
    this.loadData = this.postService.loadData().subscribe((val: any) => {
      this.postArray = val;
    });
  }

  ngOnDestroy(): void {
    this.loadData.unsubscribe();
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
