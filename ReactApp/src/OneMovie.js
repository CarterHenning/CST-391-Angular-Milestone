import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import "./App.css";
import { useAuth } from './AuthContext';
import dataSource from './dataSource';
import { data } from 'react-router-dom';

const OneMovie = (props) => {
  const [overallRating, setOverallRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(null);
  const { user } = useAuth();

  console.log(props.reviews);

  useEffect(() => {
    loadReviews();
  }, [props.reviews]);

  const loadReviews = async () => {
    try {
      const filteredReviews = props.reviews.filter(r => r.MovieId === props.movie.MovieId);
      
      setReviews(filteredReviews);
  
      if (filteredReviews.length > 0) {
        const totalRating = filteredReviews.reduce((sum, review) => sum + review.Rating, 0);
        const averageRating = totalRating / filteredReviews.length;
        setOverallRating(averageRating.toFixed(1));
      } else {
        setOverallRating(0);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  

  const handleOpenModal = (review = null) => {
    setCurrentReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentReview(null);
    setIsModalOpen(false);
  };

  const handleSubmitReview = async (reviewData) => {
    const review = {
      reviewId: reviewData?.reviewId,
      Rating: reviewData.rating,
      Comment: reviewData.comment,
      Date: new Date().getFullYear().toString(),
      MovieId: props.movie.MovieId,
      UserId: user?.userId,
    };

    try {
        if(review.reviewId != null)
        {
          const response = await dataSource.put('/reviews', review);
        }
        else
        {
            const response = await dataSource.post('/reviews', review);
        }
      setIsModalOpen(false);
      props.loadReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };


  const deleteReview = async (reviewId) => {
    try {
      await dataSource.delete(`/reviews/${reviewId}`);
      // Ensure the server-side deletion is completed before updating the UI
      props.loadReviews();
      console.log(props.reviews)
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  


  useEffect(() => {
    loadReviews();
  }, [props.movie.MovieId]);

  return (
    <div className="movie-details">
      <div className="movie-header">
        <img src={props.movie.Image} className="movie-img" alt={props.movie.name} />
        <div className="header-info">
          <h1>{props.movie.Name}</h1>
          <h2 className="director">{props.movie.Director}</h2>
          <h2 className="date">{props.movie.Date}</h2>
          <p className="description">{props.movie.Description}</p>
        </div>
        <h1 className="rating">{overallRating}</h1>
      </div>
      <div>
        <button className="add-button" onClick={handleOpenModal}>
          Add Review
        </button>
      </div>
      {reviews.map((review) => (
        <div key={review.reviewId} className="review-card">
          <h3>{review.Comment}</h3>
          <div>
            <h3>{review.Rating}</h3>
            {review.UserId === user?.userId ? (
                    <div>
                        <button onClick={() => handleOpenModal(review)}>Edit</button>
                        <button onClick={() => deleteReview(review.reviewId)}>Delete</button>
                    </div>
                    ) : null}
            </div>
        </div>
            ))}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitReview}
        review={currentReview}
      />
    </div>
  );
};

export default OneMovie;
