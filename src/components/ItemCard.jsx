// src/components/ItemCard.jsx
import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

export default function ItemCard({ item, onClick }) {
  const imageUrl = item.image ? item.image : null;
  return (
    <article className="card" onClick={() => onClick(item)}>
      <div className="thumb">
        {imageUrl ? (
          <img src={imageUrl} alt={item.title} onError={e => e.target.style.display = 'none'} />
        ) : (
          <div className="placeholder">◇</div>
        )}
      </div>
      <div className="card-body">
        <span className={`badge ${item.type}`}>{item.type}</span>
        <h3>{item.title}</h3>
        <div className="muted">
          <MapPin size={14} /> {item.location}
        </div>
        <div className="meta">
          <span>{new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          <span>{item.status}</span>
        </div>
      </div>
    </article>
  );
}
