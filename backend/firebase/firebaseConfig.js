import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const serviceAccountPath = path.join(__dirname, "neurochat-mentalbert-firebase-adminsdk-fbsvc-dae07a25ee.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

console.log("✅ Connected to Firebase Firestore");

export default db;
