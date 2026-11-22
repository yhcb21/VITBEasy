// src/components/FilterBar.jsx
import React from 'react';

const filters = [
  { label: 'All', value: '' },
  { label: 'Lost', value: 'lost' },
  { label: 'Found', value: 'found' },
];

export default function FilterBar({ selected, onSelect }) {
  return (
    <div className="filters">
      {filters.map(f => (
        <button
          key={f.value}
          className={`filter ${selected === f.value ? 'active' : ''}`}
          data-type={f.value}
          onClick={() => onSelect(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
