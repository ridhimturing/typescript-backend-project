// src/index.ts
import express, { Request, Response } from 'express';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  try {
    res.send('Hello, TypeScript with Travis CI!');
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.use((err: any, req: Request, res: Response) => {
  logger.error(err);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});