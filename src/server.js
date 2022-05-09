import express from "express";
import cors from 'cors';
import 'dotenv/config';
import 'express-async-errors';
import morgan from "morgan";
import cookieParser from "cookie-parser";

// db
import connectDB from "./db/connect.js";

// routes
import authRoutes from './routes/authRoutes.js';
import petsRoutes from './routes/petsRoutes.js';

// middlewares
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use('/api/auth', authRoutes);
app.use('/api/pets', petsRoutes);

app.get('/', (req, res) => {
    res.send('Server is up!')
})

app.use(notFound.notFoundMiddleware)
app.use(errorHandler.errorHandlerMiddleware);

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(process.env.PORT, () => {
            console.log(`Listening on PORT ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();