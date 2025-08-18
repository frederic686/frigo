import { useNavigate } from "react-router";
import { useDataRecette } from "../data/DataRecette.jsx";
import Footer from "../components/footer.jsx";

function imageSrc(img) {
  if (!img) return undefined;
  return img.startsWith("http") ? img : `/images/${img}`;
}

export default function Recettes() {
  const navigate = useNavigate();
  const { recettesFiltrees, favoris, toggleFavori, ingredients } = useDataRecette();

  return (
    <div>
      <button onClick={() => navigate(-1)}>←</button>
      <h2>Recettes</h2>

      {ingredients.length === 0 && (
        <p>Ajoutez d’abord un ou plusieurs ingrédients pour voir des recettes.</p>
      )}

      {ingredients.length > 0 && recettesFiltrees.length === 0 && (
        <p>
          Aucune recette ne contient : <strong>{ingredients.join(", ")}</strong>.
        </p>
      )}

      {recettesFiltrees.map((r) => (
        <div key={r.id} className="recipe-card">
          <h3>{r.nom}</h3>
          {r.image && <img src={imageSrc(r.image)} alt={r.nom} width="150" />}
          <p>{r.description}</p>

          <button onClick={() => navigate(`/recette/${r.id}`)}>Voir</button>{" "}
          <button onClick={() => toggleFavori(r.id)}>
            {favoris.includes(r.id) ? "Retirer" : "Favori"}
          </button>
        </div>
      ))}
      <Footer />
    </div>
    
  );
}
