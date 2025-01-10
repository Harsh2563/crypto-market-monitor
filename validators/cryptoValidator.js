import joi from "joi";

export const vCrypto = joi.object({
    coin: joi.string().required(),
    price: joi.number().required(),
    marketCap: joi.number().required(),
    change24h: joi.number().required()
})
