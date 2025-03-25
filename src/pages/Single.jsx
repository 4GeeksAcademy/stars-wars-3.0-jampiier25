import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import DetailCard from "../components/DetailCard";
import "../index.css";

const getImage = (type, uid) => {
    const typeMap = {
        characters: "characters",  
        people: "characters",
        vehicles: "vehicles",
        planets: "planets"
    };
    return `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${type}/${uid}.jpg`;
};

export const Single = () => {
    const { type, id } = useParams();
    const { favorites, dispatch } = useFavorites();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/${type}/${id}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then(result => {
                if (!result.result) throw new Error("Datos no encontrados");
                setData(result.result.properties);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching details:", err);
                setError("No se pudo obtener la información.");
                setLoading(false);
            });
    }, [type, id]);

    const handleFavorite = () => {
        const isFavorite = favorites.some(fav => fav.uid === id);
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: { uid: id } });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: { uid: id, name: data?.name, type } });
        }
    };

    if (loading) return <h2 className="text-warning text-center">Cargando detalles...</h2>;
    if (error) return <h2 className="text-danger text-center">{error}</h2>;

   

return (
    <div className="container text-center mt-5">
        <DetailCard item={data} type={type} imageUrl={getImage(type, id)} uid={id} />

        <div className="mt-4">
            <button 
                className={`btn btn-lg ${favorites.some(fav => fav.uid === id) ? "btn-danger" : "btn-outline-danger"}`}
                onClick={handleFavorite}
            >
                {favorites.some(fav => fav.uid === id) ? "❤️ Quitar de Favoritos" : "🤍 Agregar a Favoritos"}
            </button>
            <Link to="/" className="btn btn-outline-warning btn-lg ms-3">
                Volver a Inicio
            </Link>
        </div>
    </div>
);
};

export default Single;