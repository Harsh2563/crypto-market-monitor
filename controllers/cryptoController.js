import Crypto from "../models/cryptoModel.js";
import { calculateDeviation } from "../utils/helper.js";
import logger from '../utils/logger.js';

class CryptoController {
    async getCryptoStats(req, res) {
        const { coin } = req.query;
        try {
            const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
            if (!latestData) {
                return res.status(404).json({ error: 'Data not found' });
            }
            res.status(200).json({
                price: latestData.price,
                marketCap: latestData.marketCap,
                '24hChange': latestData.change24h
            });
        } catch (error) {
            logger.error(`Error in getCryptoStats: ${error.message}`, { coin, stack: error.stack });
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getCryptoDeviation(req, res) {
        const { coin } = req.query;
        try {
            const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
            if (records.length === 0) {
                return res.status(404).json({ error: 'Not enough data' });
            }
            const prices = records.map(record => record.price);
            const deviation = calculateDeviation(prices);
            res.status(200).json({ deviation: deviation.toFixed(2) });
        } catch (error) {
            logger.error(`Error in getCryptoDeviation: ${error.message}`, { coin, stack: error.stack });
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new CryptoController();