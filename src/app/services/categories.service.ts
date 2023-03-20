import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category';

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
}
