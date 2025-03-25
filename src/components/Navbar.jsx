import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useFavorites } from "../context/FavoritesContext";
import "../Navbar.css";

const Navbar = () => {
    const { favorites } = useFavorites();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-sw">
            <div className="container">
                <Link className="navbar-brand starwars-logo" to="/"> WIKI STARWARS</Link>
                
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
                        <li className="nav-itemch">
                            <Link className="nav-link sw-link" to="/characters"><i className="fa-solid fa-user"></i> Personajes </Link>
                        </li>
                        <li className="nav-itemvh">
                            <Link className="nav-link sw-link" to="/vehicles"><i className="fa-solid fa-space-shuttle"></i> Vehículos</Link>
                        </li>
                        <li className="nav-itempl">
                            <Link className="nav-link sw-link" to="/planets"><i className="fa-solid fa-globe"></i> Planetas</Link>
                        </li>
                    </ul>

                    {/* Botón de favoritos con contador */}
                    <div className="dropdown ms-3">
                        <button
                            className="btn-lightsaber"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >   <span className="blade"></span>
                            <span className="hilt"></span>
                            Favoritos ({favorites.length})
                         
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end bg-dark text-light sw-dropdown" aria-labelledby="dropdownMenuButton">
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