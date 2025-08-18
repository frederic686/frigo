// src/pages/RecetteComplet.jsx
import { useParams, useNavigate } from "react-router";
import { useMemo } from "react";
import { useDataRecette } from "../data/DataRecette.jsx";
import recettes from "../data/recettes_cuisine.json"; // JSON dans le même dossier "data"

function imageSrc(img) {
  if (!img) return undefined;
  return img.startsWith("http") ? img : `/images/${img}`;
}

export default function RecetteComplet() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Si tu n'as pas de favoris/toggleFavori, tu peux retirer ces lignes
  const { favoris, toggleFavori } = useDataRecette();

  const recette = useMemo(
    () => recettes.find((r) => String(r.id) === String(id)),
    [id]
  );

  if (!recette) {
    return (
      <div className="recipe-details">
        <p>Recette introuvable.</p>
        <button onClick={() => navigate(-1)}>←</button>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>
        ←
      </button>

      <h2>{recette.nom}</h2>

      {recette.image && (
        <img
          src={imageSrc(recette.image)}
          alt={recette.nom}
          width="300"
          style={{ display: "block", marginBottom: 12 }}
        />
      )}

      {recette.description && <p>{recette.description}</p>}

      {/* Ingrédients */}
      {Array.isArray(recette.ingredients) && recette.ingredients.length > 0 && (
        <>
          <h3>Ingrédients</h3>
          <ul>
            {recette.ingredients.map((it, idx) => (
              <li key={idx}>
                {it.nom}
                {it.quantite ? ` — ${it.quantite}` : ""}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Étapes / instructions si présentes dans le JSON */}
      {Array.isArray(recette.etapes) && recette.etapes.length > 0 && (
        <>
          <h3>Étapes</h3>
          <ol>
            {recette.etapes.map((etape, i) => (
              <li key={i}>{etape}</li>
            ))}
          </ol>
        </>
      )}

      {/* Bouton Favori optionnel (si contexte présent) */}
      {typeof toggleFavori === "function" && Array.isArray(favoris) && (
        <button onClick={() => toggleFavori(recette.id)} style={{ marginTop: 12 }}>
          {favoris.includes(recette.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
        </button>
      )}
    </div>
  );
}
