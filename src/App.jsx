// src/App.jsx – Main application component
import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import SearchBar from './components/SearchBar.jsx';
import CategoryBar from './components/CategoryBar.jsx';
import FilterBar from './components/FilterBar.jsx';
import ItemsGrid from './components/ItemsGrid.jsx';
import ReportModal from './components/ReportModal.jsx';
import ItemDetailsModal from './components/ItemDetailsModal.jsx';
import Toast from './components/Toast.jsx';
import { getItems, claimItem as apiClaimItem, createItem } from './api/items.js';

export default function App() {
  // UI state
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState(''); // "lost" or "found" or ""
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal handling
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState('lost'); // 'lost' | 'found'

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Toast message
  const [toastMessage, setToastMessage] = useState('');

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (typeFilter) params.type = typeFilter;
      if (categoryFilter && categoryFilter !== 'All') params.category = categoryFilter;
      if (searchQuery) params.search = searchQuery;
      const data = await getItems(params);
      setItems(data);
    } catch (e) {
      setError(e.message || 'Unable to load items');
    } finally {
      setLoading(false);
    }
  }, [typeFilter, categoryFilter, searchQuery]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Handlers for modals
  const openReportModal = (type) => {
    setReportType(type);
    setReportModalOpen(true);
  };
  const closeReportModal = () => setReportModalOpen(false);

  const openDetailsModal = (item) => {
    setSelectedItem(item);
    setDetailsModalOpen(true);
  };
  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedItem(null);
  };

  // Claim item
  const claimItem = async (id) => {
    if (!window.confirm('Are you sure you want to mark this item as claimed?')) return;
    try {
      await apiClaimItem(id);
      setToastMessage('Item marked as claimed!');
      closeDetailsModal();
      loadItems();
    } catch (e) {
      setToastMessage(e.message || 'Unable to claim item');
    }
  };

  // Submit report (create item)
  const submitReport = async (formData) => {
    try {
      await createItem(formData);
      setToastMessage('Report published successfully!');
      closeReportModal();
      loadItems();
    } catch (e) {
      setToastMessage(e.message || 'Unable to publish report');
    }
  };

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero onReport={openReportModal} />
        <section className="quick">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={loadItems}
          />
          <CategoryBar
            selected={categoryFilter}
            onSelect={setCategoryFilter}
          />
        </section>
        <section className="content">
          <div className="section-head">
            <div>
              <p className="eyebrow">Campus community</p>
              <h2>Recent Items</h2>
            </div>
            <FilterBar selected={typeFilter} onSelect={setTypeFilter} />
          </div>
          {loading && <p className="muted">Loading items…</p>}
          {error && <p className="muted">{error}</p>}
          <ItemsGrid items={items} onItemClick={openDetailsModal} />
          {items.length === 0 && !loading && !error && (
            <p className="muted">No items found. Try another search.</p>
          )}
        </section>
      </main>

      {reportModalOpen && (
        <ReportModal
          type={reportType}
          onClose={closeReportModal}
          onSubmit={submitReport}
        />
      )}
      {detailsModalOpen && selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          onClose={closeDetailsModal}
          onClaim={claimItem}
        />
      )}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </div>
  );
}
