import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent {
  constructor(private AppCAd: AppComponent) {
    this.AppCAd.loading = true;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);

    setTimeout(() => {
      this.AppCAd.loading = false;
    }, 1000);
  }
}
