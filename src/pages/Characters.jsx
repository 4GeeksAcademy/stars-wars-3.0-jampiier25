import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext"; // Importamos favoritos
import { Pagination } from "../components/Pagination"; // Componente de paginación

const getImage = (type, uid) => {
    return `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`;
};
const Characters = () => {
    const { favorites, dispatch } = useFavorites(); // Hook de favoritos
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://www.swapi.tech/api/people?page=${page}&limit=9`);
                const data = await res.json();
                setCharacters(data.results);
                setTotalPages(Math.ceil(data.total_records / 9));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching characters:", err);
                setError("No se pudo obtener la información.");
                setLoading(false);
            }
        };
        fetchCharacters();
    }, [page]);

    // Manejar favoritos
    const handleFavorite = (character) => {
        const isFavorite = favorites.some(fav => fav.uid === character.uid);
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: character });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: { ...character, type: "characters" } });
        }
    };

    if (loading) return <h2 className="text-warning text-center">Cargando personajes...</h2>;
    if (error) return <h2 className="text-danger text-center">{error}</h2>;

    return (
        <div className="container mt-5 text-center">
            <h1 className="text-warning">Personajes de Star Wars</h1>
            <hr />

            <div className="row">
                {characters.map((char) => (
                    <div key={char.uid} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={getImage("characters", char.uid)}
                                className="card-img-top"
                                alt={char.name}
                                onError={(e) => (e.target.src = "https://via.placeholder.com/150x200?text=No+Image")}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{char.name}</h5>
                                <Link to={`/single/characters/${char.uid}`} className="btn btn-warning btn-sm me-2">
                                    Ver más
                                </Link>
                                <button
                                    className={`btn btn-sm ${favorites.some(fav => fav.uid === char.uid) ? "btn-danger" : "btn-outline-danger"}`}
                                    onClick={() => handleFavorite(char)}
                                >
                                    {favorites.some(fav => fav.uid === char.uid) ? "❤️" : "🤍"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
    );
};

export default Characters;