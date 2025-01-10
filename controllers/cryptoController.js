import Crypto from "../models/cryptoModel";

export const getCryptoStats = async(req, res) => {
    const { coin } = req.query;
    try {
        const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
        if (!latestData) {
           return res.status(404).json({ error: 'Data not found' });
        }
        res.json({
           price: latestData.price,
           marketCap: latestData.marketCap,
          '24hChange': latestData.change24h
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}