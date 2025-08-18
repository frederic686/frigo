import { createContext, useContext, useEffect, useMemo, useState } from "react";
import recettesSource from "./recettes_cuisine.json";

const IngredientsContext = createContext(null);

function normalize(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

// souplesse de matching
function matchIng(ingSaisi, ingRecette) {
  const a = normalize(ingSaisi);
  const b = normalize(ingRecette);
  return a.length >= 2 && (b.includes(a) || a.includes(b));
}

export function IngredientsProvider({ children }) {
  const [ingredients, setIngredients] = useState([]); // ex: ["tomate","poulet"]

  // ⚠️ Favoris persistés + ids en Number
  const [favoris, setFavoris] = useState(() => {
    try {
      const raw = localStorage.getItem("fv_favoris");
      const arr = raw ? JSON.parse(raw) : [];
      return arr.map((x) => Number(x));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("fv_favoris", JSON.stringify(favoris));
  }, [favoris]);

  const addIngredient = (ing) => {
    const clean = normalize(ing);
    if (!clean) return;
    if (!ingredients.some((i) => normalize(i) === clean)) {
      setIngredients((prev) => [...prev, ing.trim()]);
    }
  };

  const removeIngredient = (ing) => {
    setIngredients((prev) => prev.filter((i) => i !== ing));
  };

  const clearIngredients = () => setIngredients([]);

  // ✅ on normalise les ids des recettes
  const recettes = useMemo(
    () => recettesSource.map((r) => ({ ...r, id: Number(r.id) })),
    []
  );

  // ✅ toggle immuable + Number(id)
  const toggleFavori = (id) => {
    const nid = Number(id);
    setFavoris((prev) =>
      prev.includes(nid) ? prev.filter((x) => x !== nid) : [...prev, nid]
    );
  };

  // === FILTRAGE PRINCIPAL === (utilise `recettes` normalisées)
  const recettesFiltrees = useMemo(() => {
    if (ingredients.length === 0) return [];
    const ingNorm = ingredients.map(normalize);

    return recettes.filter((recette) => {
      const nomsRecette = (recette.ingredients || []).map((it) => it.nom);
      return ingNorm.every((ingSaisi) =>
        nomsRecette.some((n) => matchIng(ingSaisi, n))
      );
    });
  }, [ingredients, recettes]);

  return (
    <IngredientsContext.Provider
      value={{
        // 🔥 expose aussi `recettes` pour la page Favoris
        recettes,
        recettesFiltrees,

        ingredients,
        addIngredient,
        removeIngredient,
        clearIngredients,

        favoris,
        toggleFavori,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  );
}

export function useDataRecette() {
  const ctx = useContext(IngredientsContext);
  if (!ctx) throw new Error("useDataRecette must be used within IngredientsProvider");
  return ctx;
}
