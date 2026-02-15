import { useState } from "react";
import { submitPurchase } from "../api/purchase.api";

export default function BillPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    promoCode: "",
    instagramUsername: "",
    instagramUserPhone: "",
    totalBill: "",
  });

  const [sarees, setSarees] = useState([
    { sareeId: "", sareeName: "" },
  ]);

  /* ===============================
     BASIC INPUT HANDLER
  =============================== */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ===============================
     SAREE INPUT HANDLER
  =============================== */
  const handleSareeChange = (index, field, value) => {
    setSarees((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      )
    );
  };

  /* ===============================
     REMOVE SAREE ROW
  =============================== */
  const removeSareeRow = (index) => {
    if (sarees.length === 1) {
      alert("At least one saree is required");
      return;
    }

    setSarees((prev) => prev.filter((_, i) => i !== index));
  };

  /* ===============================
     ADD NEW SAREE ROW
  =============================== */
  const addSareeRow = () => {
    const last = sarees[sarees.length - 1];

    if (!last.sareeId || !last.sareeName) {
      alert("Complete the current saree details first");
      return;
    }

    setSarees([...sarees, { sareeId: "", sareeName: "" }]);
  };

  /* ===============================
     SUBMIT BILL
  =============================== */
  const handleSubmit = async () => {
    const {
      promoCode,
      instagramUsername,
      instagramUserPhone,
      totalBill,
    } = form;

    if (
      !promoCode ||
      !instagramUsername ||
      !instagramUserPhone ||
      !totalBill
    ) {
      alert("All fields are required");
      return;
    }

    for (let s of sarees) {
      if (!s.sareeId || !s.sareeName) {
        alert("All saree entries must be complete");
        return;
      }
    }

    // ask for confirmation before submitting
    const confirmed = window.confirm("Do you confirm to submit");
    if (!confirmed) return;

    try {
      setLoading(true);

      await submitPurchase({
        promoCode: promoCode.toUpperCase().trim(),
        instagramUsername: instagramUsername.trim(),
        instagramUserPhone: instagramUserPhone.trim(),
        saree: sarees,
        totalBill: Number(totalBill),
      });

      alert("✅ Bill submitted successfully");

      setForm({
        promoCode: "",
        instagramUsername: "",
        instagramUserPhone: "",
        totalBill: "",
      });

      setSarees([{ sareeId: "", sareeName: "" }]);
    } catch (error) {
      alert(error.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     RENDER
  =============================== */
  return (
    <div className="max-w-md mx-auto my-10 p-5 border border-gray-300 rounded-lg flex flex-col gap-3">
      <h2 className="text-2xl font-semibold">SM Silks – Billing Entry</h2>

      <input
        className="w-full border border-gray-300 rounded px-3 py-2"
        name="promoCode"
        placeholder="Promo Code"
        value={form.promoCode}
        onChange={handleChange}
      />

      <input
        className="w-full border border-gray-300 rounded px-3 py-2"
        name="instagramUsername"
        placeholder="Instagram Username"
        value={form.instagramUsername}
        onChange={handleChange}
      />

      <input
        className="w-full border border-gray-300 rounded px-3 py-2"
        name="instagramUserPhone"
        placeholder="Customer Phone Number"
        value={form.instagramUserPhone}
        onChange={handleChange}
      />

      <h3 className="text-lg font-medium">Saree Details</h3>

      {sarees.map((s, index) => (
        <div key={index} className="flex flex-col md:flex-row md:items-center gap-2">
          <input
            className="w-full md:flex-1 border border-gray-300 rounded px-3 py-2"
            placeholder="Saree ID"
            value={s.sareeId}
            onChange={(e) =>
              handleSareeChange(index, "sareeId", e.target.value)
            }
          />

          <input
            className="w-full md:flex-1 border border-gray-300 rounded px-3 py-2"
            placeholder="Saree Name"
            value={s.sareeName}
            onChange={(e) =>
              handleSareeChange(index, "sareeName", e.target.value)
            }
          />

          <button
            className="self-end w-auto bg-red-600 text-white rounded px-2 py-1 cursor-pointer font-bold hover:bg-red-700 md:ml-2"
            onClick={() => removeSareeRow(index)}
          >
            ✕
          </button>
        </div>
      ))}

      <button
        className="self-end w-auto bg-blue-600 text-white rounded px-3 py-2 cursor-pointer font-medium hover:bg-blue-700"
        onClick={addSareeRow}
      >
        + Add Saree
      </button>

      <input
        className="w-full border border-gray-300 rounded px-3 py-2"
        type="number"
        name="totalBill"
        placeholder="Total Bill Amount"
        value={form.totalBill}
        onChange={handleChange}
      />

      <button
        className="w-full bg-green-600 text-white rounded px-3 py-2 cursor-pointer font-medium hover:bg-green-700 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Bill"}
      </button>
    </div>
  );
}

/* ===============================
   MINIMAL STYLES (not used)
=============================== */
const styles = {
  container: {
    maxWidth: "450px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sareeRow: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  removeBtn: {
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
