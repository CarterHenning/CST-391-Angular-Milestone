import { Router } from 'express';
import * as ReviewsController from './review.controller';

const router = Router();
router.
    route('/reviews').
    get(ReviewsController.readReviews);

    router.
    route('/reviews/:movieId').
    get(ReviewsController.readReviewsByMovieId);

    router.
    route('/reviews').
    post(ReviewsController.createReview);

    router.
    route('/reviews').
    put(ReviewsController.updateReview);

    router.
    route('/reviews/:id').
    delete(ReviewsController.deleteReview);
    
    export default router;