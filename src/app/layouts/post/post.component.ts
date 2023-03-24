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

  constructor(
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.postService.loadData().subscribe((val: any) => {
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

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
