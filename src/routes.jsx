import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Vehicles from "./pages/Vehicles";
import Planets from "./pages/Planets";
import Single from "./pages/Single";

// Definimos las rutas
export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="characters" element={<Characters />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="planets" element={<Planets />} />
            <Route path="single/:type/:uid" element={<Single />} />
        </Route>
    )
);