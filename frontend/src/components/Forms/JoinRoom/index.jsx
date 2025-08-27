import React from "react";
import {useState}  from "react";
import { useNavigate } from "react-router-dom";

const JoinRoom = ({ uuid, socket, setUser }) => {
    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();

    const handleJoinRoom = (e) => {
        e.preventDefault();
        const userData = {
            name,
            roomId,
            userId: uuid(),
            host: false,
            presenter: false
        };
        setUser(userData);
        navigate(`/${roomId}`);
        socket.emit("userJoined", userData);
    };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="joinName" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="joinName"
          required
          placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="roomId" className="form-label">Room ID</label>
        <input
          type="text"
          className="form-control"
          id="roomId"
          required
          placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <button type="submit" onClick={handleJoinRoom} className="btn btn-primary w-100 mt-3">Join Room</button>
    </form>
  );
};

export default JoinRoom;
