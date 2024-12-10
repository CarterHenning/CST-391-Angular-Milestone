import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import OneMovie from './OneMovie';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Login from './Login';
import Navbar from './NavBar';
import Add from './Add';
import dataSource from './dataSource';


const App = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [selectMovieId, setSelectedMovieId] = useState(0);
  const [selectedReviews, setSelectedReviews] = useState([]);

  let refresh = false;

  const loadMovies = async () => {
    const response = await dataSource.get('/movies');
    setMoviesList(response.data);
  };

  useEffect(() => {
    loadMovies();
    loadReviews();
  }, [refresh]);


  const loadReviews = async () => {
    const response = await dataSource.get('/reviews');
    setReviewsList(response.data);
    console.log("HERE");
  };

  const getMovie = (movieId) => {
    return moviesList.find(m => m.MovieId === movieId);
  } 

  const selectMovie = (id, navigate, uri) => {
    setSelectedMovieId(id);
    setSelectedReviews(reviewsList.filter(r => r.MovieId === id));
    let path = uri + id;
    navigate(path);
  }

  return (

    <AuthProvider>
        <Navbar />

          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <PrivateRoute> 
                  <Home
                    loadMovies={loadMovies}
                    moviesList={moviesList}
                    selectMovie={selectMovie}
                  />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/show/:movieId'
              element={
                <OneMovie 
                  movie={getMovie(selectMovieId)}
                  reviews={reviewsList}
                  loadReviews={loadReviews}
                />}
            />
            <Route
              path="/add"
              element={
                <PrivateRoute> 
                  <Add />
                </PrivateRoute>
              }
            />
          </Routes>
    </AuthProvider>
  );
};

export default App;