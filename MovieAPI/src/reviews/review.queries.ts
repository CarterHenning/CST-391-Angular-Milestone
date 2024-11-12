export const reviewQueries = {
    readReviews: `
        SELECT
            *
        FROM cst_391_milestone.review
        `,
    readReviewsByreviewId: `
        SELECT
            *
        FROM cst_391_milestone.review
        WHERE cst_391_milestone.review.reviewId = ?
    `,
    readReviewsByMovieId: `
        SELECT
            *
        FROM cst_391_milestone.review
        WHERE cst_391_milestone.review.MovieId = ?
    `,
    createReview: `
        INSERT INTO review (Rating, Comment, Date, MovieId, UserId) 
        VALUES (?, ?, ?, ?, ?);
    `,
    updateReview: `
        UPDATE cst_391_milestone.review
        SET Rating = ?, Comment = ?, Date = ?
        WHERE reviewId = ?
    `,
    deleteReview: `
        DELETE FROM cst_391_milestone.review
        WHERE reviewId = ?
    `,
}