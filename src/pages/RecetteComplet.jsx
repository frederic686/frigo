// src/pages/RecetteComplet.jsx
import { useParams, useNavigate } from "react-router";
import { useMemo } from "react";
import { useDataRecette } from "../context/RecetteContext.jsx";
import recettes from "../context/recettes_cuisine.json"; // JSON dans le même dossier "data"

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
        <button className="btn-back" onClick={() => navigate(-1)}>←</button>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <button className="btn-back"onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>
        ← Apple Or Peach Strudel with honney 
      </button>

      <h2>{recette.nom}</h2>
      <div className="detail">
        <div className="imgdetail">
          {recette.image && (
            <img
              src={imageSrc(recette.image)}
              alt={recette.nom}
              width="300"
              style={{ display: "block", marginBottom: 12 }}
            />
          )}
        </div>
        <div className="recipe-meta">
          {recette.temps_preparation && (
            <span title="Temps de préparation">⏱️ {recette.temps_preparation}</span>
          )}
          {recette.temps_cuisson && (
            <span title="Temps de cuisson">🍳 {recette.temps_cuisson}</span>
          )}
          {typeof recette.nombre_personnes !== "undefined" && (
            <span title="Nombre de personnes">👥 {recette.nombre_personnes} pers.</span>
          )}
          {typeof toggleFavori === "function" && Array.isArray(favoris) && (
          <button onClick={() => toggleFavori(recette.id)} style={{ marginTop: 12 }}>
            {favoris.includes(recette.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
          </button>
          )}
        </div>
      </div>

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
    </div>
  );
}
 