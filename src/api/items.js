// src/api/items.js – thin wrapper around the backend API
export async function getItems(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/items${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch items');
  return await res.json();
}

export async function getItem(id) {
  const res = await fetch(`/api/items/${id}`);
  if (!res.ok) throw new Error('Item not found');
  return await res.json();
}

export async function createItem(formData) {
  const res = await fetch('/api/items', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Unable to publish report');
  return data;
}

export async function claimItem(id) {
  const res = await fetch(`/api/items/${id}/claim`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Unable to update item');
  return await res.json();
}
