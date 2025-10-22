import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, LogOut, UserCircle2, MessageSquare, Plus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  // Fetch chat history for logged-in user
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_BASE}/chat/history`, {
          withCredentials: true,
        });
        setHistory(res.data.history || []);
      } catch (err) {
        console.error("Error loading chat history:", err);
      }
    };
    fetchHistory();
  }, [API_BASE]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post(
        `${API_BASE}/chat`,
        { text: input },
        { withCredentials: true }
      );
      const botReply = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/login/patient");
  };

  const handleViewProfile = () => {
    navigate("/patient/profile");
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages);
  };

  // ✅ New Chat Button Logic
  const handleNewChat = () => {
    setSelectedChat(null);
    setMessages([]);
  };

  return (
    <div className="flex h-screen bg-white-900 text-gray-100">
      {/* Sidebar: Chat history */}
      <aside className="w-72 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 text-lg font-semibold border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <span>Chat History</span>
          </div>

          {/* ✅ New Chat Button */}
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
                key={i}
                onClick={() => handleSelectChat(chat)}
                className={`w-full text-left p-3 hover:bg-gray-700 transition ${
                  selectedChat === chat ? "bg-gray-700" : ""
                }`}
              >
                {chat.title || `Session ${i + 1}`}
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(chat.date).toLocaleString()}
                </p>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* Main Chat Section */}
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

        {/* Chat messages */}
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

        {/* Input form */}
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
