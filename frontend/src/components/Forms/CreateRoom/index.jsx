import React from "react";
import { useState } from "react";
import{useNavigate} from 'react-router-dom'


const CreateRoom = ({ uuid, socket, setUser }) => {
    const [roomId, setRoomId] = useState(uuid());
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleCreateRoom = (e) => {
      e.preventDefault();
      //{name,roomID,userID,host,presenter} 
      const roomData = {
        name,
        roomId,
        userId: uuid(),
        host: true,
        presenter: true
      };
      setUser(roomData);
      navigate(`/${roomId}`);
      console.log(roomData);
      socket.emit("userJoined", roomData);
      
    };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="roomName" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="roomName"
          required
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3 d-flex align-items-center" style={{ gap: '0.5rem' }}>
        <input
          type="text"
          className="form-control"
          id="roomCode"
          value={roomId}
          readOnly
          style={{ background: '#000000ff', fontWeight: 500 }}
        />
        <button
          className="btn btn-link p-0"
          style={{ color: '#fb8c00', fontWeight: 600, textDecoration: 'none' }}
          tabIndex={0}
          onClick={() => setRoomId(uuid())}
          type="button"
        >
          Generate
        </button>
        <button
          className="btn btn-link p-0"
          style={{ color: '#1976d2', fontWeight: 600, textDecoration: 'none' }}
          tabIndex={0}
          type="button"
        >
          Copy
        </button>
      </div>
      <button type="submit" onClick={handleCreateRoom} className="btn btn-primary w-100 mt-3">Create Room</button>
    </form>
  );
};

export default CreateRoom;
