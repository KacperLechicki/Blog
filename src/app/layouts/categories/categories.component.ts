import { Component } from '@angular/core';
import {
  DocumentReference,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  public categoryForm!: FormGroup;

  constructor(private fs: AngularFirestore, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
    });
  }

  onSubmit(): void {
    let categoryData = this.categoryForm.value;

    if (this.categoryForm.valid) {
      this.fs
        .collection('categories')
        .add(categoryData)
        .then((docRef: any) => {
          console.log(docRef.id);
        });
      this.categoryForm.reset();
      this.categoryForm.controls['category'].setErrors(null);
    } else {
      console.log('invalid');
    }
  }
}
