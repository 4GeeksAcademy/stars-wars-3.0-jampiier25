import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useFavorites } from "../context/FavoritesContext";

const Navbar = () => {
    const { favorites } = useFavorites();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand text-warning" to="/">🌌 Star Wars Explorer</Link>
                
                {/* Barra de búsqueda */}
                <SearchBar />

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/characters">Personajes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/vehicles">Vehículos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/planets">Planetas</Link>
                        </li>
                    </ul>

                    {/* Botón de favoritos con contador */}
                    <div className="dropdown ms-3">
                        <button
                            className="btn btn-warning dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            ❤️ Favoritos ({favorites.length})
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end bg-dark text-light" aria-labelledby="dropdownMenuButton">
                            {favorites.length === 0 ? (
                                <li className="dropdown-item text-warning">No hay favoritos</li>
                            ) : (
                                favorites.map((fav, index) => (
                                    <li key={index} className="dropdown-item">
                                        <Link className="text-light text-decoration-none" to={`/single/${fav.type}/${fav.uid}`}>
                                            {fav.name}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;