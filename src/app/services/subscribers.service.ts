import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from '../models/subscriber';
import { DocumentData } from '@firebase/firestore-types';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private fs: AngularFirestore, private toastr: ToastrService) {}

  saveData(data: Subscriber): void {
    this.fs
      .collection('subscribers')
      .add(data)
      .then(() => {
        this.toastr.success('Subscriber added successfully');
      })
      .catch((err: any) => {
        this.toastr.error(err);
      });
  }

  loadData(): any {
    return this.fs
      .collection('subscribers')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Subscriber[];
            const id = a.payload.doc as QueryDocumentSnapshot<DocumentData>;
            const idID = id.id;
            return { idID, data };
          });
        })
      );
  }

  deleteData(id: string): void {
    this.fs
      .collection('subscribers')
      .doc(id)
      .delete()
      .then(() => {
        this.toastr.success('Data deleted successfully');
      });
  }
}
