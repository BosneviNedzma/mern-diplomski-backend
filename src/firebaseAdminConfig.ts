// src/firebaseAdminConfig.ts
import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.resolve(__dirname, './config/firebase/serviceAccountKey.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "mern-diplomski.appspot.com"
});

const bucket = admin.storage().bucket();

export default bucket;
