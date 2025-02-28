"use client"; // Required for Next.js App Router

import { useEffect, useState } from "react";

const WEBSOCKET_URL = "wss://stock-tracker-production-f38f.up.railway.app/stocks";

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [symbol, setSymbol] = useState("AAPL");
    const [socket, setSocket] = useState(null);
    const [darkMode, setDarkMode] = useState(true); // Default to dark mode

    useEffect(() => {
        // Check saved theme in localStorage
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
            setDarkMode(savedTheme === "dark");
        } else {
            // Default to dark mode if no preference is saved
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDarkMode(true);
        }

        const ws = new WebSocket(WEBSOCKET_URL);
        ws.onopen = () => {
            console.log("Connected to WebSocket");
        };
        ws.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };
        ws.onerror = (error) => console.error("WebSocket Error:", error);
        ws.onclose = () => console.log("WebSocket disconnected");

        setSocket(ws);

        return () => ws.close();
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        setDarkMode(!darkMode);
    };

    const handleSearch = () => {
        if (socket && symbol.trim() !== "") {
            socket.send(symbol);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch(); 
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
            <div className="w-full max-w-xl text-center">
                <button
                    onClick={toggleDarkMode}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 dark:text-white"
                >
                    {darkMode ? "🌙" : "☀️"}
                </button>
                <h1 className="text-2xl font-bold">📈 Stock Tracker</h1>
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter Stock Symbol"
                    className="mt-4 p-2 border border-gray-400 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <button
                    onClick={handleSearch}
                    className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    🔍 Get Price
                </button>
                <ul className="mt-4">
                    {messages.map((msg, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-200">{msg}</li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
