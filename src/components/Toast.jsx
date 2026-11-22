// src/components/Toast.jsx
import React, { useEffect } from 'react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div id="toast" style={{ display: 'block' }}>
      {message}
    </div>
  );
}
