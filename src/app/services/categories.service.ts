import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
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
      .then(() => {
        this.toastr.success('Category added successfully');
      })
      .catch((err: any) => {
        this.toastr.error(err);
      });
  }

  loadData(): any {
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

  updateData(id: string, editData: any): void {
    this.fs
      .collection('categories')
      .doc(id)
      .update(editData)
      .then(() => {
        this.toastr.success('Data updated successfully');
      });
  }

  deleteData(id: string): void {
    this.fs
      .collection('categories')
      .doc(id)
      .delete()
      .then(() => {
        this.toastr.success('Data deleted successfully');
      });
  }
}
