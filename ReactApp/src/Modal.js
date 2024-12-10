import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, onSubmit, review  }) => {
  const [newReview, setNewReview] = useState({});


  useEffect(() => {
    if (review) {
      setNewReview({ comment: review.Comment || '', rating: review.Rating || 0, reviewId: review.reviewId });
    } else {
      setNewReview({ comment: '', rating: 0 });
    }
  }, [review, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(newReview);
      setNewReview({ comment: '', rating: 0 });
    }
  };

  

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Review</h2>
        <label>
          Comment:
          <input
            name="comment"
            value={newReview.comment}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rating
        </label>
          <input
            type="number"
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
            min="1"
            max="10"
          />
        
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
