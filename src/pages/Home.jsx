import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_START" });

                const urls = [
                    { category: "characters", url: "https://www.swapi.tech/api/people" },
                    { category: "vehicles", url: "https://www.swapi.tech/api/vehicles" },
                    { category: "planets", url: "https://www.swapi.tech/api/planets" }
                ];

                const responses = await Promise.all(
                    urls.map(({ url }) => fetch(url).then(res => res.json()))
                );

                responses.forEach((data, index) => {
                    dispatch({
                        type: "FETCH_SUCCESS",
                        payload: {
                            category: urls[index].category,
                            data: data.results
                        }
                    });
                });

                setLoading(false);
            } catch (err) {
                setError("Error al cargar los datos");
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    if (loading) return <div className="text-center mt-5">Cargando datos...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    return (
        <div className="container text-center mt-5">
            <h1>Bienvenido al Universo de Star Wars 🌌</h1>
            <p>Explora personajes, vehículos y planetas de la saga.</p>

            <div className="d-flex justify-content-center mt-4">
                <Link to="/characters" className="btn btn-primary mx-2">Personsajes</Link>
                <Link to="/vehicles" className="btn btn-secondary mx-2">Vehículos</Link>
                <Link to="/planets" className="btn btn-success mx-2">Planetas</Link>
            </div>

            {/* Lista de Personajes */}
            <div className="mt-5">
                <h3>Personajes</h3>
                <ul className="list-group">
                    {store?.characters?.slice(0, 5).map((char, index) => (
                        <li key={index} className="list-group-item">
                            {char.name}
                        </li>
                    ))}
                </ul>

                {/* Lista de Vehículos */}
                <h3 className="mt-4">Vehículos</h3>
                <ul className="list-group">
                    {store?.vehicles?.slice(0, 5).map((vehicle, index) => (
                        <li key={index} className="list-group-item">
                            {vehicle.name}
                        </li>
                    ))}
                </ul>

                {/* Lista de Planetas */}
                <h3 className="mt-4">Planetas</h3>
                <ul className="list-group">
                    {store?.planets?.slice(0, 5).map((planet, index) => (
                        <li key={index} className="list-group-item">
                            {planet.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;