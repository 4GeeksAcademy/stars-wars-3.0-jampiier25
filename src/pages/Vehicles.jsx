import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const getImage = (type, uid) => {
    return `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${type}/${uid}.jpg`;
};


const Vehicles = () => {
    const { store, dispatch } = useGlobalReducer();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch("https://www.swapi.tech/api/vehicles");
                if (!response.ok) throw new Error("Error al obtener los vehículos");

                const data = await response.json();

                dispatch({
                    type: "set_vehicles",
                    payload: data.results, // Guardamos solo los resultados
                });

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (!store.vehicles || store.vehicles.length === 0) {
            fetchVehicles();
        } else {
            setLoading(false);
        }
    }, [dispatch, store.vehicles]);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
    return (
        <div className="container mt-5">
            <h1 className="text-center">Vehículos de Star Wars 🚀</h1>
            <div className="row">
                {store.vehicles?.map((vehicle) => (
                    <div key={vehicle.uid} className="col-md-4 mb-3">
                        <div className="card">
                            <img
                                src={getImage("vehicles", vehicle.uid)}
                                className="card-img-top"
                                alt={vehicle.name}
                                onError={(e) => e.target.src = "https://via.placeholder.com/400x300?text=No+Image"}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{vehicle.name}</h5>
                                <Link to={`/single/vehicles/${vehicle.uid}`} className="btn btn-primary">
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

export default Vehicles;