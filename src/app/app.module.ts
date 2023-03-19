import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { NgxLoadingModule } from 'ngx-loading';
import { CategoryNavComponent } from './layouts/category-nav/category-nav.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PostCardComponent } from './layouts/post-card/post-card.component';
import { SubscriptionFormComponent } from './layouts/subscription-form/subscription-form.component';
import { SinglePostComponent } from './layouts/single-post/single-post.component';
import { CommentFormComponent } from './layouts/comment-form/comment-form.component';

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
    }),
    MatChipsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
