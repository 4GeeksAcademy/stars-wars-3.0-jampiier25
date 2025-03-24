import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";



const getImage = (type, uid) => {
    return `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${type}/${uid}.jpg`;
};

export const Planets = () => {
    const { store, dispatch } = useGlobalReducer();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                dispatch({ type: "FETCH_START" });

                const response = await fetch("https://www.swapi.tech/api/planets");
                if (!response.ok) throw new Error("Error al obtener los planetas");

                const data = await response.json();

                dispatch({
                    type: "FETCH_SUCCESS",
                    payload: { category: "planets", data: data.results }
                });

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        // Solo hacer la petición si no hay datos en el store
        if (store.planets.length === 0) {
            fetchPlanets();
        } else {
            setLoading(false);
        }
    }, [dispatch, store.planets]);

    if (loading) return <div className="text-center mt-5">Cargando...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center">Planetas de Star Wars 🪐</h1>
            <div className="row">
            {store.planets
                ?.filter((planet) => planet.name !== "Tatooine") // ❌ Filtra Tatooine
                .map((planet) => (
                    <div key={planet.uid} className="col-md-4 mb-3">
                        <div className="card">
                            <img
                                src={getImage("planets", planet.uid)}
                                className="card-img-top"
                                alt={planet.name}
                                onError={(e) => e.target.src = "https://via.placeholder.com/400x300?text=No+Image"}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{planet.name}</h5>
                                <Link to={`/single/planets/${planet.uid}`} className="btn btn-primary">
                                    Ver Detalles
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Planets;