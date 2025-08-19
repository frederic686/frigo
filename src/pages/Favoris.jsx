// src/pages/Favoris.jsx
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useDataRecette } from "../context/RecetteContext.jsx";
import Footer from "../components/footer.jsx";

function imageSrc(img) {
  if (!img) return undefined;
  return img.startsWith("http") ? img : `/images/${img}`;
}

export default function Favoris() {
  const navigate = useNavigate();
  const { recettes, favoris, toggleFavori } = useDataRecette();

  // Set pour lookup rapide + homogénéisation en Number
  const favSet = useMemo(() => new Set(favoris.map(Number)), [favoris]);

  // On garde SEULEMENT les recettes dont l'id est dans favSet
  const recettesFav = useMemo(
    () => recettes.filter((r) => favSet.has(Number(r.id))),
    [recettes, favSet]
  );

  const open = (id) => navigate(`/recette/${id}`);

  if (recettesFav.length === 0) {
    return (
      <div className="recettes-wrap">
        <button onClick={() => navigate(-1)} className="btn-back">←</button>
        <h2>Mes favoris</h2>
        <p>Aucun favori</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="recettes-wrap">
      <button onClick={() => navigate(-1)} className="btn-back">←</button>
      <h2>Mes favoris</h2>

      <div className="recipes-grid">
        {recettesFav.map((r) => {
          const isFav = favSet.has(Number(r.id));
          return (
            <article
              key={r.id}
              className="recipe-card"
              role="button"
              tabIndex={0}
              onClick={() => open(r.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open(r.id)}
            >
              {/* Bouton favori – ne navigue pas */}
              <button
                className={`fav-btn ${isFav ? "active" : ""}`}
                aria-pressed={isFav}
                aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
                title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavori(r.id);
                }}
              >
                {isFav ? "★" : "☆"}
              </button>

              <div className="thumb">
                {r.image && <img src={imageSrc(r.image)} alt={r.nom} />}
              </div>

              <div className="card-body">
                <h3 className="card-title">{r.nom}</h3>
                {r.description && <p className="card-desc">{r.description}</p>}
              </div>
            </article>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
