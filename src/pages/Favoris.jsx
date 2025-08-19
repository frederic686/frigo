// src/pages/Favoris.jsx
import { useMemo } from "react";
import { useDataRecette } from "../context/RecetteContext.jsx";
import Footer from "../components/footer.jsx";

function imageSrc(img) {
  if (!img) return undefined;
  return img.startsWith("http") ? img : `/images/${img}`;
}

export default function Favoris() {
  const { recettes, favoris, toggleFavori } = useDataRecette();

  const favSet = useMemo(() => new Set(favoris.map(Number)), [favoris]);
  const recettesFav = useMemo(
    () => recettes.filter((r) => favSet.has(Number(r.id))),
    [recettes, favSet]
  );

  if (recettesFav.length === 0) return <p>Aucun favori</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>←</button>
      <h2>Mes favoris</h2>
      {recettesFav.map((r) => (
        <div key={r.id} className="recipe-card">
          <h3>{r.nom}</h3>
          {r.image && <img src={imageSrc(r.image)} alt={r.nom} width="150" />}
          <button onClick={() => toggleFavori(r.id)}>Retirer</button>
        </div>
      ))}
      <Footer />
    </div>
  );
}
