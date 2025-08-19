import { useNavigate } from "react-router";
import { useDataRecette } from "../context/RecetteContext.jsx";
import Footer from "../components/footer.jsx";

function imageSrc(img) {
  if (!img) return undefined;
  return img.startsWith("http") ? img : `/images/${img}`;
}


export default function Recettes() {
  const navigate = useNavigate();
  const { recettesFiltrees, favoris, toggleFavori, ingredients } = useDataRecette();

  const open = (id) => navigate(`/recette/${id}`);

  return (
    <div className="recettes-wrap">
      <button onClick={() => navigate(-1)} className="btn-back">←</button>
      <h2>Recettes</h2>

      {ingredients.length === 0 && (
        <p>Ajoutez d’abord un ou plusieurs ingrédients pour voir des recettes.</p>
      )}

      {ingredients.length > 0 && recettesFiltrees.length === 0 && (
        <p>
          Aucune recette ne contient : <strong>{ingredients.join(", ")}</strong>.
        </p>
      )}

      <div className="recipes-grid">
        {recettesFiltrees.map((r) => (
          <article
            key={r.id}
            className="recipe-card"
            role="button"
            tabIndex={0}
            onClick={() => open(r.id)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open(r.id)}
          >
            {/* Bouton favori – n’ouvre PAS la page détail */}
            <button
              className={`fav-btn ${favoris.includes(r.id) ? "active" : ""}`}
              aria-pressed={favoris.includes(r.id)}
              aria-label={favoris.includes(r.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
              title={favoris.includes(r.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavori(r.id);
              }}
            >
              {favoris.includes(r.id) ? "★" : "☆"}
            </button>


            <div className="thumb">
              {r.image && <img src={imageSrc(r.image)} alt={r.nom} />}
            </div>

            <div className="card-body">
              <h3 className="card-title">{r.nom}</h3>
              {r.description && <p className="card-desc">{r.description}</p>}
            </div>
          </article>
        ))}
      </div>

      <Footer />
    </div>
  );
}

