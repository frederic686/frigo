import { useState } from "react";
import Ajouter from "./Ajouter";
import "../styles/styles.css";

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
          <p>The app that helps you eat better by using your leftovers and saving as much as possible!</p>
          <button className="btn-go" onClick={() => setPage("ajouter")}>
            What’s in your fridge?
          </button>
        </div>
      )}

      {page === "ajouter" && <Ajouter />}
    </div>
  );
}
