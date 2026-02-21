import { useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";

export default function Footer() {
    const navigate = useNavigate();

  return (
    <footer className="bg-slate-800 text-white py-6 mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Button id="btn-home" onClick={() => navigate("/")}>
            Voltar para Home
          </Button>
      </div>
    </footer>
  );
}