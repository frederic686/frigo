import { Routes, Route, NavLink } from "react-router";
import Accueil from "./pages/Accueil.jsx";
import Ajouter from "./pages/Ajouter.jsx";
import Recettes from "./pages/Recettes.jsx";
import RecetteComplet from "./pages/RecetteComplet.jsx";
import Favoris from "./pages/Favoris.jsx";

export default function App() {
  return (
    <div className="wrap">
      <h1>Frigo Vide</h1>

      <nav>
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/ajouter">Ajouter</NavLink>
        <NavLink to="/recettes">Recettes</NavLink>
        <NavLink to="/favoris">Favoris</NavLink>
      </nav>

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
