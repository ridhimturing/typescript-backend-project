// src/index.ts

import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import winston from 'winston';

const app = express();
const port = process.env.PORT || 3000;

// Initialize logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Middleware
app.use(morgan('combined'));
app.use(express.json());

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  res.status(500).send('Internal Server Error');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Travis CI!');
});

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});