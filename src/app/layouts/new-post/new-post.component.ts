import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PostsService } from 'src/app/services/posts.service';

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
  selectedImg!: any;
  postForm!: FormGroup;
  submitTry: boolean = false;
  post: any;
  formStatus: string = 'Add new';
  docID: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private loadingS: LoadingService,
    private formBuilder: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loading = this.loadingS.loadingStart();
    this.route.queryParams.subscribe((val) => {
      this.postService.loadPostToEdit(val['id']).subscribe((post: any) => {
        this.docID = val['id'];
        this.post = post;
        if (this.docID) {
          this.postForm = this.formBuilder.group({
            title: [this.post.title, Validators.required],
            permalink: [this.post.permalink, Validators.required],
            excerpt: [this.post.excerpt, Validators.required],
            category: [
              `${this.post.category.idID}-${this.post.category.category}`,
              Validators.required,
            ],
            image: ['', Validators.required],
            content: [this.post.content, Validators.required],
          });
          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        } else {
          this.postForm = this.formBuilder.group({
            title: ['', Validators.required],
            permalink: ['', Validators.required],
            excerpt: ['', Validators.required],
            category: ['', Validators.required],
            image: ['', Validators.required],
            content: ['', Validators.required],
          });
        }
        setTimeout(() => {
          this.loading = this.loadingS.loadingStop();
        }, 1000);
      });
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    this.loading = this.loadingS.loadingStart();
    this.categoriesService.loadData().subscribe((val: any) => {
      this.categoryArray = val;
      setTimeout(() => {
        this.loading = this.loadingS.loadingStop();
      }, 1000);
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
    let splittedCategory = this.postForm.value.category.split('-');

    const formData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        idID: splittedCategory[0],
        category: splittedCategory[1],
      },
      image: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };

    if (this.postForm.valid) {
      this.postService.uploadImage(
        this.selectedImg,
        formData,
        this.formStatus,
        this.docID
      );

      setTimeout(() => {
        this.imgSrc = './assets/placeholder-img.jpg';
        this.submitTry = false;
      }, 1000);
      this.postForm.reset();
      this.router.navigate(['/allPosts']);
    } else {
      this.submitTry = true;
    }
  }

  moveUp(): void {
    window.scrollTo(0, 0);
  }
}
