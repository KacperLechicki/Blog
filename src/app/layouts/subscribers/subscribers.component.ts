import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss'],
})
export class SubscribersComponent {
  subscribersArray: any = [];
  loading: boolean = false;

  constructor(
    private subService: SubscribersService,
    private loadingS: LoadingService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.loading = this.loadingS.loadingStart();
    this.subService.loadData().subscribe((val: any) => {
      this.subscribersArray = val;
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.loading = this.loadingS.loadingStop();
    }, 2000);
  }

  onDelete(id:string):void {
    this.loading = this.loadingS.loadingStart();
    setTimeout(() => {
      this.subService.deleteData(id);
      this.loading = this.loadingS.loadingStop();
    }, 1000);
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
