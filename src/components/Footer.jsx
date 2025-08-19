// src/components/Footer.jsx
import "./footer.css";
import { useDataRecette } from "../context/RecetteContext.jsx";

export default function Footer() {
  const { favoris } = useDataRecette();

  return (
    <div className="footer">
      <nav>
        <a href="/" aria-label="Accueil">
          <span className="icon icon--home" />
        </a>

        <a href="/recettes" aria-label="Recettes">
          <span className="icon icon--tab" />
        </a>

        <a href="/favoris" aria-label="Favoris" className="fav-link">
          <span className="icon icon--fav" />
          {favoris.length > 0 && (
            <span className="badge">{favoris.length}</span>
          )}
        </a>
      </nav>
    </div>
  );
}

