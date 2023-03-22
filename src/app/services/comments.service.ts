import { AngularFirestore } from '@angular/fire/compat/firestore';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from '../models/subscriber';
import { DocumentData } from '@firebase/firestore-types';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private fs: AngularFirestore, private toastr: ToastrService) {}

  saveData(data: Comment): void {
    this.fs
      .collection('comments')
      .add(data)
      .then(() => {
        this.toastr.success('Comment added successfully');
      })
      .catch((err: any) => {
        this.toastr.error(err);
      });
  }

  loadData(): any {
    return this.fs
      .collection('comments')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Comment[];
            const id = a.payload.doc as QueryDocumentSnapshot<DocumentData>;
            const idID = id.id;
            return { idID, data };
          });
        })
      );
  }

  deleteData(id: string): void {
    this.fs
      .collection('comments')
      .doc(id)
      .delete()
      .then(() => {
        this.toastr.success('Data deleted successfully');
      });
  }
}
