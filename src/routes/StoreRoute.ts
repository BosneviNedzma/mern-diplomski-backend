import express from "express";
import { param } from "express-validator";
import StoreController from "../controllers/StoreController";

const router = express.Router();

router.get("/:storeId", param("storeId").isString().trim().notEmpty()
    .withMessage("Jedinstveni identifikator mora biti napisan slovima."),
    StoreController.getStore

);
router.get("/search/:city", param("city").isString().trim().notEmpty()
    .withMessage("Ime grada mora biti napisano slovima."),
    StoreController.searchStore);

export default router;


