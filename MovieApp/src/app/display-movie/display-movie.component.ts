import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieService } from '../service/movie.service'; // Ensure this import is correct
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-display-movie',
  templateUrl: './display-movie.component.html',
  styleUrls: ['./display-movie.component.css']
})
export class DisplayMovieComponent implements OnInit {
  @Input() movie!: Movie;
  @Output() deselectMovieEvent = new EventEmitter<void>();
  reviews: Review[] = [];
  overallRating: number | undefined;
  showAddReview: boolean = false;
  selectedReview: any = null;
  currentUserId: number | null = null;
  selectedMovie: any = null;

  constructor(private service: MovieService, public authService: AuthService) {}

  ngOnInit() {
    this.fetchReviews();

    this.authService.getUserId().subscribe(id => {
      this.currentUserId = id;
    });
  }

  fetchReviews() {
    console.log("Getting data...");
    this.service.getReviewsOfMovie(this.movie.MovieId).subscribe(
      (data: Review[]) => {
        this.reviews = data;
        this.calculateOverallRating();
        console.log(data);
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  calculateOverallRating() {
    if (this.reviews.length > 0) {
      const totalRating = this.reviews.reduce((sum, review) => sum + review.Rating, 0);
      this.overallRating = totalRating / this.reviews.length;
    }
  }

  onReviewAdded() {
    // Handle the review being added, or updated if selectedReview is set
    this.showAddReview = false;
    this.selectedReview = null;
    this.fetchReviews();
  }


  deleteReview(reviewId: number): void {
    this.service.deleteReview(reviewId).subscribe(
      () => {
        this.reviews = this.reviews.filter(review => review.reviewId !== reviewId);
      },
      error => {
        console.error('Error deleting review:', error);
      }
    );
  }

  deselectMovie(): void {
    this.deselectMovieEvent.emit();
  }

}


interface Review {
  reviewId: number;
  Rating: number;
  UserId: number;
  Comment: string;
}
