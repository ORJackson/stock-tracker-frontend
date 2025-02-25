# 📈 Stock Tracker Frontend

This is the **frontend** for the Stock Tracker application, built with **Next.js** and **Tailwind CSS**.  
It connects to a **Spring Boot WebSocket backend** to display **real-time stock prices**.

## 🚀 Features
✅ Live stock price updates via **WebSockets**  
✅ Dark mode toggle 🌙☀️  
✅ Responsive UI with **Tailwind CSS**  
✅ Clean and minimal interface  

---

## 🛠 Tech Stack
- **Framework:** Next.js  
- **Styling:** Tailwind CSS  
- **WebSockets:** Connected to a Spring Boot backend  
- **State Management:** React Hooks (`useState`, `useEffect`)  

---

## 📡 WebSocket Connection
- **Backend WebSocket URL:**  
```sh
wss://stock-tracker-production-f38f.up.railway.app/stocks
```
- **How It Works:**
1️⃣ Connects to the WebSocket backend  
2️⃣ Sends a stock symbol (e.g., `AAPL`)  
3️⃣ Receives and displays real-time stock price updates  

---

## 🖥️ Running the Project Locally

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/stock-tracker-frontend.git
cd stock-tracker-frontend
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Run the Development Server**
```sh
npm run dev
```
