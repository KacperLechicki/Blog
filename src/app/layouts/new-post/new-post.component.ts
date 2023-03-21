import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  onTitleChange($event: any) {
    console.log($event);
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
