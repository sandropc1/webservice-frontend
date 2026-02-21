import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div class="flex flex-col min-h-screen">
        <div class="flex-grow">
            <p class = "p-3">Esta aplicação foi desenvolvida como parte da minha jornada de aprendizado em desenvolvimento web.Aqui pratico integração com APIs, organização de componentes e uso de ferramentas modernas do ecossistema
             JavaScript. </p>

            <p class = "p-3">Mais do que um sistema funcional, este projeto representa experimentação, evolução e aprimoramento constante das minhas habilidades técnicas.</p>
        </div>
          <Footer />
    </div>

  );
}