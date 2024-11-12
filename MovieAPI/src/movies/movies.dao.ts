import { OkPacket } from "mysql";
import { execute } from "../services/mysql.connector";
import { Movie } from "./movies.model";
import {movieQueries } from './movies.queries';

export const readMovies = async () => {
    return execute<Movie[]>(movieQueries.readMovies, []);
};

export const readMoviesByDirector = async (DirectorName: string) => {
    return execute<Movie[]>(movieQueries.readMoviesByDirector, [DirectorName]);
};

export const readMoviesByDirectorSearch = async (search: string) => {
    console.log('search param', search);
    return execute<Movie[]>(movieQueries.readMoviesByDirectorSearch, [search]);
};

export const readMovieByDescriptionSearch = async (search: string) => {
    console.log('search param', search);
    return execute<Movie[]>(movieQueries.readMoviesByDescriptionSearch, [search]);
};

export const readMoviesByMovieId = async (MovieId: number) => {
    return execute<Movie[]>(movieQueries.readMoviesByMovieId, [MovieId]);
};

export const createMovie = async (movie: Movie) => {
    return execute<OkPacket>(movieQueries.createMovie,
        [movie.Name, movie.Director, movie.Description, movie.Date, movie.Image]);
};

export const updateMovie = async (movie: Movie) => {
    return execute<OkPacket>(movieQueries.updateMovie,
        [movie.Name, movie.Director, movie.Date, movie.Image, movie.Description, movie.MovieId]);
};

export const deleteMovie = async (MovieId: number) => {
    return execute<OkPacket>(movieQueries.deleteMovie, [MovieId]);
};