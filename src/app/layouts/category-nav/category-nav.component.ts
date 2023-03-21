import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-category-nav',
  templateUrl: './category-nav.component.html',
  styleUrls: ['./category-nav.component.scss'],
})
export class CategoryNavComponent {
  categoryArray: any[] = [];
  loading: boolean = false;

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
}
