// src/components/Footer.jsx
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <nav>
        <a href="/" aria-label="Accueil">
          <span className="icon icon--home" />
        </a>
        <a href="/recettes" aria-label="Recettes">
          <span className="icon icon--tab" />
        </a>
        <a href="/favoris" aria-label="Favoris">
          <span className="icon icon--fav" />
        </a>
      </nav>
    </div>
  );
}
