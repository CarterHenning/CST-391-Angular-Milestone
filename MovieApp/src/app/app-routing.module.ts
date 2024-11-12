import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; // Add RouterModule
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { ListDirectorsComponent } from './list-directors/list-directors.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { DisplayMovieComponent } from './display-movie/display-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { DeleteMovieComponent } from './delete-movie/delete-movie.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'create', component: CreateMovieComponent, canActivate: [AuthGuard] },
  { path: 'list-directors', component: ListDirectorsComponent, canActivate: [AuthGuard] },
  { path: '', component: ListMoviesComponent, canActivate: [AuthGuard] },
  { path: 'display/:id', component: DisplayMovieComponent, canActivate: [AuthGuard] },
  { path: 'edit/:director/:id', component: EditMovieComponent, canActivate: [AuthGuard] },
  { path: 'delete/:director/:id', component: DeleteMovieComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes) // Register routes here
  ],
  exports: [RouterModule] // Export RouterModule so it can be used in AppModule
})
export class AppRoutingModule { }
