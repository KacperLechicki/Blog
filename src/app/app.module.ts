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

import { NgxLoadingModule } from 'ngx-loading';
import { CategoryNavComponent } from './layouts/category-nav/category-nav.component';
import { FooterComponent } from './layouts/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    CategoryNavComponent,
    FooterComponent,
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
    MatChipsModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
