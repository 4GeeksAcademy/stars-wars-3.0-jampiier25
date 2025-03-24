import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const getImage = (type, uid) => {
    return `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${type}/${uid}.jpg`;
};

export const Characters = () => {
    const { store, dispatch } = useGlobalReducer();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch("https://www.swapi.tech/api/people");
                if (!response.ok) throw new Error("Error al obtener los personajes");

                const data = await response.json();

                dispatch({
                    type: "set_characters",
                    payload: data.results,
                });

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (!store.characters || store.characters.length === 0) {
            fetchCharacters();
        } else {
            setLoading(false);
        }
    }, [dispatch, store.characters]);

    if (loading) return <div className="text-center mt-5">Cargando...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center">Personajes de Star Wars 🌟</h1>
            <div className="row">
                {store.characters?.map((character) => (
                    <div key={character.uid} className="col-md-4 mb-3">
                        <div className="card">
                            <img
                                src={getImage("characters", character.uid)}
                                className="card-img-top"
                                alt={character.name}
                                onError={(e) => e.target.src = "https://via.placeholder.com/400x300?text=No+Image"}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{character.name}</h5>
                                <Link to={`/single/characters/${character.uid}`} className="btn btn-primary">
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