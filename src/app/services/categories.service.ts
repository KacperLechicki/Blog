import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';
import { DocumentData } from '@firebase/firestore-types';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private fs: AngularFirestore, private toastr: ToastrService) {}

  saveData(data: Category): void {
    this.fs
      .collection('categories')
      .add(data)
      .then((docRef: any) => {
        this.toastr.success('Category added successfully');
        console.log(docRef.id);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  loadData() {
    return this.fs
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Category[];
            const id = a.payload.doc as QueryDocumentSnapshot<DocumentData>;
            const idID = id.id;
            return { idID, data };
          });
        })
      );
  }
}
