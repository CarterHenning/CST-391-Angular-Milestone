import React, { useEffect } from 'react';
import Card from "./Card";
import { useAuth } from './AuthContext';
import "./App.css";
import { useNavigate } from "react-router-dom";


const Home = (props) => {
  
  const { logout } = useAuth();
  const { user } = useAuth();

  const navigator = useNavigate();

  useEffect(() => {
    // Trigger reloading the movies
    props.loadMovies();
  }, []);
  

  const handleSelection = (movieId, uri) => {
      props.selectMovie(movieId, navigator, uri);
  };

  
  const movies = props.moviesList.map((movie) => {
    return (
        <Card
          key={movie.MovieId}
          movieId={movie.MovieId}
          name={movie.Name}
          director={movie.Director}
          description={movie.Description}
          imgURL={movie.Image}
          onClick={handleSelection}
        />
    );
});
return <div className='container'>
  <div className='grid'>{movies}</div>
  </div>;
};

// Export the Dashboard component as the default export
export default Home;