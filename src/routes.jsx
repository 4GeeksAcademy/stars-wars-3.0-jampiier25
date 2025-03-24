import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Characters } from "./pages/Characters";
import Vehicles from "./pages/Vehicles";
import { Planets } from "./pages/Planets";
import { Single } from "./pages/Single";

export const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
          {/* Página de inicio */}
          <Route index element={<Home />} />
          
          {/* Rutas para mostrar la lista de cada categoría */}
          <Route path="characters" element={<Characters />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="planets" element={<Planets />} />

          {/* Ruta dinámica para detalles individuales (de personajes, vehículos o planetas) */}
          <Route path="single/:type/:id" element={<Single />} />
      </Route>
  )
);