import React, { useEffect } from 'react';

function Overlay({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <img src={`/${image}.jpeg`} alt={image} className="overlay-image" />
    </div>
  );
}

export default Overlay;
