import express, { Request, Response, NextFunction } from 'express';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
import helmet from 'helmet';
import postsRouter from './router/posts-router';
import { HttpException } from './models/exceptions';

dotenv.config();
const app = express();

app.use(helmet());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN as string);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.use('/api', postsRouter);

app.use(
  (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }

    res.status(err.code || 500);
    res.json({ message: err.message || 'An error happened. Fix your bugs!' });
  },
);

if (process.env.NODE_ENV !== 'development') {
  https
    .createServer(
      {
        key: fs.readFileSync(__dirname + '/../../secretstuff/privkey.pem'),
        cert: fs.readFileSync(__dirname + '/../../secretstuff/cert.pem'),
      },
      app,
    )
    .listen(process.env.PORT);
} else {
  app.listen(process.env.PORT);
}
