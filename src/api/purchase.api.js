const API = "https://api.kancheepuramsmsilks.net/api";
// const API = "http://localhost:5000/api";
export const submitPurchase = async (payload) => {
  const res = await fetch(`${API}/complete-purchase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
