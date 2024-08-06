import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'CARD';

function Card({ document, index, onImageClick, moveCard }) {
  const ref = React.useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={ref} className="card" style={{ opacity }}>
      <div className="card-content" onClick={() => onImageClick(document.type)}>
        <div className="title">{document.title}</div>
        {isLoading && <div className="spinner"></div>}
        <img
          src={`/${document.type}.jpeg`}
          alt={document.title}
          className="thumbnail"
          onLoad={handleImageLoad}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </div>
    </div>
  );
}

export default Card;
