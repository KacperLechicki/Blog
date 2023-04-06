import { Component, Input } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { SingleCategoryComponent } from '../single-category-component/single-category-component.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  loading: boolean = false;

  @Input() postData!: any;

  constructor(
    private postAgent: PostComponent,
    private categoryAgent: SingleCategoryComponent
  ) {}

  ngOnInit(): void {
    this.loading = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.postAgent.loading = false;
      this.categoryAgent.loading = false;
      this.loading = false;
    }, 1000);
  }
}
