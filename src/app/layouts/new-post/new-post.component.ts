import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  permalink: string = '';
  categoryArray: any[] = [];
  loading: boolean = false;
  imgSrc: any = './assets/placeholder-img.jpg';
  selectedImg: any = '';
  postForm!: FormGroup;
  submitTry: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private loadingS: LoadingService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingS.loadingStart();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categoriesService.loadData().subscribe((val: any) => {
      this.categoryArray = val;
    });
    this.loading = this.loadingS.loadingStop();

    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      permalink: ['', Validators.required],
      excerpt: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onTitleChange($event: any): void {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview($event: any): void {
    const reader = new FileReader();
    window.scrollTo(0, 0);
    this.loading = this.loadingS.loadingStart();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    };

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];

    setTimeout(() => {
      this.loading = this.loadingS.loadingStop();
    }, 1000);
  }

  onSubmit(): void {
    const formData = this.postForm.value;
    if (this.postForm.valid) {
      console.log(formData);
    } else {
      window.scrollTo(0, 0);
      console.log('invalid');
      this.submitTry = true;
    }
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
