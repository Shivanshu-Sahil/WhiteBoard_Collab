import { useState, useRef } from "react";
import WhiteBoard from "../../components/Whiteboard";


const RoomPage = ({ user, socket, users }) => {
    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("#000000");
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);
    const [openedUserTab, setOpenedUserTab] = useState(false);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const handleClearCanvas = () => {
        setElements([]);
        setHistory([]);
    };

    const undo = () => {
        if (elements.length === 0)
            return;
        setHistory((prev) => [...prev, elements[elements.length - 1]]);
        setElements((prev) => prev.slice(0, -1));
    };

    const redo = () => {
        if (history.length === 0)
            return;
        setElements((prev) => [...prev, history[history.length - 1]]);
        setHistory((prev) => prev.slice(0, -1));
    };

    return (

        <div className="container-fluid py-4 roompage-bg">
            <div className="container-fluid py-4 roompage-bg" style={{ position: 'relative', minHeight: 60 }}>
                <button
                    type="button"
                    className="btn btn-dark user-button"
                    style={{
                        position: 'absolute',
                        top: 65,
                        left: 10,
                        height: '48px',
                        width: '90px',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        borderRadius: '1.5rem',
                        zIndex: 10,
                        boxShadow: '0 4px 12px rgba(33,150,243,0.13)',
                        transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
                    }}
                    onClick={() => setOpenedUserTab((prev) => !prev)}
                >
                    Users
                </button>
                <style>{`
                    .user-button:hover {
                        background-color: #1c1c1c;
                        box-shadow: 0 8px 24px rgba(33,150,243,0.18);
                        transform: scale(1.06);
                    }
                `}</style>

                {openedUserTab && (
                    <div
                        className="user-sidebar position-fixed top-0 start-0 bg-dark text-white shadow-lg"
                        style={{
                            width: 270,
                            height: '100vh',
                            borderTopRightRadius: '1.2rem',
                            borderBottomRightRadius: '1.2rem',
                            overflowY: 'auto',
                            zIndex: 1200,
                            boxShadow: '0 0 32px 0 rgba(33,150,243,0.13)',
                            animation: 'slideInLeft 0.35s cubic-bezier(.4,1.6,.6,1)'
                        }}
                    >
                        <button
                            type="button"
                            className="btn btn-outline-light rounded-circle position-absolute"
                            style={{
                                top: 18,
                                right: 18,
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
                            aria-label="Close users sidebar"
                            onClick={() => setOpenedUserTab(false)}
                        >
                            &times;
                        </button>
                        <div className="pt-5 mt-4">
                            <h5 className="text-center fw-bold mb-4" style={{ color: '#fb8c00', letterSpacing: '1px' }}>Users Online</h5>
                            {users.length === 0 ? (
                                <p className="text-center text-muted">No users</p>
                            ) : (
                                users.map((usr, index) => (
                                    <div key={usr.userId || index} className="text-center py-2 px-2 mb-1 rounded" style={{ background: user && user.userId === usr.userId ? 'rgba(33,150,243,0.13)' : 'transparent', fontWeight: user && user.userId === usr.userId ? 700 : 500, color: user && user.userId === usr.userId ? '#1976d2' : '#fff' }}>
                                        {usr.name} {user && user.userId === usr.userId && <span style={{ color: '#fb8c00', fontWeight: 700 }}>(You)</span>}
                                    </div>
                                ))
                            )}
                        </div>
                        <style>{`
                            @keyframes slideInLeft {
                                0% { transform: translateX(-100%); opacity: 0; }
                                100% { transform: translateX(0); opacity: 1; }
                            }
                            .user-sidebar::-webkit-scrollbar {
                                width: 8px;
                                background: #222;
                            }
                            .user-sidebar::-webkit-scrollbar-thumb {
                                background: #444;
                                border-radius: 4px;
                            }
                            .user-sidebar .btn-outline-light:hover {
                                background: #fff;
                                color: #222;
                                border-color: #fb8c00;
                            }
                        `}</style>
                    </div>
                )}

            </div >

            <div className="d-flex flex-column align-items-center mb-4">

                <div className="d-flex align-items-center mb-2" style={{ gap: '1.2rem' }}>
                    <h1 className="display-5 fw-bold mb-0" style={{ color: '#fb8c00', letterSpacing: '1px', fontSize: '2.5rem', lineHeight: 1 }}>
                        Collaborative Whiteboard
                    </h1>
                    <span
                        className="badge bg-dark d-flex align-items-center"
                        style={{
                            color: 'white',
                            fontSize: '1.35rem',
                            padding: '0.55em 1.1em',
                            height: '2.7rem',
                            marginTop: '0.1rem',
                            letterSpacing: '0.5px',
                            fontWeight: 600
                        }}
                    >
                        Users online:&nbsp;
                        <span style={{ color: 'white', fontWeight: 700, fontSize: '1.35rem' }}>{users.length}</span>
                    </span>
                </div>


                {user && user.presenter === true && (
                    <div className="d-flex gap-3 align-items-center mt-2">
                        <span className="fw-semibold" style={{ color: '#333' }}>Color Picker :</span>
                        <input
                            type="color"
                            className="form-control form-control-color border-0"
                            style={{ width: 40, height: 40, background: 'none' }}
                            title="Choose your color"
                            value={color}
                            onChange={e => setColor(e.target.value)}
                        />
                        <div className="d-flex gap-2 ms-3">
                            <label className="form-check-label" style={{ color: 'black', fontWeight: 500 }}>
                                <input
                                    type="radio"
                                    className="form-check-input me-1"
                                    name="tool"
                                    value="pencil"
                                    checked={tool === "pencil"}
                                    onChange={() => setTool("pencil")}
                                />
                                Pencil
                            </label>
                            <label className="form-check-label" style={{ color: 'black', fontWeight: 500 }}>
                                <input
                                    type="radio"
                                    className="form-check-input me-1"
                                    name="tool"
                                    value="line"
                                    checked={tool === "line"}
                                    onChange={() => setTool("line")}
                                />
                                Line
                            </label>
                            <label className="form-check-label" style={{ color: 'black', fontWeight: 500 }}>
                                <input
                                    type="radio"
                                    className="form-check-input me-1"
                                    name="tool"
                                    value="rectangle"
                                    checked={tool === "rectangle"}
                                    onChange={() => setTool("rectangle")}
                                />
                                Rectangle
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {
                user && user.presenter === true && (
                    <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
                        <button
                            className="btn px-4"
                            style={{
                                fontWeight: 600,
                                background: 'linear-gradient(90deg, #2196f3 0%, #1e88e5 100%)',
                                color: 'white',
                                border: 'none',
                                boxShadow: '0 2px 8px rgba(33, 150, 243, 0.1)',
                                transition: 'background 0.2s, box-shadow 0.2s',
                            }}
                            disabled={elements.length === 0}
                            onClick={() => undo()}
                        >
                            Undo
                        </button>
                        <button
                            className="btn px-4"
                            style={{
                                fontWeight: 600,
                                background: 'transparent', // no background
                                color: '#2196f3', // bluish text
                                border: '2px solid #2196f3', // bluish border
                                boxShadow: 'none',
                                transition: 'border 0.2s, color 0.2s',
                            }}
                            disabled={elements.length === 0 || history.length === 0}
                            onClick={() => redo()}
                        >
                            Redo
                        </button>
                        <button className="btn btn-danger px-4 ms-2" onClick={handleClearCanvas} style={{ fontWeight: 600 }}>Clear Canvas</button>
                    </div>
                )
            }

            {/* Canvas/whiteboard component will be rendered from a dedicated folder, not here */}
            <div className="col-md-10 mx-auto mt-4">
                <WhiteBoard
                    canvasRef={canvasRef}
                    ctxRef={ctxRef}
                    elements={elements}
                    setElements={setElements}
                    tool={tool}
                    color={color}
                    user={user}
                    socket={socket}
                />
            </div>
        </div >
    );
};

export default RoomPage;