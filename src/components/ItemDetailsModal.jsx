// src/components/ItemDetailsModal.jsx
import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

export default function ItemDetailsModal({ item, onClose, onClaim }) {
  const imageUrl = item.image || null;
  const isActive = item.status === 'active';
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        <p className="eyebrow">{item.type.toUpperCase()} ITEM</p>
        <h2>{item.title}</h2>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={item.title}
            style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: '12px' }}
          />
        )}
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        <p><strong>Reported by:</strong> {item.postedBy}</p>
        <p><strong>Contact:</strong> {item.contact}</p>
        <p><strong>Status:</strong> {item.status}</p>
        {isActive ? (
          <button className="primary full" onClick={() => onClaim(item._id)}>
            Mark as Claimed
          </button>
        ) : (
          <p className="muted">This item has been marked as claimed.</p>
        )}
      </div>
    </div>
  );
}
