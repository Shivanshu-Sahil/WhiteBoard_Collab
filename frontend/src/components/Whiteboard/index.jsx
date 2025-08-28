/**
 * @fileoverview
 * WhiteBoard component for collaborative drawing.
 * - Only users with presenter privileges (user.presenter === true) can interact with the whiteboard.
 * - Non-presenter users see a placeholder image or a shared snapshot from the presenter.
 * - Supports pencil, line, and rectangle tools using roughjs.
 * - Responsive, accessible, and styled to match the app's design.
 * 
 * @dependencies
 * - roughjs for sketchy drawing primitives.
 * - React hooks for state and lifecycle management.
 * - styles.css for component-specific styling.
 * 
 * @param {Object} props
 * @param {string} props.tool - The selected drawing tool ("pencil", "line", "rectangle").
 * @param {string} props.color - The selected stroke color.
 * @param {Array} props.elements - The array of drawn elements.
 * @param {Function} props.setElements - Setter for elements array.
 * @param {Object} props.user - The current user object, must include `presenter` boolean.
 * 
 * @returns {JSX.Element} The rendered whiteboard or a placeholder for non-presenters.
 */

import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs/bundled/rough.esm.js';

const generator = rough.generator();
/**
 * WhiteBoard component
 * Supports pencil, line, and rectangle tools using roughjs
 * Responsive, clean, and simple
 */

const WhiteBoard = ({ tool = 'pencil', color = '#111', elements, setElements, user, socket }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  // For non-presenters, local state to show received elements
  const [remoteElements, setRemoteElements] = useState([]);

  // Presenter: emit elements as JSON on every change
  useEffect(() => {
    if (user?.presenter && socket) {
      socket.emit('whiteboardData', elements);
    }
  }, [elements, user, socket]);

  // Non-presenter: listen for whiteboardData and update local elements
  useEffect(() => {
    if (!user?.presenter && socket) {
      const handleWhiteboardData = (data) => {
        setRemoteElements(data);
      };
      socket.on('whiteboardData', handleWhiteboardData);
      return () => socket.off('whiteboardData', handleWhiteboardData);
    }
  }, [user, socket]);

  // Draw all elements (presenter: elements, non-presenter: remoteElements)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);
    const drawList = user?.presenter ? elements : remoteElements;
    (drawList || []).forEach((el) => {
      if (el.type === 'pencil') {
        roughCanvas.linearPath(el.path, { stroke: el.stroke, strokeWidth: 2 });
      } else if (el.type === 'line') {
        roughCanvas.line(el.x1, el.y1, el.x2, el.y2, { stroke: el.stroke, strokeWidth: 2 });
      } else if (el.type === 'rectangle') {
        roughCanvas.rectangle(
          el.x1,
          el.y1,
          el.x2 - el.x1,
          el.y2 - el.y1,
          { stroke: el.stroke, strokeWidth: 2 }
        );
      }
    });
  }, [elements, remoteElements, user]);

  // Fix: stop drawing if mouse is released outside canvas
  useEffect(() => {
    const handleWindowMouseUp = () => setIsDrawing(false);
    window.addEventListener('mouseup', handleWindowMouseUp);
    return () => window.removeEventListener('mouseup', handleWindowMouseUp);
  }, []);

  // Responsive canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    const setCanvasSize = () => {
      if (!canvas) return;
      const width = Math.min(window.innerWidth * 0.9, 900);
      const height = Math.min(window.innerWidth * 0.5, 400);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    return () => window.removeEventListener('resize', setCanvasSize);
  }, []);

  // Mouse events (only for presenter)
  const handleMouseDown = (e) => {
    if (!user?.presenter) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    if (tool === 'pencil') {
      setElements((prev) => [
        ...prev,
        { type: 'pencil', path: [[x, y]], stroke: color }
      ]);
    } else if (tool === 'line') {
      setElements((prev) => [
        ...prev,
        { type: 'line', x1: x, y1: y, x2: x, y2: y, stroke: color }
      ]);
    } else if (tool === 'rectangle') {
      setElements((prev) => [
        ...prev,
        { type: 'rectangle', x1: x, y1: y, x2: x, y2: y, stroke: color }
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !user?.presenter) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (tool === 'pencil') {
      setElements((prev) => {
        const newElements = [...prev];
        const last = { ...newElements[newElements.length - 1] };
        last.path = [...last.path, [x, y]];
        newElements[newElements.length - 1] = last;
        return newElements;
      });
    } else if (tool === 'line' || tool === 'rectangle') {
      setElements((prev) => {
        const newElements = [...prev];
        const last = { ...newElements[newElements.length - 1] };
        last.x2 = x;
        last.y2 = y;
        newElements[newElements.length - 1] = last;
        return newElements;
      });
    }
  };

  const handleMouseUp = () => {
    if (!user?.presenter) return;
    setIsDrawing(false);
  };

  return (
    <div className="whiteboard-canvas-wrapper d-flex justify-content-center align-items-center py-3">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="whiteboard-canvas shadow-sm"
        style={{
          border: '2.5px solid #111',
          borderRadius: '1rem',
          background: '#fff',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          display: 'block',
          maxWidth: '100%',
          maxHeight: '60vw',
        }}
      />
    </div>
  );
};

export default WhiteBoard;