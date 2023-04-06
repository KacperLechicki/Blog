import { Component } from '@angular/core';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss'],
})
export class SubscribersComponent {
  subscribersArray: any = [];
  loading: boolean = false;
  loadData: any;

  constructor(private subService: SubscribersService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loading = true;
    this.loadData = this.subService.loadData().subscribe((val: any) => {
      this.subscribersArray = val;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    this.loadData.unsubscribe();
  }

  onDelete(id: string): void {
    this.loading = true;
    setTimeout(() => {
      this.subService.deleteData(id);
      this.loading = false;
    }, 1000);
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
