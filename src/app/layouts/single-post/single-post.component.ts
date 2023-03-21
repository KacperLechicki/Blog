import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent {
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

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
