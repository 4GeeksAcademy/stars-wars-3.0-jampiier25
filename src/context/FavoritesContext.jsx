import { createContext, useContext, useEffect, useReducer } from "react";

// Estado inicial
const initialState = {
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
};

// Reducer para manejar acciones
const favoritesReducer = (state, action) => {
    switch (action.type) {
        case "ADD_FAVORITE":
            // Verifica si ya está en favoritos
            if (state.favorites.some(fav => fav.uid === action.payload.uid)) {
                return state; // No lo agrega si ya existe
            }
            const updatedFavoritesAdd = [...state.favorites, action.payload];
            localStorage.setItem("favorites", JSON.stringify(updatedFavoritesAdd)); // Guardar en localStorage
            return { ...state, favorites: updatedFavoritesAdd };

        case "REMOVE_FAVORITE":
            const updatedFavoritesRemove = state.favorites.filter(fav => fav.uid !== action.payload.uid);
            localStorage.setItem("favorites", JSON.stringify(updatedFavoritesRemove)); // Guardar en localStorage
            return { ...state, favorites: updatedFavoritesRemove };

        default:
            return state;
    }
};

// Crear contexto
const FavoritesContext = createContext();

// Proveedor del contexto
export const FavoritesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(favoritesReducer, initialState);

    return (
        <FavoritesContext.Provider value={{ favorites: state.favorites, dispatch }}>
            {children}
        </FavoritesContext.Provider>
    );
};

// Hook personalizado para acceder al contexto
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
    }
    return context;
};