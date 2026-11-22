// src/components/Hero.jsx
import React from 'react';
import { Plus } from 'lucide-react';

export default function Hero({ onReport }) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">VITBeasy • Campus Community</p>
        <h1>
          Lost something?<br />
          <span>Found something?</span>
        </h1>
        <p className="hero-text">
          Help your campus community reconnect with the things that matter.
        </p>
        <div className="hero-actions">
          <button className="primary" onClick={() => onReport('lost')}>
            <Plus size={16} /> Report Lost Item
          </button>
          <button className="secondary" onClick={() => onReport('found')}>
            <Plus size={16} /> Report Found Item
          </button>
        </div>
      </div>
      <div className="hero-glow" />
    </section>
  );
}
