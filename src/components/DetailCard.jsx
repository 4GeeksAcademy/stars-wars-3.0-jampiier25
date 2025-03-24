import PropTypes from "prop-types";

const getImage = (type, uid) => {
    const typeMap = {
        people: "characters",  // Corrige "people" en lugar de "characters"
        planets: "planets",
        vehicles: "vehicles"
    };
    return `https://starwars-visualguide.com/assets/img/${typeMap[type] || "placeholder"}/${uid}.jpg`;
};

const DetailCard = ({ data, type }) => {
    if (!data || !data.uid) return null;

    return (
        <div className="card mx-auto my-4 p-3 shadow-lg" style={{ maxWidth: "600px" }}>
            <img 
                src={getImage(type, data.uid)} 
                className="card-img-top" 
                alt={data.name || "No disponible"} 
                onError={(e) => e.target.src = "https://via.placeholder.com/400x300?text=No+Image"}
            />
            <div className="card-body">
                <h2 className="card-title text-warning">{data.name || "Sin nombre"}</h2>
                <p className="card-text"><strong>Descripción:</strong> {data.description || "No disponible"}</p>
                
                {data.height && <p><strong>Altura:</strong> {data.height}</p>}
                {data.gender && <p><strong>Género:</strong> {data.gender}</p>}
                {data.model && <p><strong>Modelo:</strong> {data.model}</p>}
                {data.manufacturer && <p><strong>Fabricante:</strong> {data.manufacturer}</p>}
                {data.crew && <p><strong>Tripulación:</strong> {data.crew}</p>}
                {data.passengers && <p><strong>Pasajeros:</strong> {data.passengers}</p>}
                {data.terrain && <p><strong>Terreno:</strong> {data.terrain}</p>}
                {data.population && <p><strong>Población:</strong> {data.population}</p>}
            </div>
        </div>
    );
};

DetailCard.propTypes = {
    data: PropTypes.object,
    type: PropTypes.string.isRequired
};

export default DetailCard;