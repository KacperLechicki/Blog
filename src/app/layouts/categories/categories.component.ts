import { Component } from '@angular/core';
import {
  DocumentReference,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  public categoryForm!: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
    });

    this.categoriesService.loadData().subscribe((val) => {
      console.log(val);
    });
  }

  onSubmit(): void {
    let categoryData: Category = this.categoryForm.value;

    if (
      this.categoryForm.valid &&
      this.categoryForm.controls['category'].value != ''
    ) {
      this.categoriesService.saveData(categoryData);
      this.categoryForm.reset();
      this.categoryForm.controls['category'].setErrors(null);
    } else {
      console.log('invalid');
    }
  }
}
