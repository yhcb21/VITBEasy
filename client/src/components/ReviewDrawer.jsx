import React, { useState, useEffect } from 'react';

export default function ReviewDrawer({ slot, reviewsByDish, onClose, onSubmitReview }) {
  // If no slot is selected, don't render anything
  if (!slot) return null;

  // By default, select the first dish in the meal slot
  const [selectedDish, setSelectedDish] = useState(slot.items[0] || '');
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Whenever the user clicks a different meal slot, reset selected dish to the first item
  useEffect(() => {
    if (slot.items && slot.items.length > 0) {
      setSelectedDish(slot.items[0]);
    }
  }, [slot]);

  // Reviews for the currently selected dish
  const currentDishReviews = (reviewsByDish && reviewsByDish[selectedDish]) || [];

  // Calculate average rating for the selected dish
  const avgRating =
    currentDishReviews.length > 0
      ? (
          currentDishReviews.reduce((sum, r) => sum + Number(r.rating), 0) /
          currentDishReviews.length
        ).toFixed(1)
      : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || !selectedDish) return;

    onSubmitReview({
      dishName: selectedDish,
      review: {
        userName: userName.trim() || 'Anonymous Student',
        rating: Number(rating),
        comment: comment.trim(),
        date: new Date().toLocaleDateString(),
        mealContext: `${slot.day} ${slot.mealType}`
      }
    });

    // Reset inputs
    setUserName('');
    setComment('');
    setRating(5);
  };

  return (
    <>
      {/* Light backdrop click-to-close (optional, lets user dismiss by clicking table) */}
      <div style={styles.backdrop} onClick={onClose} />

      {/* Floating Right Side Drawer */}
      <aside style={styles.drawer}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <span style={styles.subBadge}>{slot.day} • {slot.date}</span>
            <h2 style={styles.title}>{slot.mealType} Menu</h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose} title="Close drawer">
            &times;
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={styles.content}>
          {/* Step 1: Select a dish */}
          <div style={styles.section}>
            <label style={styles.sectionLabel}>
              Select a dish to view & rate:
            </label>
            <div style={styles.dishList}>
              {slot.items.map((item) => {
                const isSelected = item === selectedDish;
                const dishReviews = (reviewsByDish && reviewsByDish[item]) || [];
                const dishAvg =
                  dishReviews.length > 0
                    ? (
                        dishReviews.reduce((sum, r) => sum + Number(r.rating), 0) /
                        dishReviews.length
                      ).toFixed(1)
                    : null;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedDish(item)}
                    style={isSelected ? styles.dishChipActive : styles.dishChip}
                  >
                    <span>{item}</span>
                    {dishAvg && (
                      <span style={isSelected ? styles.ratingBadgeActive : styles.ratingBadge}>
                        ★ {dishAvg}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <hr style={styles.divider} />

          {/* Step 2: Dish Review Summary */}
          {selectedDish && (
            <div>
              <div style={styles.dishHeader}>
                <div>
                  <h3 style={styles.dishTitle}>{selectedDish}</h3>
                  <span style={styles.dishMeta}>
                    {currentDishReviews.length > 0
                      ? `Average Rating: ★ ${avgRating} / 5 (${currentDishReviews.length} reviews)`
                      : 'No reviews yet for this dish'}
                  </span>
                </div>
              </div>

              {/* Form to rate the selected dish */}
              <form onSubmit={handleSubmit} style={styles.form}>
                <h4 style={styles.formTitle}>Rate this dish</h4>

                <div style={styles.formRow}>
                  <div style={styles.fieldGroup}>
                    <label style={styles.inputLabel}>Your Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="Anonymous"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.fieldGroup}>
                    <label style={styles.inputLabel}>Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      style={styles.select}
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                      <option value={4}>⭐⭐⭐⭐ (4)</option>
                      <option value={3}>⭐⭐⭐ (3)</option>
                      <option value={2}>⭐⭐ (2)</option>
                      <option value={1}>⭐ (1)</option>
                    </select>
                  </div>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.inputLabel}>Comment</label>
                  <textarea
                    rows={3}
                    placeholder={`How is the ${selectedDish}?`}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={styles.textarea}
                    required
                  />
                </div>

                <button type="submit" style={styles.submitBtn}>
                  Post Review for {selectedDish}
                </button>
              </form>

              <hr style={styles.divider} />

              {/* Step 3: Reviews for this specific dish */}
              <div style={styles.reviewsListSection}>
                <h4 style={styles.reviewsHeading}>
                  Student Reviews for {selectedDish} ({currentDishReviews.length})
                </h4>

                {currentDishReviews.length === 0 ? (
                  <p style={styles.emptyNote}>
                    Be the first student to review <strong>{selectedDish}</strong>!
                  </p>
                ) : (
                  <div style={styles.reviewsList}>
                    {currentDishReviews.map((rev, idx) => (
                      <div key={idx} style={styles.reviewCard}>
                        <div style={styles.reviewTop}>
                          <span style={styles.reviewerName}>{rev.userName}</span>
                          <span style={styles.reviewDate}>{rev.date}</span>
                        </div>
                        <div style={styles.stars}>
                          {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                        </div>
                        <p style={styles.reviewComment}>{rev.comment}</p>
                        {rev.mealContext && (
                          <div style={styles.mealContextTag}>
                            Reviewed during: {rev.mealContext}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    zIndex: 999
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '440px',
    maxWidth: '90vw',
    height: '100vh',
    backgroundColor: '#ffffff',
    boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid #e0e0e0',
    animation: 'slideIn 0.2s ease-out'
  },
  header: {
    padding: '16px 20px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  subBadge: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#666666',
    fontWeight: '600'
  },
  title: {
    margin: '2px 0 0 0',
    fontSize: '18px',
    fontWeight: '700',
    color: '#111111'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#888888',
    lineHeight: 1,
    padding: '4px 8px'
  },
  content: {
    padding: '20px',
    overflowY: 'auto',
    flex: 1
  },
  section: {
    marginBottom: '12px'
  },
  sectionLabel: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '700',
    color: '#444444',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  dishList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  dishChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 12px',
    borderRadius: '20px',
    border: '1px solid #cccccc',
    backgroundColor: '#f8f8f8',
    color: '#333333',
    fontSize: '12px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s'
  },
  dishChipActive: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 12px',
    borderRadius: '20px',
    border: '1px solid #0066cc',
    backgroundColor: '#0066cc',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left'
  },
  ratingBadge: {
    backgroundColor: '#e6e6e6',
    color: '#333333',
    fontSize: '10px',
    padding: '2px 5px',
    borderRadius: '10px',
    fontWeight: 'bold'
  },
  ratingBadgeActive: {
    backgroundColor: '#ffffff',
    color: '#0066cc',
    fontSize: '10px',
    padding: '2px 5px',
    borderRadius: '10px',
    fontWeight: 'bold'
  },
  divider: {
    margin: '18px 0',
    border: 'none',
    borderTop: '1px solid #eeeeee'
  },
  dishHeader: {
    marginBottom: '14px'
  },
  dishTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
    color: '#111111'
  },
  dishMeta: {
    fontSize: '12px',
    color: '#666666'
  },
  form: {
    backgroundColor: '#fbfbfb',
    padding: '14px',
    borderRadius: '6px',
    border: '1px solid #eeeeee',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  formTitle: {
    margin: '0 0 4px 0',
    fontSize: '13px',
    fontWeight: '600',
    color: '#333333'
  },
  formRow: {
    display: 'flex',
    gap: '8px'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1
  },
  inputLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#555555'
  },
  input: {
    padding: '6px 8px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    fontSize: '12px'
  },
  select: {
    padding: '6px 8px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    fontSize: '12px',
    backgroundColor: '#ffffff'
  },
  textarea: {
    padding: '6px 8px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  submitBtn: {
    padding: '8px 12px',
    backgroundColor: '#0066cc',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    alignSelf: 'flex-start'
  },
  reviewsListSection: {
    marginTop: '16px'
  },
  reviewsHeading: {
    margin: '0 0 10px 0',
    fontSize: '13px',
    fontWeight: '600',
    color: '#333333'
  },
  emptyNote: {
    fontSize: '12px',
    color: '#777777',
    fontStyle: 'italic',
    margin: 0
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  reviewCard: {
    padding: '8px 10px',
    border: '1px solid #eeeeee',
    borderRadius: '4px',
    backgroundColor: '#ffffff'
  },
  reviewTop: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    marginBottom: '2px'
  },
  reviewerName: {
    fontWeight: '600',
    color: '#222222'
  },
  reviewDate: {
    color: '#888888'
  },
  stars: {
    color: '#e69500',
    fontSize: '11px',
    marginBottom: '3px'
  },
  reviewComment: {
    margin: '0 0 4px 0',
    fontSize: '12px',
    color: '#333333'
  },
  mealContextTag: {
    fontSize: '10px',
    color: '#888888',
    fontStyle: 'italic'
  }
};
