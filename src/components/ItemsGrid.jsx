// src/components/ItemsGrid.jsx
import React from 'react';
import ItemCard from './ItemCard.jsx';

export default function ItemsGrid({ items, onItemClick }) {
  return (
    <div className="grid">
      {items.map(item => (
        <ItemCard key={item._id} item={item} onClick={onItemClick} />
      ))}
    </div>
  );
}
