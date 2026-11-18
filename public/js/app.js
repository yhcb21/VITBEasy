
let selectedType = "";
let selectedCategory = "All";

// Search
function getSearch() {
  return (
    document.getElementById("heroSearch").value ||
    document.getElementById("search").value
  ).trim();
}

// Fetch actual MongoDB records
async function loadItems() {
  const root = document.getElementById("items");
  root.innerHTML = '<p class="muted">Loading items...</p>';

  try {
    const params = new URLSearchParams();

    if (selectedType) params.set("type", selectedType);

    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }

    if (getSearch()) params.set("search", getSearch());

    const response = await fetch("/api/items?" + params.toString());

    if (!response.ok) {
      throw new Error("Unable to fetch items");
    }

    const items = await response.json();
    render(items);

  } catch (error) {
    root.innerHTML =
      '<p class="muted">Unable to load items. Please check your server connection.</p>';

    console.error(error);
  }
}

// Display items
function render(items) {
  const root = document.getElementById("items");

  if (!items.length) {
    root.innerHTML =
      '<div class="muted">No items found. Try another search.</div>';
    return;
  }

  root.innerHTML = items.map(item => `
    <article class="card" onclick="viewItem('${item._id}')">

      <div class="thumb">
        ${item.image
          ? `<img src="${escapeHtml(item.image)}"
                 alt="${escapeHtml(item.title)}"
                 onerror="this.style.display='none'">`
          : '<div class="placeholder">◇</div>'}
      </div>

      <div class="card-body">
        <span class="badge ${item.type}">
          ${escapeHtml(item.type)}
        </span>

        <h3>${escapeHtml(item.title)}</h3>

        <div class="muted">
          ⌖ ${escapeHtml(item.location)}
        </div>

        <div class="meta">
          <span>${formatDate(item.date)}</span>
          <span>${escapeHtml(item.status)}</span>
        </div>
      </div>

    </article>
  `).join("");
}

// View item details
async function viewItem(id) {
  try {
    const response = await fetch(`/api/items/${id}`);

    if (!response.ok) {
      throw new Error("Item not found");
    }

    const item = await response.json();

    document.getElementById("itemDetails").innerHTML = `
      <p class="eyebrow">${escapeHtml(item.type)} ITEM</p>

      <h2>${escapeHtml(item.title)}</h2>

      ${item.image
        ? `<img src="${escapeHtml(item.image)}"
             alt="${escapeHtml(item.title)}"
             style="width:100%;max-height:220px;object-fit:cover;border-radius:12px;">`
        : ""}

      <p><strong>Category:</strong> ${escapeHtml(item.category)}</p>

      <p><strong>Description:</strong> ${escapeHtml(item.description)}</p>

      <p><strong>Location:</strong> ${escapeHtml(item.location)}</p>

      <p><strong>Date:</strong> ${formatDate(item.date)}</p>

      <p><strong>Reported by:</strong> ${escapeHtml(item.postedBy)}</p>

      <p><strong>Contact:</strong> ${escapeHtml(item.contact)}</p>

      <p><strong>Status:</strong> ${escapeHtml(item.status)}</p>

      ${item.status === "active"
        ? `<button class="primary full"
             onclick="claimItem('${item._id}')">
             Mark as Claimed
           </button>`
        : '<p class="muted">This item has been marked as claimed.</p>'}
    `;

    document.getElementById("detailsModal").classList.remove("hidden");

  } catch (error) {
    showToast(error.message);
  }
}

// Close details modal
function closeDetails() {
  document.getElementById("detailsModal").classList.add("hidden");
}

// Mark item as claimed
async function claimItem(id) {
  if (!confirm("Are you sure you want to mark this item as claimed?")) {
    return;
  }

  try {
    const response = await fetch(`/api/items/${id}/claim`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error("Unable to update item");
    }

    showToast("Item marked as claimed!");

    closeDetails();
    loadItems();

  } catch (error) {
    showToast(error.message);
  }
}

// Date formatting
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

// Escape HTML
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

// Open report modal
function openModal(type) {
  document.getElementById("type").value = type;

  document.getElementById("modalTitle").textContent =
    type === "lost" ? "Report Lost Item" : "Report Found Item";

  document.getElementById("modal").classList.remove("hidden");
}

// Close report modal
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// Filters
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    selectedType = button.dataset.type;

    loadItems();
  });
});

// Category filters
document.querySelectorAll(".cat").forEach(button => {
  button.addEventListener("click", () => {

    document.querySelectorAll(".cat").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    selectedCategory = button.dataset.category;

    loadItems();
  });
});

// Search from top search box
document.getElementById("search").addEventListener("input", event => {
  document.getElementById("heroSearch").value = event.target.value;
  loadItems();
});

// Search from hero search box
document.getElementById("heroSearch").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    document.getElementById("search").value = event.target.value;
    loadItems();
  }
});

// Submit report with image upload
document.getElementById("itemForm").addEventListener("submit", async event => {
  event.preventDefault();

  const formData = new FormData();

  formData.append("title", document.getElementById("title").value.trim());

  formData.append("type", document.getElementById("type").value);

  formData.append("category", document.getElementById("category").value);

  formData.append("location", document.getElementById("location").value.trim());

  formData.append("date", document.getElementById("date").value);

  formData.append("description", document.getElementById("description").value.trim());

  formData.append("postedBy", document.getElementById("postedBy").value.trim());

  formData.append("contact", document.getElementById("contact").value.trim());

  // Get selected image
  const imageFile = document.getElementById("image").files[0];

  if (imageFile) {

    // Check image size (5 MB maximum)
    if (imageFile.size > 5 * 1024 * 1024) {
      showToast("Image must be smaller than 5 MB");
      return;
    }

    // Check image type
    if (!imageFile.type.startsWith("image/")) {
      showToast("Please select a valid image");
      return;
    }

    formData.append("image", imageFile);
  }

  try {
    const response = await fetch("/api/items", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to publish report");
    }

    showToast("Report published successfully!");

    event.target.reset();

    closeModal();

    loadItems();

  } catch (error) {
    showToast(error.message);
    console.error(error);
  }
});

// Toast notifications
function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// Initial load
loadItems();
