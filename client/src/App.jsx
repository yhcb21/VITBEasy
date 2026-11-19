import React, { useState } from 'react';
import menuData from './menu.json';
import MessMenuTable from './components/MessMenuTable';
import ReviewDrawer from './components/ReviewDrawer';

function App() {
  // Currently clicked slot (e.g. { day: 'Monday', mealType: 'Lunch', items: [...] })
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Store reviews globally by DISH NAME so dishes served multiple times share reviews!
  // Structure: { [dishName]: [ { userName, rating, comment, date, mealContext }, ... ] }
  const [reviewsByDish, setReviewsByDish] = useState({
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
  });

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
