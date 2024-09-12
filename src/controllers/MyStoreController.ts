import { Request, Response } from 'express';

import bucket from '../firebaseAdminConfig';
import Order from '../models/order';
import Store from '../models/store';
import mongoose from 'mongoose';

const getMyStore = async (req: Request, res: Response) => {
  try {
    const store = await Store.findOne({ user: req.userId });

    if (!store) {
      return res.status(404).json({ message: "Prodavnica nije pronađena." });
    }

    res.json(store);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Greška prilikom dobavljanja podataka iz baze." });
  }
}

const createMyStore = async (req: Request, res: Response) => {
  try {
    const existingStore = await Store.findOne({ user: req.userId });

    if (existingStore) {
      return res.status(409).json({ message: 'Prodavnica je već registrovana.' });
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const store = new Store({
      ...req.body,
      imageUrl: imageUrl,
      user: new mongoose.Types.ObjectId(req.userId),
      lastUpdated: new Date()
    });

    await store.save();

    res.status(201).send(store);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Nešto nije u redu.' });
  }
};

const updateMyStore = async (req: Request, res: Response) => {
  try {
    const store = await Store.findOne({
      user: req.userId,
    });

    if (!store) {
      return res.status(404).json({ message: "Prodavnica nije pronađena." });
    }

    store.storeName = req.body.storeName;
    store.city = req.body.city;
    store.country = req.body.country;
    store.deliveryPrice = req.body.deliveryPrice;
    store.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    store.offers = req.body.offers;
    store.menuItems = req.body.menuItems;
    store.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      store.imageUrl = imageUrl;
    }

    await store.save();

    res.status(200).send(store);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Nešto nije u redu" });
  }
}

const getMyStoreOrders = async (req: Request, res: Response) => {
  try {
    const store = await Store.findOne({ user: req.userId });

    if (!store) {
      return res.status(404).json({ message: "eProdavnica nije nađena." });
    }

    const orders = await Order.find({ store: store._id }).populate("store").populate("user");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Nešto nije u redu" });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Narudžba nije pronađena." });
    }

    const store = await Store.findById(order.store);

    if (store?.user?._id.toString() !== req.userId) {
      return res.status(401).send();
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Nije moguće ažurirati stanje narudžbe." });
  }
}

const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  const { originalname, buffer } = file;
  const fileName = Date.now() + '-' + originalname;
  const fileUpload = bucket.file(fileName);

  await fileUpload.save(buffer, {
    contentType: file.mimetype,
    public: true,
  });

  const [url] = await fileUpload.getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  });

  return url;
};

export default {
  updateOrderStatus,
  getMyStoreOrders,
  getMyStore,
  createMyStore,
  updateMyStore,
};