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

  constructor(
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categoriesService.loadData().subscribe((val: any) => {
      this.categoryArray = val;
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
