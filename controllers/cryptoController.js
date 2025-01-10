import Crypto from "../models/cryptoModel";

export const getCryptoStats = async(req, res) => {
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
        res.status(500).json({ error: error.message });
    }
};

export const getCryptoDeviation = async(req, res) => {
    const { coin } = req.query;
    try {
        const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
        if (records.length === 0) {
           return res.status(404).json({ error: 'Not enough data' });
        }
        const prices = records.map(record => record.price);
        const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
        const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
        const deviation = Math.sqrt(variance);
        res.status(200).json({ deviation: deviation.toFixed(2) });
  } catch (error) {
        res.status(500).json({ error: error.message });
  }
}