import { useState } from "react";
import { useNavigate } from "react-router"; // (react-router seul)
import { useDataRecette } from "../context/RecetteContext.jsx";
import Footer from "../components/footer.jsx";
import "../styles/styles.css";

export default function Ajouter() {
  const [saisie, setSaisie] = useState("");
  const navigate = useNavigate();
  const { ingredients, addIngredient, removeIngredient} = useDataRecette();

  const handleAdd = () => {
    if (saisie.trim() !== "") {
      addIngredient(saisie);
      setSaisie("");
    }
  };

  return (
    <div className="ajout">
      <button className="btn-back" onClick={() => navigate(-1)}> ← </button>
      <h2>Add ingredients</h2>

      <input
        type="text"
        value={saisie}
        onChange={(e) => setSaisie(e.target.value)}
        placeholder="Ex: tomate"
      />
      <button className="btn-go" onClick={handleAdd}>Ajouter</button>

      <ul>
        <h2>In my fridge there a some :</h2>
        {ingredients.map((ing) => (
          <li key={ing}>
            {ing} <button onClick={() => removeIngredient(ing)}>x</button>
          </li>
        ))}
      </ul>

      {/* Va à /recettes : l’écran lira recettesFiltrees selon les ingrédients */}
      <button className="btn-go" onClick={() => navigate("/recettes")}>
      GO
      </button>

      <Footer />
    </div>
     

  );
}
