import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from "./hooks/useGlobalReducer"; // Asegura que esté bien importado
import "bootstrap/dist/css/bootstrap.min.css";
import { FavoritesProvider } from "./context/FavoritesContext";

const Main = () => (
    <React.StrictMode>
        <StoreProvider>
            <RouterProvider router={router} />
        </StoreProvider>
    </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);