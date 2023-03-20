import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  DocumentReference,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  categoryArray: any = [];
  categoryVal: string = '';
  formStatus: string = 'Add';
  categoryId!: string;

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

    this.categoriesService.loadData().subscribe((val: any) => {
      console.log(val);
      this.categoryArray = val;
    });
  }

  onSubmit(): void {
    let categoryData: Category = this.categoryForm.value;

    if (
      this.categoryForm.valid &&
      this.categoryForm.controls['category'].value != ''
    ) {
      if (this.formStatus === 'Add') {
        this.categoriesService.saveData(categoryData);
        this.categoryForm.reset();
      } else {
        this.categoriesService.updateData(this.categoryId, categoryData);
        this.formStatus = 'Add';
      }
    } else {
      console.log('invalid');
    }
  }

  onEdit(category: string, id: string): void {
    this.categoryVal = category;
    this.formStatus = 'Update';
    this.categoryId = id;
  }

  onDelete(id: string): void {
    this.categoriesService.deleteData(id);
  }
}
