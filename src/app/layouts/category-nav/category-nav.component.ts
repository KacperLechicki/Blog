import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-nav',
  templateUrl: './category-nav.component.html',
  styleUrls: ['./category-nav.component.scss'],
})
export class CategoryNavComponent {
  categoryArray: any[] = [];
  loading: boolean = false;
  loadData: any;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadData = this.categoriesService.loadData().subscribe((val: any) => {
      this.categoryArray = val;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.loadData.unsubscribe();
  }
}
