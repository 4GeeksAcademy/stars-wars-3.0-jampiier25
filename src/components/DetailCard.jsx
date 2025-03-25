import React from "react";

const getImage = (type, uid) => {
    const typeMap = {
        characters: "characters",
        people: "characters",
        vehicles: "vehicles",
        planets: "planets"
    };
    return `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${typeMap[type] || type}/${uid}.jpg`;
};

const DetailCard = ({ item, type, uid }) => {
    if (!item) {
        return <h2 className="text-warning text-center">Cargando datos...</h2>;
    }

    return (
        <div className="container mt-5">
            <div className="card bg-dark text-light">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={getImage(type, uid)}
                            className="card-img-top"
                            alt={item.name}
                           
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title text-warning">{item.name}</h2>
                            <ul className="list-group list-group-flush">
                                {Object.entries(item).map(([key, value]) => (
                                    <li key={key} className="list-group-item bg-dark text-light">
                                        <strong>{key.replace(/_/g, " ")}:</strong> {Array.isArray(value) ? value.length : value || "N/A"}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCard;
