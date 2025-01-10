import { CronJob } from 'cron';
import axios from 'axios';
import Crypto from '../models/cryptoModel.js';

export const fetchCryptoData = async () => {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    try {
        for (const coin of coins) {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
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
        // console.error('Error fetching data:', error);
    }
};

const job = new CronJob('0 */2 * * *', fetchCryptoData, null, true, 'UTC');

job.start();