import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Ime mora biti string."),
    body("addressLine1").isString().notEmpty().withMessage("Adresa mora biti string."),
    body("city").isString().notEmpty().withMessage("Grad mora biti string."),
    body("country").isString().notEmpty().withMessage("Država mora biti string."),
    handleValidationErrors,
]