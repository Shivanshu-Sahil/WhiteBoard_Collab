# 🎨 Collaborative Whiteboard App

<div align="center">

A full-stack, real-time collaborative whiteboard application built with the MERN stack and Socket.IO.
Enables multiple users to join rooms, draw together on a shared canvas, and see changes instantly with role-based access control.

![Whiteboard Screenshot](https://i.postimg.cc/k4dtXrGX/Vite-React-Google-Chrome-28-08-2025-7-08-15-pm.png)

<img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react">
<img alt="Node.js" src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js">
<img alt="Socket.IO" src="https://img.shields.io/badge/Socket.IO-4-010101?style=for-the-badge&logo=socket.io">
<img alt="Express" src="https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express">
<img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite">

</div>

# ✨ Features 

🎨 **Real-Time Collaborative Drawing**: Multiple users can draw simultaneously with pencil, line, and rectangle tools

🎭 **Role-Based Access Control**: Host/presenter has full control while participants enjoy view-only experience

🛠️ **Rich Drawing Tools**: Complete toolset with color picker, brush selection, and shape tools

⏮️ **Smart Canvas Controls**: Undo/Redo functionality and one-click canvas clearing for seamless editing

👥 **Live User Management**: Real-time user list with animated sidebar and instant join/leave notifications

📱 **Responsive Design**: Flawless experience across desktop, tablet, and mobile devices

🏠 **Room-Based Collaboration**: Create or join rooms with unique IDs for organized team sessions

🔔 **Smart Notifications**: Toast alerts for user activities, perfectly styled to match app theme

⚡ **Lightning Fast**: Built with Vite for blazing-fast development and optimized production builds

## 🛠️ Tech Stack

**Frontend**
- **Framework**: React 18 with Vite  
- **Language**: JavaScript ES6+
- **Styling**: Bootstrap + Custom CSS  
- **Canvas Library**: Rough.js for natural drawing
- **Real-time**: Socket.IO Client
- **Notifications**: React Toastify
- **Build Tool**: Vite

**Backend**  
- **Runtime**: Node.js
- **Framework**: Express.js
- **Real-time**: Socket.IO Server
- **Session Management**: In-memory (MongoDB planned)
- **Architecture**: Modular utilities design

**Development & Quality**
- **Linting**: ESLint + Prettier
- **Code Quality**: Consistent formatting and best practices
- **Development**: Hot reload with Vite

# Getting Started

## 📋 Prerequisites

- **Node.js** (v16 or higher) – [Download here](https://nodejs.org/)
- **npm** or **yarn** – Comes with Node.js
- **Modern browser** – Chrome, Firefox, Safari, or Edge
- **Team spirit** – Essential for the best collaborative experience!

---

## 🚀 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/collaborative-whiteboard.git
cd collaborative-whiteboard
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend  
npm install
```

4. **Start the backend server**

```bash
cd backend
npm run dev
```
*Backend server will run on `http://localhost:3000`*

5. **Launch the frontend application**

```bash
cd ../frontend
npm run dev
```
*Frontend will open at `http://localhost:5173`*

6. **Start collaborating!** 
   - Open your browser and navigate to `http://localhost:5173`
   - Create a room or join an existing one
   - Share the room ID with your team and start drawing together!

## 🚀 Deployment

### Local Development
```bash
# Backend
cd backend && npm run dev

# Frontend  
cd frontend && npm run dev
```

### Production Build
```bash
# Frontend build
cd frontend && npm run build

# Backend production
cd backend && npm start
```

## 🙌 Contributing

Contributions are most welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.


## 📬 Contact & Support

- **LinkedIn**: [Profile](https://www.linkedin.com/in/shivanshu-sahil/)
- **Email**: sahil060659@gmail.com
- **GitHub**: You're already here!!

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

---

<div align="center">

**Made with 🎨 for seamless collaboration and real-time creativity**

*Built with passion for modern web development, intuitive user experiences, and the power of real-time collaboration*

⭐ **Star this repo if you found it helpful!** ⭐

</div>
