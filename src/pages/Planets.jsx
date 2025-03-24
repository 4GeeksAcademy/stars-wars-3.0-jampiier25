import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { Pagination } from "../components/Pagination";

const getImage = (type, uid) => {
    return `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`;
};


const Planets = () => {
    const { favorites, dispatch } = useFavorites();
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPlanets = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://www.swapi.tech/api/planets?page=${page}&limit=9`);
                const data = await res.json();
                setPlanets(data.results);
                setTotalPages(Math.ceil(data.total_records / 9));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching planets:", err);
                setError("No se pudo obtener la información.");
                setLoading(false);
            }
        };
        fetchPlanets();
    }, [page]);

    const handleFavorite = (planet) => {
        const isFavorite = favorites.some(fav => fav.uid === planet.uid);
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: planet });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: { ...planet, type: "planets" } });
        }
    };

    if (loading) return <h2 className="text-warning text-center">Cargando planetas...</h2>;
    if (error) return <h2 className="text-danger text-center">{error}</h2>;

    return (
        <div className="container mt-5 text-center">
            <h1 className="text-warning">Planetas de Star Wars</h1>
            <hr />

            <div className="row">
                {planets.map((plan) => (
                    <div key={plan.uid} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={getImage("planets", plan.uid)}
                                className="card-img-top"
                                alt={plan.name}
                                onError={(e) => (e.target.src = "https://via.placeholder.com/150x200?text=No+Image")}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{plan.name}</h5>
                                <Link to={`/single/planets/${plan.uid}`} className="btn btn-warning btn-sm me-2">
                                    Ver más
                                </Link>
                                <button
                                    className={`btn btn-sm ${favorites.some(fav => fav.uid === plan.uid) ? "btn-danger" : "btn-outline-danger"}`}
                                    onClick={() => handleFavorite(plan)}
                                >
                                    {favorites.some(fav => fav.uid === plan.uid) ? "❤️" : "🤍"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
    );
};

export default Planets;