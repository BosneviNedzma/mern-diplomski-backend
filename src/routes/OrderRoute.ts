import express from 'express';
import { jwtCheck, jwtParse } from '../middleware/auth';
import OrderController from '../controllers/OrderController';
import Order from '../models/order';

const router = express.Router();

router.post("/checkout/create-checkout-session", jwtCheck, jwtParse, OrderController.createCheckoutSession);
router.post("/checkout/webhook", OrderController.stripeWebhookHandler)

export default router;