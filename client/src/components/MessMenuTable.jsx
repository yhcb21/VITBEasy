import React from 'react';

const MEAL_TYPES = [
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'evening_snacks', label: 'Evening Snacks' },
  { key: 'dinner', label: 'Dinner' }
];

export default function MessMenuTable({ menuData, onMealClick }) {
  if (!menuData || !menuData.days) {
    return <p style={styles.emptyText}>No menu data available.</p>;
  }

  const handleCellClick = (dayObj, meal) => {
    if (!onMealClick) return;

    const items = dayObj.meals[meal.key] || [];
    const validItems = items.filter((item) => item !== 'NA');

    // Send a structured slot object to the parent component
    onMealClick({
      day: dayObj.day,
      date: dayObj.date,
      mealKey: meal.key,
      mealType: meal.label,
      items: validItems
    });
  };

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.cornerHeader}>Day</th>
            {MEAL_TYPES.map((meal) => (
              <th key={meal.key} style={styles.headerCell}>
                {meal.label}
                {menuData.timings && menuData.timings[meal.key] && (
                  <div style={styles.timing}>
                    {menuData.timings[meal.key].start} - {menuData.timings[meal.key].end}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {menuData.days.map((dayObj) => (
            <tr key={dayObj.day}>
              <td style={styles.dayCell}>
                <div style={styles.dayName}>{dayObj.day}</div>
                <div style={styles.dateText}>{dayObj.date}</div>
              </td>

              {MEAL_TYPES.map((meal) => {
                const items = dayObj.meals[meal.key] || [];
                const validItems = items.filter((item) => item !== 'NA');

                return (
                  <td
                    key={meal.key}
                    style={styles.cell}
                    onClick={() => handleCellClick(dayObj, meal)}
                    title="Click to view/add reviews"
                  >
                    <ul style={styles.itemList}>
                      {validItems.map((item, idx) => (
                        <li key={idx} style={styles.itemText}>{item}</li>
                      ))}
                    </ul>
                    <div style={styles.hintText}>Click for reviews</div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableWrapper: {
    overflowX: 'auto',
    border: '1px solid #cccccc',
    backgroundColor: '#ffffff'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  cornerHeader: {
    padding: '12px',
    border: '1px solid #cccccc',
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    width: '130px',
    fontSize: '14px'
  },
  headerCell: {
    padding: '12px',
    border: '1px solid #cccccc',
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  timing: {
    fontSize: '11px',
    fontWeight: 'normal',
    color: '#666666',
    marginTop: '2px'
  },
  dayCell: {
    padding: '12px',
    border: '1px solid #cccccc',
    backgroundColor: '#fafafa',
    verticalAlign: 'top'
  },
  dayName: {
    fontWeight: 'bold',
    fontSize: '14px'
  },
  dateText: {
    fontSize: '12px',
    color: '#666666',
    marginTop: '2px'
  },
  cell: {
    padding: '10px 12px',
    border: '1px solid #cccccc',
    verticalAlign: 'top',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    minWidth: '180px'
  },
  itemList: {
    margin: '0 0 8px 0',
    paddingLeft: '16px',
    fontSize: '12px',
    lineHeight: '1.4'
  },
  itemText: {
    marginBottom: '3px'
  },
  hintText: {
    fontSize: '11px',
    color: '#0066cc',
    textDecoration: 'underline'
  },
  emptyText: {
    color: '#666666',
    fontSize: '14px'
  }
};
