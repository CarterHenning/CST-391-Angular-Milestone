import { OkPacket } from "mysql";
import { execute } from "../services/mysql.connector";
import { Review } from "./review.model";
import {reviewQueries } from './review.queries';

export const readReviews = async () => {
    return execute<Review[]>(reviewQueries.readReviews, []);
};

export const readReviewsByreviewId = async (reviewId: number) => {
    return execute<Review[]>(reviewQueries.readReviewsByreviewId, [reviewId]);
};

export const readReviewsByMovieId = async (MovieId: number) => {
    return execute<Review[]>(reviewQueries.readReviewsByMovieId, [MovieId]);
};

export const createReview = async (review: Review) => {
    return execute<OkPacket>(reviewQueries.createReview,
        [review.Rating, review.Comment, review.Date, review.MovieId, review.UserId]);
};

export const updateReview = async (review: Review) => {
    return execute<OkPacket>(reviewQueries.updateReview,
        [review.Rating, review.Comment, review.Date, review.reviewId,]);
};

export const deleteReview = async (reviewId: number) => {
    return execute<OkPacket>(reviewQueries.deleteReview, [reviewId]);
};