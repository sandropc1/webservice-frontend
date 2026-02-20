import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <p>Página inicial. Escolha um módulo:</p>

      <div style={{ display: "flex", gap: 8 }}>
        <Link to="/users" style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}>
          Ir para Users
        </Link>
        <Link to="/orders" style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}>
          Ir para Orders
        </Link>
      </div>
    </div>
  );
}