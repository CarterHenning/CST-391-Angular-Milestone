import { Router } from 'express';
import * as MoviesController from './movies.controller';

const router = Router();
router.
    route('/movies').
    get(MoviesController.readMovies);

    router.
    route('/movies/Directors').
    get(MoviesController.readMoviesByDirector);

    router.
    route('/movies/search/Director/:search').
    get(MoviesController.readMoviesByDirectorSearch);

    router.
    route('/movies/search/Description/:search').
    get(MoviesController.readMoviesByDescriptionSearch);

    router.
    route('/movies').
    post(MoviesController.createMovie);

    router.
    route('/movies').
    put(MoviesController.updateMovie);

    router.
    route('/movies/:id').
    delete(MoviesController.deleteMovie);
    
    export default router;