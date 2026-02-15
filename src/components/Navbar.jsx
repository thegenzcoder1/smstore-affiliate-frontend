import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white rounded-b-lg overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center md:justify-between">
        <h3 className="text-lg font-semibold m-0">SM Silks</h3>

        <div className="flex gap-4 mt-2 md:mt-0">
          <Link to="/bill-page" className="text-white no-underline font-medium hover:text-gray-300">
            Billing
          </Link>

          <Link to="/delete-sareeid" className="text-white no-underline font-medium hover:text-gray-300">
            Delete Saree
          </Link>
        </div>
      </div>
    </nav>
  );
}


//------Initial inline styles (not used)------//
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#111",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "16px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
  },
};
