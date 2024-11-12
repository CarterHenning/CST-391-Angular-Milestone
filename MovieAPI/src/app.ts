import express from 'express';
import cors from 'cors';
import moviesRouter from './movies/movies.routes';
import reviewRouter from './reviews/review.routes';
import userRouter from './users/users.routes';
import logger from './middleware/logger.middleware';
import dotenv from "dotenv"

dotenv.config();
// import helmet from 'helmet';

const app = express();
const port = 5000;

// Parse JSON bodies
app.use(express.json());
// Parse URL - encoded bodies
app.use(express.urlencoded({ extended: true}));

//enable all CORS request
app.use(cors());

// app.use(helmet());

// Make sure you understand the following line of code. 
app.use('/', [moviesRouter, reviewRouter, userRouter] );

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});



if (process.env.NODE_ENV == 'development')
{
  // add logger middleware
  app.use(logger);
  console.log(process.env.GREETING + ' in dev mode')
}
