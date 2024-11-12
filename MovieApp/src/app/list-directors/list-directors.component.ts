import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { Director } from '../models/director.model';

@Component({
  selector: 'app-list-directors',
  templateUrl: './list-directors.component.html',
  styleUrls: ['./list-directors.component.css'],

})
export class ListDirectorsComponent {

  selectedDirector: Director | null = null;

  directors: Director[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: MovieService
  ) {}

  ngOnInit() {
    this.service.getDirectors((directors: Director[]) => {
      this.directors = directors;
    })

  }

  onSelectDirector(director: Director) {

    this.selectedDirector = director;

  }
}
