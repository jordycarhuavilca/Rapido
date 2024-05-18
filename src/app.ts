import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import session from 'express-session';
import router from '@routes/index';
import cors from 'cors';
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

dotenv.config();
morgan('dev');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || '',
    cookie: {
      httpOnly: false
    },
    saveUninitialized: false,
    resave: false
  })
);
app.use(router)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('global handle error ' + err);
  if (err instanceof multer.MulterError) {
    if (err.code == 'LIMIT_FIELD_COUNT') {
      res.status(400).json({
        message: 'File limit reached'
      });
    }
  }
  if (err) {
    const status = err.statusCode || 500;
    const message = err.message;

    res.status(status).json({
      message: message
    });
  } else next();
});

export default app;
