// src/firebaseAdminConfig.ts
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

// Koristi path.join za izgradnju putanje
const serviceAccountPath = path.join(__dirname, './config/firebase/serviceAccountKey.json');

// Proveri da li fajl postoji na izgradjenoj putanji
if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`Service account file not found at ${serviceAccountPath}`);
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "mern-diplomski.appspot.com"
});

const bucket = admin.storage().bucket();

export default bucket;
