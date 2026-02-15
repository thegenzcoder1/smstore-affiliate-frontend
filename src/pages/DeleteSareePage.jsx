import { useEffect, useRef, useState } from "react";
import {
  getAllSarees,
  searchSareeById,
  searchSareeByName,
  deleteSaree,
} from "../api/saree.api";

export default function DeleteSareePage() {
  const LIMIT = 10;

  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");

  const [offset, setOffset] = useState(0);
  const [pagination, setPagination] = useState({ hasMore: false });

  // 🛡️ Prevent race conditions
  const requestIdRef = useRef(0);

  /* ===============================
     CORE FETCH EFFECT
  =============================== */
  useEffect(() => {
    const fetchData = async () => {
      const requestId = ++requestIdRef.current;

      try {
        setLoading(true);
        setSarees([]); // clear BEFORE fetch

        let res;

        if (!searchId.trim() && !searchName.trim()) {
          res = await getAllSarees(offset, LIMIT);
        } else if (searchId.trim()) {
          res = await searchSareeById(searchId.trim(), offset, LIMIT);
        } else if (searchName.trim()) {
          res = await searchSareeByName(searchName.trim(), offset, LIMIT);
        }

        // ❌ Ignore outdated responses
        if (requestId !== requestIdRef.current) return;

        setSarees(res?.data || []);
        setPagination(res?.pagination || { hasMore: false });
      } catch (error) {
        if (requestId === requestIdRef.current) {
          console.error(error);
          alert(error.message || "Failed to load sarees");
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [searchId, searchName, offset]);

  /* ===============================
     SEARCH HANDLERS
  =============================== */
  const handleSearchById = (value) => {
    setSearchId(value);
    setSearchName("");
    setOffset(0);
  };

  const handleSearchByName = (value) => {
    setSearchName(value);
    setSearchId("");
    setOffset(0);
  };

  /* ===============================
     PAGINATION
  =============================== */
  const handleNext = () => {
    if (pagination.hasMore) {
      setOffset((o) => o + LIMIT);
    }
  };

  const handlePrev = () => {
    setOffset((o) => Math.max(o - LIMIT, 0));
  };

  /* ===============================
     DELETE SAREE
  =============================== */
  const handleDelete = async (sareeId) => {
    if (!window.confirm("Delete this saree permanently?")) return;

    try {
      await deleteSaree({ sareeId });
      setSarees((prev) => prev.filter((s) => s.sareeId !== sareeId));
      alert(`✅ Saree ${sareeId} deleted`);
    } catch (error) {
      alert(error.message || "Failed to delete saree");
    }
  };

  /* ===============================
     RENDER
  =============================== */
  return (
    <div className="max-w-3xl mx-auto p-4 my-8">
      <h2 className="text-2xl font-semibold mb-4">Delete Saree</h2>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          className="w-full md:flex-1 border border-gray-300 rounded px-3 py-2"
          placeholder="Search by Saree ID"
          value={searchId}
          onChange={(e) => handleSearchById(e.target.value)}
        />
        <input
          className="w-full md:flex-1 border border-gray-300 rounded px-3 py-2"
          placeholder="Search by Saree Name"
          value={searchName}
          onChange={(e) => handleSearchByName(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2">Saree ID</th>
              <th className="text-left px-4 py-2">Saree Name</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {sarees.map((s) => (
              <tr key={s.sareeId} className="border-t">
                <td className="px-4 py-2">{s.sareeId}</td>
                <td className="px-4 py-2">{s.sareeName}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(s.sareeId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {!loading && sarees.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center px-4 py-4">
                  No sarees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={handlePrev}
          disabled={offset === 0}
        >
          ◀ Previous
        </button>
        <button
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={!pagination.hasMore}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

/* ===============================
   STYLES (not used)
=============================== */
const styles = {
  container: {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
  },
  searchRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  deleteBtn: {
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
  pagination: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
  },
};
