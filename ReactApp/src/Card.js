import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const Card = (props) => {
    
    const handleButtonClick = (event, uri) => {
        props.onClick(props.movieId, uri);
    }

    return (
        <div className='card' style={{width: '18rem' }} onClick={() => handleButtonClick(props.movieId, '/show/')}>
            <img src={props.imgURL} className='card-img-top' alt="Test Name" />
            <div className='card-body'>
                <h5 className='card-title'>{props.name}</h5>
                <p>{props.director}</p>
            </div>
        </div>

    )
}

export default Card;