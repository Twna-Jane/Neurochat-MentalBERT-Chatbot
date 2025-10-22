import db from "../firebase/firebaseConfig.js";
import { getChatbotPrediction } from "../utils/mentalBERT.js"; // your ML model logic

// Store and return chatbot message + diagnosis
export const handleChatMessage = async (req, res) => {
  try {
    const { patientId, message } = req.body;

    if (!patientId || !message) {
      return res.status(400).json({ error: "Missing patientId or message" });
    }

    // Get prediction/diagnosis from your ML model
    const prediction = await getChatbotPrediction(message);

    // Save chat to Firebase Firestore
    const chatRef = db.collection("patients").doc(patientId).collection("chats");
    const chatDoc = await chatRef.add({
      message,
      prediction,
      timestamp: new Date(),
    });

    res.status(200).json({
      id: chatDoc.id,
      message,
      prediction,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("❌ Chat error:", error);
    res.status(500).json({ error: "Failed to process message" });
  }
};
