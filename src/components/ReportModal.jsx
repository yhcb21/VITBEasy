// src/components/ReportModal.jsx
import React, { useRef } from "react";

export default function ReportModal({ type, onClose, onSubmit }) {
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData();
    formData.append("title", form.title.value.trim());
    formData.append("type", form.type.value);
    formData.append("category", form.category.value);
    formData.append("location", form.location.value.trim());
    formData.append("date", form.date.value);
    formData.append("description", form.description.value.trim());
    formData.append("postedBy", form.postedBy.value.trim());
    formData.append("contact", form.contact.value.trim());
    if (form.image.files[0]) {
      formData.append("image", form.image.files[0]);
    }
    await onSubmit(formData);
    form.reset();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        <p className="eyebrow">VITBeasy</p>
        <h2 id="modalTitle">{type === "lost" ? "Report Lost Item" : "Report Found Item"}</h2>
        <form ref={formRef} onSubmit={handleSubmit} id="itemForm">
          <input type="hidden" name="type" defaultValue={type} />
          <label>
            Item name
            <input name="title" required placeholder="e.g. Black wallet" />
          </label>
          <label>
            Category
            <select name="category" required>
              <option value="">Select category</option>
              <option>Electronics</option>
              <option>Documents</option>
              <option>Accessories</option>
              <option>Bags</option>
              <option>Clothing</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Location
            <input name="location" required placeholder="Library Block A, Gym..." />
          </label>
          <label>
            Date
            <input name="date" type="date" required />
          </label>
          <label>
            Description
            <textarea name="description" required placeholder="Colour, brand, identifying details..." />
          </label>
          <label>
            Upload Item Image <small>(optional)</small>
            <input name="image" type="file" accept="image/*" />
          </label>
          <label>
            Your name
            <input name="postedBy" required placeholder="Enter your name" />
          </label>
          <label>
            Contact information
            <input name="contact" required placeholder="Phone number or email" />
          </label>
          <button className="primary full" type="submit">Publish Item →</button>
        </form>
      </div>
    </div>
  );
}
