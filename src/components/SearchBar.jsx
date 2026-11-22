// src/components/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  return (
    <div className="search-large">
      <Search size={16} />
      <input
        placeholder="Search wallets, ID cards, laptops, locations..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}
