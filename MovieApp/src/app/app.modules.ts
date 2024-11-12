import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListDirectorsComponent } from './list-directors/list-directors.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { DisplayMovieComponent } from './display-movie/display-movie.component';
import { AppRoutingModule } from './app-routing.module';
import { AddReviewComponent } from './add-review/add-review.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ListDirectorsComponent,
    ListMoviesComponent,
    CreateMovieComponent,
    DisplayMovieComponent,
    AddReviewComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
