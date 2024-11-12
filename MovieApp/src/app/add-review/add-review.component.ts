import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Review } from '../models/review.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {

  @Input() review: Review = { MovieId: 0, UserId: 1, Rating: 0, Comment: '', reviewId: 0, Date: '' };
  @Input() movieId!: number;
  @Input() currentUserId!: number;
  @Output() reviewAdded: EventEmitter<void> = new EventEmitter();

  comment: string = '';
  rating: number = 0;
  ngOnInit() {
    // Ensure review is initialized if not passed in as input
    if (!this.review) {
      this.review = { MovieId: 0, UserId: 1, Rating: 0, Comment: '', reviewId: 0, Date: '' }; // Initialize to default review
    }

    // Pre-populate form fields if a review is provided
    if (this.review.reviewId !== 0) {
      this.comment = this.review.Comment;
      this.rating = this.review.Rating;
    }

    this.review.MovieId = this.movieId;
    this.review.UserId = this.currentUserId;
  }

  constructor(private movieService: MovieService) {}


  onSubmit(): void {

    if (this.movieId && this.rating && this.comment) {
      const reviewData: Review = {
        MovieId: this.movieId,
        UserId: this.currentUserId,
        Rating: this.rating,
        Comment: this.comment,
        reviewId: this.review.reviewId || 0,  // Use reviewId if exists, otherwise 0 (for new review)
        Date: new Date().getFullYear().toString()
      };

      // Check if reviewId exists (update or create review)
      if (this.review.reviewId) {
        this.movieService.updateReview(reviewData).subscribe(
          () => {
            this.reviewAdded.emit();
            this.resetForm();
          },
          (error) => {
            console.error('Error updating review:', error);
          }
        );
      } else {
        this.movieService.createReview(reviewData).subscribe(
          () => {
            // Notify parent that review was added`
            this.reviewAdded.emit();
            // Reset form after submission
            this.resetForm();
          },
          (error) => {
            console.error('Error adding review:', error);
          }
        );
      }
    }
  }

  // Reset form fields
  private resetForm(): void {
    this.comment = '';
    this.rating = 0;
    this.review = { MovieId: this.movieId, UserId: this.currentUserId, Rating: 0, Comment: '', reviewId: 0, Date: '' };  // Reset review to default
  }
}
