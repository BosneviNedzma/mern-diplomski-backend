import express from "express";
import { param } from "express-validator";
import StoreController from "../controllers/StoreController";

const router = express.Router();

router.get("/search/:city", param("city").isString().trim().notEmpty()
    .withMessage("Ime grada mora biti napisano pomoću slova."),
    StoreController.searchStore);

export default router;


