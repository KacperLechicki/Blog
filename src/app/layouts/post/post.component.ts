import { Component, SimpleChanges } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  constructor(private AppCIntance: AppComponent) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.AppCIntance.loading = false;
  }
}
