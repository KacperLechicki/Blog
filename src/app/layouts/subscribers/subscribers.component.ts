import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss'],
})
export class SubscribersComponent {
  categoryArray: any = [];
  categoryVal: string = '';
  formStatus: string = 'Add';
  categoryId!: string;
  loading: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private loadingS: LoadingService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.loading = this.loadingS.loadingStart();
    this.categoriesService.loadData().subscribe((val: any) => {
      this.categoryArray = val;
      setTimeout(() => {
        this.loading = this.loadingS.loadingStop();
      }, 1000);
    });
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
