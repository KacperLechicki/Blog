import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  DocumentReference,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { LoadingService } from 'src/app/services/loading.service';

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
  loading: boolean = false;
  submitTry: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private loadingS: LoadingService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.loading = this.loadingS.loadingStart();

    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
    });

    this.categoriesService.loadData().subscribe((val: any) => {
      this.categoryArray = val;
      setTimeout(() => {
        this.loading = this.loadingS.loadingStop();
      }, 1000);
    });
  }

  onSubmit(): void {
    let categoryData: Category = this.categoryForm.value;

    if (
      this.categoryForm.valid &&
      this.categoryForm.controls['category'].value != ''
    ) {
      window.scrollTo(0, 0);
      if (this.formStatus === 'Add') {
        this.loading = this.loadingS.loadingStart();
        setTimeout(() => {
          this.categoriesService.saveData(categoryData);
          this.submitTry = false;
          this.loading = this.loadingS.loadingStop();
        }, 1000);
        this.categoryForm.reset();
      } else {
        this.loading = this.loadingS.loadingStart();
        this.formStatus = 'Add';
        setTimeout(() => {
          this.categoriesService.updateData(this.categoryId, categoryData);
          this.submitTry = false;
          this.loading = this.loadingS.loadingStop();
        }, 1000);
        this.categoryForm.reset();
      }
    } else {
      this.submitTry = true;
      console.log('invalid');
    }
  }

  onEdit(category: string, id: string): void {
    this.categoryVal = category;
    this.formStatus = 'Update';
    this.categoryId = id;
  }

  onDelete(id: string): void {
    window.scrollTo(0, 0);
    this.loading = this.loadingS.loadingStart();
    setTimeout(() => {
      this.categoriesService.deleteData(id);
      this.loading = this.loadingS.loadingStop();
    }, 1000);
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
