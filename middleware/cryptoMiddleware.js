export const cryptoValidator = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.query, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map((err) => err.message);
            return res.status(400).json({
                error: 'Validation error',
                details: errorMessages,
            });
        }

        next();
    };
};
