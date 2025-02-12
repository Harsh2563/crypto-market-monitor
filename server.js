import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {fetchCryptoData} from './jobs/fetchCryptoData.js';
import cryptoRoutes from './routes/cryptoRoutes.js';

dotenv.config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:8080', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    fetchCryptoData();
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.use('/api/crypto', cryptoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});