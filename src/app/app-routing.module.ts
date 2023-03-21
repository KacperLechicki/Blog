import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AllPostsComponent } from './layouts/all-posts/all-posts.component';
import { CategoriesComponent } from './layouts/categories/categories.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { HomeComponent } from './layouts/home/home.component';
import { NewPostComponent } from './layouts/new-post/new-post.component';
import { PostComponent } from './layouts/post/post.component';
import { SinglePostComponent } from './layouts/single-post/single-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostComponent },
  { path: 'singlePost', component: SinglePostComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'allPosts', component: AllPostsComponent },
  { path: 'allPosts/new', component: NewPostComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
