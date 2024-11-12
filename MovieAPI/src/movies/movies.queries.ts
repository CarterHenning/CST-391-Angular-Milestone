export const movieQueries = {
    readMovies: `
        SELECT
            MovieId as MovieId, Name As Name, 
            Description As Description, Date As Date, Director As Director, Image As Image
        FROM cst_391_milestone.movie
        `,
    readMoviesByDirector: `
        SELECT
            MovieId as MovieId, Name AS Name, Director AS Director, 
            Description AS Description, Date AS Date, Image AS Image
        FROM cst_391_milestone.movie
        WHERE cst_391_milestone.movie.Director = ?
        `,
    readMoviesByDirectorSearch: `
        SELECT
            MovieId as MovieId, Name As Name, Director AS Director,
            Description AS Description, Date AS Date, Image AS Image
        FROM cst_391_milestone.movie
        WHERE cst_391_milestone.movie.Director LIKE ?
        `,
    readMoviesByDescriptionSearch: `
        SELECT
            MovieId as MovieId, Name AS Name, Director AS Director,
            Description AS Description, Date AS Date, Image AS Image
        FROM cst_391_milestone.movie
        WHERE cst_391_milestone.movie.Description LIKE ?
    `,
    readMoviesByMovieId: `
        SELECT
            MovieId as MovieId, Name AS Name, Director AS Director,
            Description AS Description, Date AS Date, Image AS Image
        FROM cst_391_milestone.movie
        WHERE cst_391_milestone.movie.MovieId = ?
    `,
    createMovie: `
        INSERT INTO movie(Name, Director, Description, Date, Image) VALUES(?,?,?,?,?)
    `,
    updateMovie: `
        UPDATE cst_391_milestone.movie
        SET Name = ?, Director = ?, Date = ?, Image = ?, Description = ?
        WHERE MovieId = ?
    `,
    deleteMovie: `
        DELETE FROM cst_391_milestone.movie
        WHERE MovieId = ?
    `,
}