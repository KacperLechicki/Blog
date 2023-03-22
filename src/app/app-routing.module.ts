import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AllPostsComponent } from './layouts/all-posts/all-posts.component';
import { CategoriesComponent } from './layouts/categories/categories.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { HomeComponent } from './layouts/home/home.component';
import { NewPostComponent } from './layouts/new-post/new-post.component';
import { PostComponent } from './layouts/post/post.component';
import { SingleCategoryComponent } from './layouts/single-category-component/single-category-component.component';
import { SinglePostComponent } from './layouts/single-post/single-post.component';
import { SubscribersComponent } from './layouts/subscribers/subscribers.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostComponent },
  { path: 'singlePost/:id', component: SinglePostComponent },
  { path: 'posts/category/:id', component: SingleCategoryComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'allPosts', component: AllPostsComponent, canActivate: [AuthGuard] },
  {
    path: 'allPosts/new',
    component: NewPostComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'subscribers',
    component: SubscribersComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
