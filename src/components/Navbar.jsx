import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav class="flex flex-row text-white gap-30 bg-slate-800 p-8 border-b">
      <div class="flex flex-row items-center">
        <img src={logo} alt="Logo" className="h-13 w-auto" />
        <span class="text-3xl">MarshMallowAPI</span>
      </div>
      <div class="flex flex-row items-center gap-12">
        <Link
          to="/"
          style={{ fontWeight: location.pathname === "/" ? "bold" : "normal" }}
        >
          Home
        </Link>

        <Link
          to="/users"
          style={{
            fontWeight: location.pathname === "/users" ? "bold" : "normal",
          }}
        >
          Users
        </Link>

        <Link
          to="/orders"
          style={{
            fontWeight: location.pathname === "/orders" ? "bold" : "normal",
          }}
        >
          Orders
        </Link>
        <Link
          to="/categories"
          style={{
            fontWeight: location.pathname === "/categories" ? "bold" : "normal",
          }}
        >
          Categories
        </Link>
        <Link
          to="/products"
          style={{
            fontWeight: location.pathname === "/products" ? "bold" : "normal",
          }}
        >
          Products
        </Link>
      </div>
    </nav>
  );
}
