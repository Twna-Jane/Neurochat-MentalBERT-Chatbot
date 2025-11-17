import axios from "axios";

export const getChatbotPrediction = async (text) => {
  try {
    const response = await axios.post("http://127.0.0.1:5001/predict", { text });
    return response.data.prediction;
  } catch (error) {
    console.error("❌ Error connecting to MentalBERT Flask API:", error.message);
    return "Model Unavailable";
  }
};
