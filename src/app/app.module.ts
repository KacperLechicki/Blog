import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './layouts/home/home.component';
import { PostComponent } from './layouts/post/post.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { ToastrModule } from 'ngx-toastr';

import { NgxLoadingModule } from 'ngx-loading';
import { CategoryNavComponent } from './layouts/category-nav/category-nav.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PostCardComponent } from './layouts/post-card/post-card.component';
import { SubscriptionFormComponent } from './layouts/subscription-form/subscription-form.component';
import { SinglePostComponent } from './layouts/single-post/single-post.component';
import { CommentFormComponent } from './layouts/comment-form/comment-form.component';
import { CommentListComponent } from './layouts/comment-list/comment-list.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { CategoriesComponent } from './layouts/categories/categories.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AllPostsComponent } from './layouts/all-posts/all-posts.component';
import { NewPostComponent } from './layouts/new-post/new-post.component';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './auth/login/login.component';
import { SingleCategoryComponent } from './layouts/single-category-component/single-category-component.component';
import { SubscribersComponent } from './layouts/subscribers/subscribers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    CategoryNavComponent,
    FooterComponent,
    PostCardComponent,
    SubscriptionFormComponent,
    SinglePostComponent,
    CommentFormComponent,
    CommentListComponent,
    DashboardComponent,
    CategoriesComponent,
    AllPostsComponent,
    NewPostComponent,
    LoginComponent,
    SingleCategoryComponent,
    SubscribersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgxLoadingModule.forRoot({
      primaryColour: 'hsl(224, 67%, 63%)',
      secondaryColour: 'hsl(224, 67%, 63%)',
      tertiaryColour: 'hsl(224, 67%, 63%)',
      backdropBackgroundColour: 'transparent',
    }),
    MatChipsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    ToastrModule.forRoot({ timeOut: 3000, preventDuplicates: true }),
    MatSelectModule,
    HttpClientModule,
    AngularEditorModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
