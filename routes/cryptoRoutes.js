import express from "express";
import { cryptoValidator } from "../middleware/cryptoMiddleware.js";
import { vCrypto } from "../validators/cryptoValidator.js";
import cryptoController from "../controllers/cryptoController.js";

const router = express.Router();

router.get('/stats', cryptoValidator(vCrypto), cryptoController.getCryptoStats);
router.get('/deviation', cryptoValidator(vCrypto), cryptoController.getCryptoDeviation);

export default router;