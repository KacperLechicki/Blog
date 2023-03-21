import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  loading: boolean = false;

  constructor(private loadingS: LoadingService) {}

  ngOnInit(): void {
    this.loading = this.loadingS.loadingStart();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.loading = this.loadingS.loadingStop();
    }, 1000);
  }
}
