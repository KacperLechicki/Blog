import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  loading: boolean = false;
  submitTry: boolean = false;
  loadData: any;

  @ViewChild('categoryFormAd') categoryComponent: any;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loading = true;

    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
    });

    this.loadData = this.categoriesService.loadData().subscribe((val: any) => {
      this.categoryArray = val;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.loadData.unsubscribe();
  }

  onSubmit(): void {
    let categoryData: Category = this.categoryForm.value;

    if (
      this.categoryForm.valid &&
      this.categoryForm.controls['category'].value != ''
    ) {
      window.scrollTo(0, 0);
      if (this.formStatus === 'Add') {
        this.loading = true;
        setTimeout(() => {
          this.categoriesService.saveData(categoryData);
          this.submitTry = false;
          this.loading = false;
        }, 1000);
        this.categoryForm.reset();
        this.categoryComponent.reload();
      } else {
        this.loading = true;
        this.formStatus = 'Add';
        setTimeout(() => {
          this.categoriesService.updateData(this.categoryId, categoryData);
          this.submitTry = false;
          this.loading = false;
        }, 1000);
        this.categoryForm.reset();
        this.categoryComponent.reload();
      }
    } else {
      this.submitTry = true;
    }
  }

  onEdit(category: string, id: string): void {
    this.categoryVal = category;
    this.formStatus = 'Update';
    this.categoryId = id;
  }

  onDelete(id: string): void {
    window.scrollTo(0, 0);
    this.loading = true;
    setTimeout(() => {
      this.categoriesService.deleteData(id);
      this.loading = false;
    }, 1000);
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
