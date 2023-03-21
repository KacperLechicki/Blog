import { Component, SimpleChanges } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  loading: boolean = false;

  constructor(private loadingS: LoadingService) {
    this.loading = this.loadingS.loadingStart();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.loading = this.loadingS.loadingStop();
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
