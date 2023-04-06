import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'Blog';

  constructor() {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
