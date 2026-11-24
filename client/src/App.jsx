import React, { useState, useEffect } from 'react';
import menuData from './menu.json';
import MessMenuTable from './components/MessMenuTable';
import ReviewDrawer from './components/ReviewDrawer';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Reviews stored as: { [dishName]: [ ...reviewObjects ] }
  const [reviewsByDish, setReviewsByDish] = useState({});

  // Load ALL reviews from MongoDB on first render, then group by dish name
  useEffect(() => {
    fetch(`${API_BASE}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        const grouped = {};
        data.forEach((rev) => {
          if (!grouped[rev.dishName]) grouped[rev.dishName] = [];
          grouped[rev.dishName].push(rev);
        });
        setReviewsByDish(grouped);
      })
      .catch((err) => console.error('Could not fetch reviews:', err));
  }, []);

  const handleMealClick = (slotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleCloseDrawer = () => {
    setSelectedSlot(null);
  };

  // POST new review to MongoDB, then update local state with the saved document
  const handleAddDishReview = async ({ dishName, review }) => {
    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishName, ...review })
      });
      const saved = await res.json();
      setReviewsByDish((prev) => ({
        ...prev,
        [dishName]: [saved, ...(prev[dishName] || [])]
      }));
    } catch (err) {
      console.error('Failed to save review:', err);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>{menuData.institution} - Mess Menu</h1>
        <p style={styles.subtitle}>
          {menuData.menu_title} ({menuData.month})
        </p>
      </header>

      {/* The full-width mess menu table */}
      <MessMenuTable
        menuData={menuData}
        onMealClick={handleMealClick}
      />

      {/* Right-side floating Drawer */}
      {selectedSlot && (
        <ReviewDrawer
          slot={selectedSlot}
          reviewsByDish={reviewsByDish}
          onClose={handleCloseDrawer}
          onSubmitReview={handleAddDishReview}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#ffffff',
    color: '#000000',
    minHeight: '100vh',
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    marginBottom: '20px'
  },
  title: {
    margin: '0 0 4px 0',
    fontSize: '22px',
    fontWeight: '700'
  },
  subtitle: {
    margin: 0,
    fontSize: '14px',
    color: '#555555'
  }
};

export default App;
