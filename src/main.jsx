import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { IngredientsProvider } from "./data/DataRecette.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <IngredientsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IngredientsProvider>
  </StrictMode>
);
