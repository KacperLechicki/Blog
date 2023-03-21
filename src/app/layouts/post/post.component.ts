import { Component, SimpleChanges } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LoadingService } from 'src/app/services/loading.service';
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
    private loadingS: LoadingService,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingS.loadingStart();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.postService.loadData().subscribe((val: any) => {
      this.postArray = val;
      setTimeout(() => {
        this.loading = this.loadingS.loadingStop();
      }, 1000);
    });
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
