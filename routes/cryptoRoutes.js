import express from "express";
import { cryptoValidator } from "../middleware/cryptoMiddleware";

const router = express.Router();

router.get('/stats', cryptoValidator(vCrypto), getCryptoStats);
router.get('/deviation', cryptoValidator(vCrypto), getCryptoDeviation);

export default router;