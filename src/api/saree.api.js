// src/api/saree.api.js

const API = "https://api.kancheepuramsmsilks.net/api";
// const API = "http://localhost:5000/api";

/* ===============================
   GET ALL SAREES (PAGINATED)
   GET /sarees?offset=0&limit=10
=============================== */
export const getAllSarees = async (offset = 0, limit = 10) => {
  const res = await fetch(
    `${API}/sarees?offset=${offset}&limit=${limit}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch sarees");
  }

  return data; // { data, pagination }
};

/* ===============================
   SEARCH BY SAREE ID (PAGINATED)
   GET /search/sareeId?ref=XXX&offset=0&limit=10
=============================== */
export const searchSareeById = async (
  ref,
  offset = 0,
  limit = 10
) => {
  const res = await fetch(
    `${API}/search/sareeId?ref=${encodeURIComponent(
      ref
    )}&offset=${offset}&limit=${limit}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to search saree by ID"
    );
  }

  return data; // { data, pagination }
};

/* ===============================
   SEARCH BY SAREE NAME (PAGINATED)
   GET /search/sareeName?ref=ABC&offset=0&limit=10
=============================== */
export const searchSareeByName = async (
  ref,
  offset = 0,
  limit = 10
) => {
  const res = await fetch(
    `${API}/search/sareeName?ref=${encodeURIComponent(
      ref
    )}&offset=${offset}&limit=${limit}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to search saree by name"
    );
  }

  return data; // { data, pagination }
};

/* ===============================
   DELETE SAREE
   DELETE /saree
   Body: { sareeId }
=============================== */
export const deleteSaree = async ({ sareeId }) => {
  const res = await fetch(`${API}/saree`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sareeId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete saree");
  }

  return data; // { message, sareeId }
};
