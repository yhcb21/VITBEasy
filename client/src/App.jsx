import React, { useState, useEffect } from 'react';
import menuData from './menu.json';
import MessMenuTable from './components/MessMenuTable';
import ReviewDrawer from './components/ReviewDrawer';

// Storage key constant
const LOCAL_STORAGE_KEY = 'mess_menu_reviews_by_dish';

// Initial default seed reviews (used only if localStorage is completely empty)
const DEFAULT_REVIEWS = {
  'Roti (Plain & Butter)': [
    {
      userName: 'Aman',
      rating: 4,
      comment: 'Fresh and soft today.',
      date: '2026-11-18',
      mealContext: 'Monday Lunch'
    }
  ],
  'Sambar': [
    {
      userName: 'Sneha',
      rating: 5,
      comment: 'Authentic taste and good vegetables.',
      date: '2026-11-19',
      mealContext: 'Monday Breakfast'
    }
  ]
};

function App() {
  const [selectedSlot, setSelectedSlot] = useState(null);

  // 1. Lazy initialization: Load from localStorage on first render
  const [reviewsByDish, setReviewsByDish] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Failed to load reviews from localStorage:', err);
    }
    return DEFAULT_REVIEWS;
  });

  // 2. Persist to localStorage whenever reviewsByDish changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviewsByDish));
    } catch (err) {
      console.error('Failed to save reviews to localStorage:', err);
    }
  }, [reviewsByDish]);

  const handleMealClick = (slotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleCloseDrawer = () => {
    setSelectedSlot(null);
  };

  // Called when a review is submitted in ReviewDrawer
  const handleAddDishReview = ({ dishName, review }) => {
    setReviewsByDish((prev) => {
      const existingReviews = prev[dishName] || [];
      return {
        ...prev,
        [dishName]: [review, ...existingReviews]
      };
    });
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
