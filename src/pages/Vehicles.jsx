import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { Pagination } from "../components/Pagination";

const getImage = (type, uid) => {
    return `https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`;
};


const Vehicles = () => {
    const { favorites, dispatch } = useFavorites();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://www.swapi.tech/api/vehicles?page=${page}&limit=9`);
                const data = await res.json();
                setVehicles(data.results);
                setTotalPages(Math.ceil(data.total_records / 9));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching vehicles:", err);
                setError("No se pudo obtener la información.");
                setLoading(false);
            }
        };
        fetchVehicles();
    }, [page]);

    const handleFavorite = (vehicle) => {
        const isFavorite = favorites.some(fav => fav.uid === vehicle.uid);
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: vehicle });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: { ...vehicle, type: "vehicles" } });
        }
    };

    if (loading) return <h2 className="text-warning text-center">Cargando vehículos...</h2>;
    if (error) return <h2 className="text-danger text-center">{error}</h2>;

    return (
        <div className="container mt-5 text-center">
            <h1 className="text-warning">Vehículos de Star Wars</h1>
            <hr />

            <div className="row">
                {vehicles.map((veh) => (
                    <div key={veh.uid} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={getImage("vehicles", veh.uid)}
                                className="card-img-top"
                                alt={veh.name}
                                onError={(e) => (e.target.src = "https://via.placeholder.com/150x200?text=No+Image")}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{veh.name}</h5>
                                <Link to={`/single/vehicles/${veh.uid}`} className="btn btn-warning btn-sm me-2">
                                    Ver más
                                </Link>
                                <button
                                    className={`btn btn-sm ${favorites.some(fav => fav.uid === veh.uid) ? "btn-danger" : "btn-outline-danger"}`}
                                    onClick={() => handleFavorite(veh)}
                                >
                                    {favorites.some(fav => fav.uid === veh.uid) ? "❤️" : "🤍"}
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

export default Vehicles;