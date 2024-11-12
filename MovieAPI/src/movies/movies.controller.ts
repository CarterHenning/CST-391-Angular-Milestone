import { Request, RequestHandler, Response } from "express";
import { Movie } from './movies.model';
import * as MovieDao from './movies.dao';
import { OkPacket } from 'mysql';

export const readMovies: RequestHandler = async (req: Request, res: Response) => {
    try {
        let movies;
        req.url
        let MovieId = parseInt(req.query.MovieId as string);

        console.log('MovieId', MovieId);
        if (Number.isNaN(MovieId)) {
            movies = await MovieDao.readMovies();
        } else {
            movies = await MovieDao.readMoviesByMovieId(MovieId);
        }


        res.status(200).json(
            movies
        );
    } catch (error) {
        console.error('[movies.controller][readMovies][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching movies'
        });
    }
};

export const readMoviesByDirector: RequestHandler = async (req: Request, res: Response) => {
    try {
        const movies = await MovieDao.readMoviesByDirector(req.params.director);

        res.status(200).json(
            movies
        );
    } catch (error) {
        console.error('[movies.controller][readMovies][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching movies'
        });
    }
};

export const readMoviesByDirectorSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('search', req.params.search);
        const movies = await MovieDao.readMoviesByDirectorSearch('%' + req.params.search + '%');

        res.status(200).json(
            movies
        );
    } catch (error) {
        console.error('[movies.controller][readMovies][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching movies'
        });
    }
};

export const readMoviesByDescriptionSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('search', req.params.search);
        const movies = await MovieDao.readMovieByDescriptionSearch('%' + req.params.search + '%');

        res.status(200).json(
            movies
        );
    } catch (error) {
        console.error('[movies.controller][readMovies][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching movies'
        });
    }
};

export const createMovie: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await MovieDao.createMovie(req.body);

        console.log('req.body', req.body);

        console.log('movie', okPacket);


        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[movies.controller][readMovies][Error]', error);
        res.status(500).json({
            message: 'There was an error when writing movies'
        });
    }
};

export const updateMovie: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('Controller start')
        const okPacket: OkPacket = await MovieDao.updateMovie(req.body);

        console.log('req.body', req.body);

        console.log('movie', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[movies.controller][readMovies][Error]', error);
        res.status(500).json({
            message: 'There was an error when updating movies'
        });
    }
};

export const deleteMovie: RequestHandler = async (req: Request, res: Response) => {
    try {
        let movieId = parseInt(req.params.id as string);

        console.log('movieId', movieId);
        if (!Number.isNaN(movieId)) {
            const response = await MovieDao.deleteMovie(movieId);

            res.status(200).json(response);
        } else {
            throw new Error("Integer expected for MovieId");
        }
    } catch (error) {
        console.error('[movies.controller][deleteMovie][Error]', error);
        res.status(500).json({
            message: 'There was an error when deleting the movie'
        });
    }
};
