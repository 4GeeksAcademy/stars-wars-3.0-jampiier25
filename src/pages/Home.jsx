import React from "react";
import { Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";

const getImage = (type, uid) => {
    const typeMap = {
        characters: "characters",
        people: "characters",
        vehicles: "vehicles",
        planets: "planets"
    };
    return `https://starwars-visualguide.com/assets/img/${typeMap[type]}/${uid}.jpg`;
};

const Home = () => {
    const { data: characters, loading: loadingCharacters } = useFetchData("people");
    const { data: vehicles, loading: loadingVehicles } = useFetchData("vehicles");
    const { data: planets, loading: loadingPlanets } = useFetchData("planets");

    if (loadingCharacters || loadingVehicles || loadingPlanets) {
        return <div className="text-center mt-5">Cargando...</div>;
    }

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">Explora el Universo de Star Wars 🚀</h1>

            {/* 🦸‍♂️ Personajes */}
            <h2 className="text-warning">Personajes</h2>
            <div className="row">
                {characters.slice(0, 3).map((char) => (
                    <div key={char.uid} className="col-md-4">
                        <div className="card">
                            <img
                                src={getImage("characters", char.uid)}
                                className="card-img-top"
                                alt={char.name}
                                onError={(e) => (e.target.src = "https://via.placeholder.com/150x200?text=No+Image")}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{char.name}</h5>
                                <Link to={`/single/characters/${char.uid}`} className="btn btn-warning btn-sm">
                                    Ver más
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/characters" className="btn btn-outline-warning mt-3">Ver todos los personajes</Link>

            {/* 🚗 Vehículos */}
            <h2 className="mt-4 text-primary">Vehículos</h2>
            <div className="row">
                {vehicles.slice(0, 3).map((vehicle) => (
                    <div key={vehicle.uid} className="col-md-4">
                        <div className="card">
                            <img
                                src={getImage("vehicles", vehicle.uid)}
                                className="card-img-top"
                                alt={vehicle.name}
                                onError={(e) => (e.target.src = "https://via.placeholder.com/150x200?text=No+Image")}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{vehicle.name}</h5>
                                <Link to={`/single/vehicles/${vehicle.uid}`} className="btn btn-primary btn-sm">
                                    Ver más
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/vehicles" className="btn btn-outline-primary mt-3">Ver todos los vehículos</Link>

            {/* 🌍 Planetas */}
            <h2 className="mt-4 text-success">Planetas</h2>
            <div className="row">
                {planets.slice(0, 3).map((planet) => (
                    <div key={planet.uid} className="col-md-4">
                        <div className="card">
                            <img
                                src={getImage("planets", planet.uid)}
                                className="card-img-top"
                                alt={planet.name}
                                onError={(e) => (e.target.src = "https://via.placeholder.com/150x200?text=No+Image")}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{planet.name}</h5>
                                <Link to={`/single/planets/${planet.uid}`} className="btn btn-success btn-sm">
                                    Ver más
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/planets" className="btn btn-outline-success mt-3">Ver todos los planetas</Link>
        </div>
    );
};

export default Home;