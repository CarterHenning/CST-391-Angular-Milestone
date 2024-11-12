import { Request, RequestHandler, Response } from "express";
import { Review } from './review.model';
import * as ReviewDao from './review.dao';
import { OkPacket } from 'mysql';

export const readReviews: RequestHandler = async (req: Request, res: Response) => {
    try {
        let reviews;
        req.url
        let reviewId = parseInt(req.query.reviewId as string);

        console.log('reviewId', reviewId);
        if (Number.isNaN(reviewId)) {
            reviews = await ReviewDao.readReviews();
        } else {
            reviews = await ReviewDao.readReviewsByreviewId(reviewId);
        }


        res.status(200).json(
            reviews
        );
    } catch (error) {
        console.error('[reviews.controller][readReviews][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching reviews'
        });
    }
};

export const readReviewsByMovieId: RequestHandler = async (req: Request, res: Response) => {

    let MovieId = parseInt(req.params.movieId);

    if (isNaN(MovieId)) {
        return res.status(400).json({
            message: 'Invalid MovieId provided'
        });
    }

    try {
        const reviews = await ReviewDao.readReviewsByMovieId(MovieId);

        res.status(200).json(reviews);
    } catch (error) {
        console.error('[reviews.controller][readReviewsByMovie][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching reviews'
        });
    }
};


export const createReview: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await ReviewDao.createReview(req.body);

        console.log('req.body', req.body);

        console.log('review', okPacket);


        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[reviews.controller][readReviews][Error]', error);
        res.status(500).json({
            message: 'There was an error when writing reviews'
        });
    }
};

export const updateReview: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('Controller start')
        const okPacket: OkPacket = await ReviewDao.updateReview(req.body);

        console.log('req.body', req.body);

        console.log('review', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[reviews.controller][readReviews][Error]', error);
        res.status(500).json({
            message: 'There was an error when updating reviews'
        });
    }
};

export const deleteReview: RequestHandler = async (req: Request, res: Response) => {
    try {
        let reviewId = parseInt(req.params.id as string);

        console.log('reviewId', reviewId);
        if (!Number.isNaN(reviewId)) {
            const response = await ReviewDao.deleteReview(reviewId);

            res.status(200).json(response);
        } else {
            throw new Error("Integer expected for reviewId");
        }
    } catch (error) {
        console.error('[reviews.controller][deleteReview][Error]', error);
        res.status(500).json({
            message: 'There was an error when deleting the review'
        });
    }
};
