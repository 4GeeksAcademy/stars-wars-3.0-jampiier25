export const initialStore = () => ({
    characters: [],
    planets: [],
    vehicles: [],
    favorites: [],
    loading: false,
    error: null
  });

export default function storeReducer(store, action = {}) {


  switch (action.type) {
    case "FETCH_START":
      return { ...store, loading: true, error: null };

    case "FETCH_SUCCESS":
      return { 
        ...store, 
        [action.payload.category]: action.payload.data, 
        loading: false 
      };

    case "FETCH_ERROR":
      return { ...store, loading: false, error: action.payload };

    case "ADD_FAVORITE": {
      const exists = store.favorites.some(fav => fav.uid === action.payload.uid);
      return exists ? store : { ...store, favorites: [...store.favorites, action.payload] };
    }

    case "REMOVE_FAVORITE":
      return { 
        ...store, 
        favorites: store.favorites.filter(fav => fav.uid !== action.payload.uid) 
      };

    case "set_characters":
      return { ...store, characters: action.payload };

    case "set_vehicles":
      return { ...store, vehicles: action.payload };

    case "set_planets":
      return { ...store, planets: action.payload };

    default:
      console.error("Unknown action type:", action.type); // ❗ Captura el error en consola
      throw new Error("Unknown action.");
  }
}