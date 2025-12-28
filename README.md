# 🎨 CollabSpace: Collaborative Whiteboard App

<div align="center">

A full-stack, real-time collaborative whiteboard application built with the MERN stack and Socket.IO.
Enables multiple users to join rooms, draw together on a shared canvas, chat in real-time, and see changes instantly with role-based access control.

![Whiteboard Screenshot](https://i.postimg.cc/k4dtXrGX/Vite-React-Google-Chrome-28-08-2025-7-08-15-pm.png)

<img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react">
<img alt="Node.js" src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js">
<img alt="Socket.IO" src="https://img.shields.io/badge/Socket.IO-4-010101?style=for-the-badge&logo=socket.io">
<img alt="Express" src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express">
<img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite">

</div>

# ✨ Features 

🎨 **Real-Time Collaborative Drawing**: Multiple users can draw simultaneously with pencil, line, and rectangle tools using low-latency WebSockets.

💬 **Interactive Chat System**: Real-time messaging within rooms to discuss ideas without switching tabs.

🎭 **Role-Based Access Control**: Room creator (Presenter) has full control over drawing tools and canvas management, while participants enjoy a view-only experience with active chat.

🛠️ **Rich Drawing Tools**: Complete toolset with color picker, tool selection, and smart canvas controls (Undo/Redo).

👥 **Live User Management**: Real-time user list with animated sidebars and instant join/leave notifications.

🌙 **Modern Dark Theme**: Sleek, professional landing page and workspace with a vibrant orange and blue aesthetic ("CollabSpace").

📱 **Responsive Design**: Flawless experience across desktop, tablet, and mobile devices.

🏠 **Room-Based Collaboration**: Create or join rooms with unique IDs for organized team sessions.

🔔 **Smart Notifications**: Toast alerts for user activities, perfectly styled to match the app theme.

# 🛠️ Tech Stack

**Frontend**
- **Framework**: React 19 with Vite  
- **Language**: JavaScript ES6+
- **Styling**: Bootstrap 5 + Custom CSS  
- **Canvas Library**: Rough.js for natural drawing
- **Real-time**: Socket.IO Client
- **Notifications**: React Toastify
- **Build Tool**: Vite

**Backend**  
- **Runtime**: Node.js
- **Framework**: Express.js
- **Real-time**: Socket.IO Server
- **Architecture**: Modular utility-based design

# 🚀 Getting Started

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Modern browser**

---

## 🚀 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/collaborative-whiteboard.git
cd collaborative-whiteboard
```

2. **Install dependencies**

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

3. **Start the application**

```bash
# Run Backend (shoud run on http://localhost:5000)
cd backend && npm run dev

# Run Frontend (should run on http://localhost:5173)
cd ../frontend && npm run dev
```

---

## 🙌 Contributing

Contributions are most welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📬 Contact & Support

- **LinkedIn**: [Shivanshu Sahil](https://www.linkedin.com/in/shivanshu-sahil/)
- **Email**: sahil060659@gmail.com

## 📝 License

This project is licensed under the **MIT License**.

---

<div align="center">

**Made with 🎨 for seamless collaboration and real-time creativity**

⭐ **Star this repo if you found it helpful!** ⭐

</div>

