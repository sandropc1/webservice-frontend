import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div class="flex flex-col min-h-screen">
      <div class="flex flex-col flex-grow align-center max-w-3xl mx-auto">
        <h1 class="p-3 font-bold">Bem-vindo ao MarshmallowAPI!</h1>
        <p class="p-3">
          Esta aplicação faz parte do meu portfólio e foi desenvolvida com foco
          em aprendizado prático de desenvolvimento full stack.
        </p>
        <p class="p-3">
          Aqui exploro integração entre front-end e back-end, organização de
          componentes, consumo de APIs e boas práticas de código. O objetivo é
          evoluir constantemente a arquitetura e experimentar soluções modernas
          do ecossistema web.
        </p>
      </div>
      <Footer />
    </div>
  );
}
