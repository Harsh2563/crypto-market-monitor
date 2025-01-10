import express from "express";
import { cryptoValidator } from "../middleware/cryptoMiddleware.js";
import { vCrypto } from "../validators/cryptoValidator.js";
import { getCryptoStats, getCryptoDeviation } from "../controllers/cryptoController.js";

const router = express.Router();

router.get('/stats', cryptoValidator(vCrypto), getCryptoStats);
router.get('/deviation', cryptoValidator(vCrypto), getCryptoDeviation);

export default router;  