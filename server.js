import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import startCryptoDataJob from './jobs/fetchCryptoData.js';
import cryptoRoutes from './routes/cryptoRoutes.js';

dotenv.config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    
    startCryptoDataJob();
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.use('/api/crypto', cryptoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});