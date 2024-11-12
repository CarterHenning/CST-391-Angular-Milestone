import { Component, Input } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Director } from '../models/director.model';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.css',
})
export class ListMoviesComponent {
  constructor(private service: MovieService) {}

  @Input() director!: Director;
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;

  ngOnInit() {
    this.service.getMovies((movies: Movie[]) => {
      this.movies = movies;

    })
  }

  public onSelectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  deselectMovie(): void {
    this.selectedMovie = null;
  }
}
