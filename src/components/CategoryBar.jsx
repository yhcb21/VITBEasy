// src/components/CategoryBar.jsx
import React from 'react';

const categories = [
  { label: 'All', value: 'All', icon: '✦' },
  { label: 'Electronics', value: 'Electronics', icon: '▣' },
  { label: 'Documents', value: 'Documents', icon: '▤' },
  { label: 'Accessories', value: 'Accessories', icon: '◆' },
  { label: 'Bags', value: 'Bags', icon: '▣' },
  { label: 'Clothing', value: 'Clothing', icon: '◇' },
  { label: 'Other', value: 'Other', icon: '•••' },
];

export default function CategoryBar({ selected, onSelect }) {
  return (
    <div className="categories">
      {categories.map(cat => (
        <button
          key={cat.value}
          className={`cat ${selected === cat.value ? 'active' : ''}`}
          data-category={cat.value}
          onClick={() => onSelect(cat.value)}
        >
          {cat.icon}
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
