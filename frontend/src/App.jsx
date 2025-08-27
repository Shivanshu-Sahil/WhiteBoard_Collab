
import './App.css';
import Forms from './components/Forms';
import { Routes, Route } from 'react-router-dom';
import RoomPage from './pages/RoomPage/RoomPage';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);



const App=() => {
  const [userNo, setUserNo] = useState("");
  const [roomJoined, setRoomJoined] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("userJoined", (data) => {
      if(data.success){
        console.log(data.message);
        setUsers(data.users);
      }
      else{
        console.log("Error");
      }
    });

    socket.on("usersList", (data) => {
      setUsers(data);
    });


    socket.on("userJoinedMsg", (data) => {
      toast.info(`User ${data} joined the room`, {
        autoClose: 2500,
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        icon: '👤',
        position: 'top-right',
      });
    });

    socket.on("userLeftMsg", (data) => {
      toast.info(`User ${data} left the room`, {
        autoClose: 2500,
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        icon: '🚪',
        position: 'top-right',
      });
    });

    // Listen for disconnects (user leaves)
    socket.on("userLeft", (data) => {
      setUsers(data);
    });

    return () => {
      socket.off("userJoined");
      socket.off("usersList");
      socket.off("userLeft");
      socket.off("userJoinedMsg");
      socket.off("userLeftMsg");
    };
  }, []);

   const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };


  return(
    <div className="container">
      <ToastContainer
        position="top-right"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        closeButton={false}
        hideProgressBar={false}
        newestOnTop
        pauseOnHover
        draggable
        style={{ zIndex: 2000 }}
      />
      <Routes>
        <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser} />} />
  <Route path="/:roomId" element={<RoomPage user={user} users={users} socket={socket} />} />
      </Routes>
    </div>
  );
};

// Custom toast styles for app theme
import './toast-custom.css';

export default App
