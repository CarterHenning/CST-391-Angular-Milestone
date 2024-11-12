import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  movie: Movie = {
    MovieId: 0,
    Name: "",
    Director: "",
    Description: "",
    Date: "",
    Image: "",
  };

  wasSubmitted: boolean = false;

  constructor(private service: MovieService) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {

    // Call createMovie and subscribe to handle the response
    this.service.createMovie(this.movie).subscribe(
      response => {

        this.wasSubmitted = true;
      },
      error => {
        console.error("Error creating movie", error);
      }
    );
  }
}
