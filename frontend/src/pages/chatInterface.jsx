import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  LogOut,
  UserCircle2,
  MessageSquare,
  Plus,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  doc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // Assume user data is stored in localStorage after login
  const user = JSON.parse(localStorage.getItem("authUser"));
  const userId = user?.uid || "guest"; // fallback if user not logged in

  // Flask API endpoint (use port 5001 for model backend)
  const API_BASE = "http://127.0.0.1:5001";

  // On mount, fetch the latest session or create one if none exists
  useEffect(() => {
    const fetchOrCreateSession = async () => {
      const sessionsRef = collection(db, "chatlogs", userId, "sessions");
      const q = query(sessionsRef, orderBy("created_at", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const latestSession = snapshot.docs[0];
        setCurrentSessionId(latestSession.id);
        setMessages(latestSession.data().messages || []);
      } else {
        // Create a new session
        const newSessionRef = await addDoc(sessionsRef, {
          created_at: serverTimestamp(),
          messages: [],
        });
        setCurrentSessionId(newSessionRef.id);
        setMessages([]);
      }
    };
    if (userId) fetchOrCreateSession();
  }, [userId]);

  // Show previous sessions in sidebar
  useEffect(() => {
    const fetchSessions = async () => {
      const sessionsRef = collection(db, "chatlogs", userId, "sessions");
      const q = query(sessionsRef, orderBy("created_at", "desc"));
      const snapshot = await getDocs(q);
      const sessions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(sessions);
    };
    if (userId) fetchSessions();
  }, [userId, currentSessionId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle send
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !currentSessionId) return;

    const userMsg = {
      sender: "user",
      text: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      // Send to Flask backend /chat endpoint
      const res = await axios.post(`${API_BASE}/chat`, { text: input });
      const botReply = {
        sender: "bot",
        text: `${res.data.reply} (Level: ${res.data.prediction}, Confidence: ${res.data.confidence.toFixed(2)})`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botReply]);

      // Update session document with new messages
      const sessionRef = doc(db, "chatlogs", userId, "sessions", currentSessionId);
      await updateDoc(sessionRef, {
        messages: arrayUnion(userMsg, botReply),
      });
    } catch (err) {
      console.error("Error:", err);
      const errorMsg = {
        sender: "bot",
        text: "Sorry, something went wrong.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      // Optionally, update Firestore with error message
      const sessionRef = doc(db, "chatlogs", userId, "sessions", currentSessionId);
      await updateDoc(sessionRef, {
        messages: arrayUnion(errorMsg),
      });
    }
  };

  // Start a new chat session
  const handleNewChat = async () => {
    const sessionsRef = collection(db, "chatlogs", userId, "sessions");
    const newSessionRef = await addDoc(sessionsRef, {
      created_at: serverTimestamp(),
      messages: [],
    });
    setCurrentSessionId(newSessionRef.id);
    setMessages([]);
    setSelectedChat(null);
  };

  // When a session is selected, show its messages
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages || []);
    setCurrentSessionId(chat.id);
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/login/patient");
  };

  const handleViewProfile = () => {
    navigate("/patient/profile");
  };

  return (
    <div className="flex h-screen bg-white-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 text-lg font-semibold border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <span>Chat History</span>
          </div>
          <button
            onClick={handleNewChat}
            title="Start New Chat"
            className="bg-blue-600 hover:bg-blue-700 p-1.5 rounded-md transition"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-500 text-sm p-4">No previous chats found.</p>
          ) : (
            history.map((chat, i) => (
              <button
                key={chat.id || i}
                onClick={() => handleSelectChat(chat)}
                className={`w-full text-left p-3 hover:bg-gray-700 transition ${
                  selectedChat?.id === chat.id ? "bg-gray-700" : ""
                }`}
              >
                {chat.messages && chat.messages.length > 0
                  ? chat.messages[0].text.slice(0, 25)
                  : "New Session"}
                <p className="text-xs text-gray-400 mt-1">
                  {chat.created_at?.seconds
                    ? new Date(chat.created_at.seconds * 1000).toLocaleString()
                    : chat.created_at
                    ? new Date(chat.created_at).toLocaleString()
                    : ""}
                </p>
              </button>
            ))
          )}
        </div>
      </aside>
      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-gray-800 px-6 py-3 flex justify-between items-center border-b border-gray-700 shadow">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold text-blue-400">NeuroChat</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleViewProfile}
              className="flex items-center gap-2 bg-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-600 transition"
            >
              <UserCircle2 className="w-5 h-5 text-blue-300" />
              <span>Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-lg hover:bg-red-700 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </header>
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-center max-w-lg px-4 py-2 rounded-2xl shadow ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-100 border border-gray-700"
                }`}
              >
                {msg.sender === "bot" && (
                  <Bot className="mr-2 w-5 h-5 text-blue-300" />
                )}
                <span>{msg.text}</span>
                {msg.sender === "user" && (
                  <User className="ml-2 w-5 h-5 text-blue-200" />
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        {/* Input Form */}
        <form
          onSubmit={handleSend}
          className="p-4 bg-gray-800 border-t border-gray-700 flex"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe how you're feeling..."
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
          />
          <button
            type="submit"
            className="ml-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}