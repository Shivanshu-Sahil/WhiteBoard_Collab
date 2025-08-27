
# Collaborative Whiteboard App

## Overview

This project is a full-stack, real-time collaborative whiteboard application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. It enables multiple users to join a room, draw together on a shared canvas, and see each other's changes instantly. The app features role-based access (host/presenter vs. participant), modern UI/UX, and robust real-time synchronization.

---

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Key Components](#key-components)
- [Real-Time Collaboration](#real-time-collaboration)
- [Role-Based Access](#role-based-access)
- [UI/UX & Accessibility](#uiux--accessibility)
- [Testing](#testing)
- [Security & Best Practices](#security--best-practices)
- [Known Issues & TODOs](#known-issues--todos)
- [License](#license)

---

## Features
- **Real-time collaborative drawing** (pencil, line, rectangle)
- **Undo/Redo** and **Clear Canvas**
- **Color picker** and tool selection
- **Role-based access:** Only the host/presenter can draw and control the whiteboard
- **User list sidebar** with live user count and animated toggle
- **Responsive, modern UI** with Bootstrap and custom CSS
- **Toast notifications** for user join/leave events, styled to match the app theme
- **Room creation/joining** with unique IDs
- **Socket.IO-powered instant updates**
- **WCAG-compliant accessibility**

---

## Architecture

**Frontend:**
- Built with React (Vite for fast dev/build)
- Uses functional components and hooks
- State management is local (per component) with props for integration
- Socket.IO client for real-time events
- Bootstrap and custom CSS for styling

**Backend:**
- Node.js with Express server
- Socket.IO server for real-time communication
- In-memory user/session management (no DB persistence in current version)
- Modular user management utilities

**Data Flow:**
- Users join a room (host or participant)
- Presenter’s drawing actions are sent as JSON (not images) to the server
- Server broadcasts drawing actions to all participants in the room
- User join/leave events update the user list and trigger toast notifications

---

## Tech Stack

- **Frontend:** React, Vite, Bootstrap, roughjs, react-toastify, socket.io-client
- **Backend:** Node.js, Express, Socket.IO
- **Other:** ESLint, Prettier, custom CSS

---

## Folder Structure

```
frontend/
	src/
		components/
			Forms/
			Whiteboard/
			UserBar/
		pages/
			Home/
			RoomPage/
		assets/
		App.jsx
		main.jsx
		...
	public/
	package.json
	vite.config.js
	...
backend/
	server.js
	utils/
		users.js
	package.json
	...
```

---

## Setup & Installation

1. **Clone the repository:**
	 ```sh
	 git clone <repo-url>
	 cd Whiteboard
	 ```
2. **Install dependencies:**
	 - Frontend:
		 ```sh
		 cd frontend
		 npm install
		 ```
	 - Backend:
		 ```sh
		 cd ../backend
		 npm install
		 ```
3. **Start the servers:**
	 - Backend:
		 ```sh
		 npm run dev
		 ```
	 - Frontend:
		 ```sh
		 cd ../frontend
		 npm run dev
		 ```
4. **Open the app:**
	 - Visit [http://localhost:5173](http://localhost:5173) in your browser

---

## Usage

1. **Create or join a room** from the landing page
2. **Share the room ID** with others to collaborate
3. **Host/presenter** can draw, undo/redo, clear, and control the whiteboard
4. **Participants** see a live view and user list, but cannot draw
5. **User list** can be toggled from the floating button
6. **Toast notifications** appear for user join/leave events

---

## Key Components

- **Forms:** Room creation/joining UI
- **Whiteboard:** Canvas drawing, tool/color selection, undo/redo, real-time sync
- **RoomPage:** Main collaboration page, user list, controls, and integration
- **UserBar:** Sidebar for user list (animated, styled)

---

## Real-Time Collaboration

- Uses Socket.IO for low-latency, bi-directional communication
- Presenter emits drawing actions as JSON; server broadcasts to all room members
- User join/leave events update all clients instantly

---

## Role-Based Access

- **Host/Presenter:** Can draw, undo/redo, clear, and control the whiteboard
- **Participants:** View-only; see live updates and user list
- Role is set at room creation/join and enforced in UI and logic

---

## UI/UX & Accessibility

- Modern, minimal, and responsive design
- Bootstrap grid and custom CSS for layout
- Accessible color contrast and keyboard navigation
- Toast notifications styled to match app theme
- Animated sidebar and buttons for user list

---

## Testing

- Manual testing for all features and edge cases
- Linting with ESLint and Prettier
- TODO: Add automated unit and integration tests

---

## Security & Best Practices

- Input validation on forms
- No sensitive data stored client-side
- Socket events validated on server
- No hardcoded secrets in repo
- TODO: Add authentication and persistent storage

---

## Known Issues & TODOs

- No persistent storage (users and whiteboard state are in-memory)
- No authentication (anyone with room ID can join)
- No mobile drawing support (touch events)
- Add more drawing tools (ellipse, text, etc.)
- Add export/download whiteboard as image
- Add automated tests

---

## License

MIT License
