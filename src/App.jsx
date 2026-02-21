import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";



export default function App() {
  return (
    <div class="font-sans min-h-screen flex flex-col">
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
    </div>
  );
}