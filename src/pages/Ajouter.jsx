import { useState } from "react";
import { useNavigate } from "react-router"; // (react-router seul)
import { useDataRecette } from "../data/DataRecette.jsx";
import Footer from "../components/footer.jsx";

export default function Ajouter() {
  const [saisie, setSaisie] = useState("");
  const navigate = useNavigate();
  const { ingredients, addIngredient, removeIngredient, clearIngredients } = useDataRecette();

  const handleAdd = () => {
    if (saisie.trim() !== "") {
      addIngredient(saisie);
      setSaisie("");
    }
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>←</button>
      <h2>Ajouter des ingrédients</h2>

      <input
        type="text"
        value={saisie}
        onChange={(e) => setSaisie(e.target.value)}
        placeholder="Ex: tomate"
      />
      <button onClick={handleAdd}>Ajouter</button>
      <button onClick={clearIngredients} style={{ marginLeft: 8 }}>Vider</button>

      <ul>
        {ingredients.map((ing) => (
          <li key={ing}>
            {ing} <button onClick={() => removeIngredient(ing)}>x</button>
          </li>
        ))}
      </ul>

      {/* Va à /recettes : l’écran lira recettesFiltrees selon les ingrédients */}
      <button onClick={() => navigate("/recettes")}>Go</button>
      <Footer />
    </div>
     

  );
}
