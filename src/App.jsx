import { Routes, Route} from "react-router";
import Accueil from "./pages/Accueil.jsx";
import Ajouter from "./pages/Ajouter.jsx";
import Recettes from "./pages/Recettes.jsx";
import RecetteComplet from "./pages/RecetteComplet.jsx";
import Favoris from "./pages/Favoris.jsx";

export default function App() {
  return (
    <div className="wrap">
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/ajouter" element={<Ajouter />} />
        <Route path="/recettes" element={<Recettes />} />
        <Route path="/recette/:id" element={<RecetteComplet />} />
        <Route path="/favoris" element={<Favoris />} />
      </Routes>
    </div>
  );
}
