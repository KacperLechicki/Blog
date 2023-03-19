import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { PostComponent } from './layouts/post/post.component';
import { SinglePostComponent } from './layouts/single-post/single-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostComponent },
  { path: 'singlePost', component: SinglePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
