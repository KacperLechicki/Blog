import { Component } from '@angular/core';
import {
  DocumentReference,
  AngularFirestore,
} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  constructor(private fs: AngularFirestore) {}

  formCategoryName_value: string = '';

  onSubmit(formData: any): void {
    let categoryData = {
      name: formData.value.category,
      description: '',
    };

    this.fs
      .collection('categories')
      .add(categoryData)
      .then((docRef: any) => {
        console.log(docRef.id);
      });
  }
}
