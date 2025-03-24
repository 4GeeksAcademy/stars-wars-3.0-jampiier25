export const initialStore = {
  characters: [],
  planets: [],
  vehicles: [],
  favorites: [],  // Añadir favoritos aquí si es necesario
  loading: false,
  error: null
};

export default function storeReducer(state, action) {
  switch (action.type) {
      case "FETCH_START":
          return { ...state, loading: true, error: null };

      case "FETCH_SUCCESS":
          return {
              ...state,
              [action.payload.category]: action.payload.data,
              loading: false
          };

      case "FETCH_ERROR":
          return { ...state, loading: false, error: action.payload };

      case "ADD_FAVORITE":
          if (state.favorites.some(fav => fav.uid === action.payload.uid)) return state;
          return { ...state, favorites: [...state.favorites, action.payload] };

      case "REMOVE_FAVORITE":
          return {
              ...state,
              favorites: state.favorites.filter(fav => fav.uid !== action.payload.uid)
          };

      default:
          console.error("Unknown action type:", action.type);
          return state;
  }
}