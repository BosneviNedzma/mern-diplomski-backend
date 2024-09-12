import { validateMyStoreRequest } from '../middleware/validation';
import { jwtCheck, jwtParse } from '../middleware/auth';

import MyStoreController from '../controllers/MyStoreController';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

router.get("/order", jwtCheck, jwtParse, MyStoreController.getMyStoreOrders);
router.patch("/order/:orderId/status", jwtCheck, jwtParse, MyStoreController.updateOrderStatus);
router.get("/", jwtCheck, jwtParse, MyStoreController.getMyStore);

router.post("/", upload.single("imageFile"),
    validateMyStoreRequest, jwtCheck, jwtParse, MyStoreController.createMyStore);

router.put("/", upload.single("imageFile"),
    validateMyStoreRequest, jwtCheck, jwtParse, MyStoreController.updateMyStore);

export default router;

