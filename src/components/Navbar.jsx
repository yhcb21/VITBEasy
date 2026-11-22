// src/components/Navbar.jsx
import React from 'react';
import { Home, Book, Calendar, Locate, Coffee, Truck, Users, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span>V</span> VITBeasy
      </div>
      <nav>
        <a href="#" className="active"><Home size={16} /> <span>Home</span></a>
        <a href="#"><Book size={16} /> <span>Academics</span></a>
        <a href="#"><Calendar size={16} /> <span>Events</span></a>
        <a href="#" className="active"><Locate size={16} /> <span>Lost &amp; Found</span></a>
        <a href="#"><Home size={16} /> <span>Hostel</span></a>
        <a href="#"><Coffee size={16} /> <span>Food &amp; Cafeteria</span></a>
        <a href="#"><Truck size={16} /> <span>Transport</span></a>
        <a href="#"><Users size={16} /> <span>Community</span></a>
        <a href="#"><Settings size={16} /> <span>Services</span></a>
      </nav>
      <div className="sidebar-bottom">◉ Help &amp; Support</div>
    </aside>
  );
}
