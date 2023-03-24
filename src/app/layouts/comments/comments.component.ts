import { Component } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  commentsArray: any = [];
  loading: boolean = false;

  constructor(
    private comService: CommentsService
  ) {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.loading = true;
    this.comService.loadData().subscribe((val: any) => {
      this.commentsArray = val;
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onDelete(id: string): void {
    window.scrollTo(0, 0);
    this.loading = true;
    setTimeout(() => {
      this.comService.deleteData(id);
      this.loading = false;
    }, 1000);
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
