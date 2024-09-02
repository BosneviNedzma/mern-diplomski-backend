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

export const validateMyStoreRequest = [
    body("storeName").notEmpty().withMessage("Ime prodavnice je obavezno."),
    body("city").notEmpty().withMessage("Grad mora biti string."),
    body("country").notEmpty().withMessage("Država mora biti string."),
    body("deliveryPrice").isFloat({min: 0}).withMessage("Cijena dostave mora biti napisana u obliku broja."),
    body("estimatedDeliveryTime").isInt({min: 0}).withMessage("Procijenjeno vrijeme dostave je u obliku broja."),
    body("offers").isArray().withMessage("Ponuda mora biti niz.").not().isEmpty().withMessage("Niz ponude ne može biti prazan."),
    body("menuItems").isArray().withMessage("Ponuda mora biti u obliku niza."),
    body("menuItems.*.name").notEmpty().withMessage("Naziv ponude je obavezan."),
    body("menuItems.*.price").isFloat({min: 0}).withMessage("Cijena ponude je obavezna i mora biti pozitivan broj."),
    handleValidationErrors

]