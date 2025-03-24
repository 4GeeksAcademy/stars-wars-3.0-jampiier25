import { createContext, useContext, useReducer, useEffect } from "react";

// Estado inicial para favoritos
const initialState = {
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
};

// Reducer para favoritos
const favoritesReducer = (state, action) => {
    switch (action.type) {
        case "ADD_FAVORITE":
            if (state.favorites.some(fav => fav.uid === action.payload.uid)) {
                return state; // Evita duplicados
            }
            const updatedFavorites = [...state.favorites, action.payload];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return { ...state, favorites: updatedFavorites };

        case "REMOVE_FAVORITE":
            const filteredFavorites = state.favorites.filter(fav => fav.uid !== action.payload.uid);
            localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
            return { ...state, favorites: filteredFavorites };

        default:
            return state;
    }
};

// Crear el contexto
const FavoritesContext = createContext();

// Hook personalizado para acceder al contexto
export const useFavorites = () => useContext(FavoritesContext);

// Proveedor del contexto
export const FavoritesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(favoritesReducer, initialState);

    // Guardar en localStorage cuando cambian los favoritos
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }, [state.favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites: state.favorites, dispatch }}>
            {children}
        </FavoritesContext.Provider>
    );
};