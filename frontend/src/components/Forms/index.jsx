/**
 * @fileoverview
 * Forms Component
 * ----------------
 * Renders the UI for creating and joining rooms in the whiteboard application.
 * This component is intended to be used on the landing or lobby page.
 * 
 * Structure:
 * - Responsive two-column layout using Bootstrap grid.
 * - Each column contains a card with a heading and (future) form content.
 * 
 * Dependencies:
 * - Requires Bootstrap CSS for grid and card styling.
 * - Uses custom styles from styles.css for card height and padding.
 * 
 * TODO:
 * - Implement form fields and handlers for room creation and joining.
 * - Add validation and error handling.
 * - Externalize user-facing strings for i18n.
 */

import React from "react";

/**
 * Forms component for room creation and joining.
 *
 * @component
 * @returns {JSX.Element} Responsive, accessible forms for creating or joining a room.
 */

import "./styles.css"; // Ensure custom styles are imported
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";



const Forms = ({ uuid, socket, setUser }) => {
  return (
    <div className="container h-100 d-flex align-items-center justify-content-center py-5">
      <div className="row w-100 align-items-stretch">
        {/* Create Room Card */}
        <div className="col-md-6 mb-4 mb-md-0 d-flex">
          <div className="card shadow-sm forms-card border border-2 border-dark flex-fill d-flex flex-column justify-content-center">
            <div className="card-body d-flex flex-column justify-content-center h-100">
              <h2 className="card-title text-center mb-4">Create Room</h2>
              <CreateRoom uuid={uuid} socket={socket} setUser={setUser} />
            </div>
          </div>
        </div>
        {/* Join Room Card */}
        <div className="col-md-6 d-flex">
          <div className="card shadow-sm forms-card border border-2 border-dark flex-fill d-flex flex-column justify-content-center">
            <div className="card-body d-flex flex-column justify-content-center h-100">
              <h2 className="card-title text-center mb-4">Join Room</h2>
              <JoinRoom uuid={uuid} socket={socket} setUser={setUser}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
