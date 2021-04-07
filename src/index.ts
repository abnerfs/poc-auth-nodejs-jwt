import express, { json } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { mainRouter } from './routes';

const PORT = process.env.PORT || 9920;

const app : express.Application = express();

app.use(json());
app.use('/api/v1', mainRouter);


app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})
