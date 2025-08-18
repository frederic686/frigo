import { useState } from "react";
import Ajouter from "./Ajouter";

export default function App() {
  const [page, setPage] = useState("accueil");

  return (
    <div>
      {page === "accueil" && (
        <div>
          <h2>Empty Fridge</h2>
          <div className="frigo">
            <img src="/images/frigo-vide.png" alt="Frigo" />
          </div>
          <p>Ajoutez vos ingrédients et trouvez des recettes adaptées.</p>
          <button onClick={() => setPage("ajouter")}>
            Qu’as-tu dans ton frigo ?
          </button>
        </div>
      )}

      {page === "ajouter" && <Ajouter />}
    </div>
  );
}
