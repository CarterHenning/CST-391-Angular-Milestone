import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Director } from '../models/director.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { User } from '../models/user.model'

@Injectable({ providedIn: 'root' }) // This service is available throughout the application
export class MovieService {

  private host = "http://localhost:5000"

  constructor(private http: HttpClient) {}

  public getDirectors(callback: (directors: Director[]) => void): void  {
    this.http.get<Director[]>(this.host + "/directors").
      subscribe((directors: Director[]) => {
        callback(directors);
      });

  }

  // Method to retrieve all movies
  public getMovies(callback: (movies: Movie[]) => void): void {
    this.http.get<Movie[]>(this.host + "/movies").
      subscribe((movies: Movie[]) => {
        callback(movies);
      });

  }

  // Method to retrieve movies by a specific director
  public getMoviesOfDirector(directorName: String, callback: (movies: Movie[]) => void): void {

    const requestUrl = `${this.host}/movies/${directorName}`;
    this.http.get<Movie[]>(requestUrl)
        .subscribe((movies: Movie[]) => {
            callback(movies);
        });
  }


  public createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.host + "/movies", movie);
  }

  public updateMovie(movie: Movie, callback: () => void): void {
      this.http.put<Movie>(this.host + "/movies", movie)
          .subscribe((data) => {
              callback();
          });
  }

  public deleteMovie(id: number, callback: () => void): void {
      this.http.delete(this.host + "/movies/" + id)
          .subscribe((data) => {
              callback();
          });
  }

  public getReviewsOfMovie(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.host}/reviews/${movieId}`);
  }

  public createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.host + "/reviews", review);
  }

  public updateReview(review: Review): Observable<Review> {

    return this.http.put<Review>(this.host + "/reviews", review);
  }

  public deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.host}/reviews/${reviewId}`);
  }

  public loginUser(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    var data = this.http.post<any>(`${this.host}/login`, loginData);
    return data
  }
}
