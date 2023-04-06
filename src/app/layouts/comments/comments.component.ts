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
  loadData: any;

  constructor(private comService: CommentsService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loading = true;
    this.loadData = this.comService.loadData().subscribe((val: any) => {
      this.commentsArray = val;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.loadData.unsubscribe();
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
