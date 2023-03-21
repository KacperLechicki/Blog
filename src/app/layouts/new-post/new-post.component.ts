import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  permalink: string = '';
  categoryArray: any[] = [];
  loading: boolean = false;
  imgSrc: any = './assets/placeholder-img.jpg';
  selectedImg: any = '';

  constructor(
    private categoriesService: CategoriesService,
    private loadingS: LoadingService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingS.loadingStart();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categoriesService.loadData().subscribe((val: any) => {
      this.categoryArray = val;
    });
    this.loading = this.loadingS.loadingStop();
  }

  onTitleChange($event: any): void {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview($event: any): void {
    const reader = new FileReader();
    window.scrollTo(0, 0);
    this.loading = this.loadingS.loadingStart();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    };

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];

    setTimeout(() => {
      this.loading = this.loadingS.loadingStop();
    }, 1000);
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
