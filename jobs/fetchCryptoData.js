import { CronJob } from 'cron';
import axios from 'axios';
import Crypto from '../models/cryptoModel.js';
import logger from '../utils/logger.js';

async function fetchWithRetry(url, options, retries = 3, backoff = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await axios.get(url, options);
        } catch (error) {
            if (error.response && error.response.status === 429 && i < retries - 1) {
                logger.warn(`Rate limit hit, retrying in ${backoff}ms...`);
                await new Promise(resolve => setTimeout(resolve, backoff));
                backoff *= 2; 
            } else {
                throw error;
            }
        }
    }
}

export const fetchCryptoData = async () => {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    try {
        for (const coin of coins) {
            const response = await fetchWithRetry(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
                {}
            );
            const data = response.data[coin];
            console.log(`Fetched data for ${coin}:`, data);
            const crypto = new Crypto({
                coin,
                price: data.usd,
                marketCap: data.usd_market_cap,
                change24h: data.usd_24h_change
            });

            await crypto.save();
            console.log(`Data for ${coin} saved.`);
        }
    } catch (error) {
        logger.error(`Error fetching data: ${error.message}`, { stack: error.stack });
    }
};

const job = new CronJob('0 */2 * * *', fetchCryptoData, null, true, 'UTC');

job.start();