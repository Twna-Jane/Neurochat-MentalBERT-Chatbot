import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const serviceAccountPath = process.env.FIREBASE_KEY_PATH;


const absolutePath = path.isAbsolute(serviceAccountPath)
  ? serviceAccountPath
  : path.resolve(__dirname, serviceAccountPath);


if (!fs.existsSync(absolutePath)) {
  console.error(` Firebase key file not found at: ${absolutePath}`);
  process.exit(1);
}


const serviceAccount = JSON.parse(fs.readFileSync(absolutePath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

console.log(" Connected to Firebase Firestore");

export default db;
