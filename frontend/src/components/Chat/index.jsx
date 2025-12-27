import { useEffect, useState } from "react";

const Chat = ({ setOpenedChatTab, socket }) => {
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const handleMessageResponse = (data) => {
            setChat((prevChats) => [...prevChats, data]);
        };

        socket.on("messageResponse", handleMessageResponse);

        // Cleanup function to remove listener when component unmounts
        return () => {
            socket.off("messageResponse", handleMessageResponse);
        };
    }, [socket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            setChat((prevChats) => [...prevChats, { message, name: "You" }]);
            socket.emit("message", { message });
            setMessage("");
        }
    };

    return (
        <div
            className="chat-sidebar position-fixed top-0 end-0 bg-dark text-white shadow-lg"
            style={{
                width: 300,
                height: '100vh',
                borderTopLeftRadius: '1.2rem',
                borderBottomLeftRadius: '1.2rem',
                overflowY: 'auto',
                overflowX: 'hidden',
                zIndex: 1200,
                boxShadow: '0 0 32px 0 rgba(33,150,243,0.13)',
                animation: 'slideInRight 0.35s cubic-bezier(.4,1.6,.6,1)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <button
                type="button"
                className="btn btn-outline-light rounded-circle position-absolute"
                style={{
                    top: 18,
                    left: 18,
                    width: 36,
                    height: 36,
                    fontWeight: 700,
                    fontSize: 22,
                    padding: 0,
                    lineHeight: 1,
                    boxShadow: '0 2px 8px rgba(33,150,243,0.13)',
                    border: '2px solid #fff',
                    background: 'rgba(0,0,0,0.12)',
                    transition: 'background 0.2s, box-shadow 0.2s',
                }}
                aria-label="Close chat sidebar"
                onClick={() => setOpenedChatTab(false)}
            >
                &times;
            </button>

            <div className="pt-5 mt-4">
                <h5 className="text-center fw-bold mb-4" style={{ color: '#fb8c00', letterSpacing: '1px' }}>
                    Chat Room
                </h5>
            </div>

            <div
                className="flex-grow-1 p-3"
                style={{
                    overflowY: 'auto',
                    marginBottom: '80px'
                }}
            >
                {chat.length === 0 ? (
                    <p className="text-center text-muted">No messages yet</p>
                ) : (
                    chat.map((msg, index) => (
                        <div
                            key={index}
                            className="mb-2 p-2 rounded"
                            style={{
                                background: msg.name === "You" ? 'rgba(33,150,243,0.13)' : 'rgba(255,255,255,0.05)',
                                borderLeft: msg.name === "You" ? '3px solid #1976d2' : '3px solid #fb8c00',
                                wordWrap: 'break-word',
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word'
                            }}
                        >
                            <div style={{ fontSize: '0.75rem', color: '#fb8c00', fontWeight: 600 }}>
                                {msg.name}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#fff', marginTop: '4px' }}>
                                {msg.message}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <form
                onSubmit={handleSubmit}
                className="position-absolute bottom-0 w-100 d-flex"
                style={{
                    background: '#1c1c1c',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-grow-1 border-0 py-3 px-3"
                    style={{
                        background: 'transparent',
                        color: '#fff',
                        outline: 'none'
                    }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn px-4"
                    style={{
                        background: 'linear-gradient(90deg, #2196f3 0%, #1e88e5 100%)',
                        color: 'white',
                        border: 'none',
                        fontWeight: 600,
                        borderRadius: 0
                    }}
                >
                    Send
                </button>
            </form>

            <style>{`
        @keyframes slideInRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .chat-sidebar::-webkit-scrollbar {
          width: 8px;
          background: #222;
        }
        .chat-sidebar::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 4px;
        }
        .chat-sidebar .btn-outline-light:hover {
          background: #fff;
          color: #222;
          border-color: #fb8c00;
        }
      `}</style>
        </div>
    );
};

export default Chat;
