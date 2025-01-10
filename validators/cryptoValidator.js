import joi from "joi";

export const vCrypto = joi.object({
    coin: joi.string().valid('bitcoin', 'matic-network', 'ethereum').required()
})
