import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext"; // Contexto de favoritos

const getImage = (type, uid) => `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`;

export const Single = () => {
    const { type, id } = useParams();  // Obtiene el tipo (characters, planets, vehicles) y el ID desde la URL
    const { favorites, dispatch } = useFavorites();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/${type}/${id}`)
            .then(res => res.json())
            .then(result => {
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
            <h1 className="display-4 text-warning">{data?.name || "Sin nombre"}</h1>
            <hr className="my-4" />

            <img 
                src={getImage(type, uid)} 
                className="img-fluid mb-3" 
                alt={data?.name}
                onError={(e) => (e.target.src = "https://via.placeholder.com/300x400?text=No+Image")}
            />

            <div className="text-start">
                <h5>Detalles:</h5>
                {type === "characters" && (
                    <>
                        <p><strong>Altura:</strong> {data?.height || "N/A"}</p>
                        <p><strong>Género:</strong> {data?.gender || "N/A"}</p>
                        <p><strong>Color de piel:</strong> {data?.skin_color || "N/A"}</p>
                        <p><strong>Color de cabello:</strong> {data?.hair_color || "N/A"}</p>
                    </>
                )}
                {type === "vehicles" && (
                    <>
                        <p><strong>Modelo:</strong> {data?.model || "N/A"}</p>
                        <p><strong>Fabricante:</strong> {data?.manufacturer || "N/A"}</p>
                        <p><strong>Velocidad máxima:</strong> {data?.max_atmosphering_speed || "N/A"}</p>
                        <p><strong>Pasajeros:</strong> {data?.passengers || "N/A"}</p>
                    </>
                )}
                {type === "planets" && (
                    <>
                        <p><strong>Clima:</strong> {data?.climate || "N/A"}</p>
                        <p><strong>Terreno:</strong> {data?.terrain || "N/A"}</p>
                        <p><strong>Población:</strong> {data?.population || "N/A"}</p>
                        <p><strong>Diámetro:</strong> {data?.diameter || "N/A"}</p>
                    </>
                )}
            </div>

            <div className="mt-4">
                <button 
                    className={`btn btn-lg ${favorites.some(fav => fav.uid === uid) ? "btn-danger" : "btn-outline-danger"}`}
                    onClick={handleFavorite}
                >
                    {favorites.some(fav => fav.uid === uid) ? "❤️ Quitar de Favoritos" : "🤍 Agregar a Favoritos"}
                </button>
                <Link to="/" className="btn btn-outline-warning btn-lg ms-3">
                    Volver a Inicio
                </Link>
            </div>
        </div>
    );
};

export default Single;