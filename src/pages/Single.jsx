import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";
import DetailCard from "../components/DetailCard";

export const Single = () => {
    const { store } = useGlobalReducer();
    const { type, id } = useParams();  // Obtiene type (characters, planets, vehicles) e id desde la URL
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Buscar en el store si los datos ya están cargados
        const storedData = store[type]?.find(item => item.uid === id);
        
        if (storedData) {
            setData(storedData);
            setLoading(false);
        } else {
            // Si no está en el store, hacer el fetch desde la API
            fetch(`https://www.swapi.tech/api/${type}/${id}`)
                .then(res => res.json())
                .then(result => {
                    setData(result.result.properties);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setError("No se pudo obtener la información.");
                    setLoading(false);
                });
        }
    }, [type, id, store]);

    if (loading) return <h2 className="text-warning">Cargando detalles...</h2>;
    if (error) return <h2 className="text-danger">{error}</h2>;

    return (
        <div className="container text-center">
            <h1 className="display-4 text-warning">{data?.name || "Sin nombre"}</h1>
            <hr className="my-4" />

            <p><strong>Descripción:</strong> {data?.description || "No disponible"}</p>
            <p><strong>Altura:</strong> {data?.height || "N/A"}</p>
            <p><strong>Género:</strong> {data?.gender || "N/A"}</p>
            <p><strong>Modelo:</strong> {data?.model || "N/A"}</p>

            <Link to="/">
                <span className="btn btn-outline-warning btn-lg">Volver a Inicio</span>
            </Link>
        </div>
    );
};

// Validar que los props sean del tipo correcto
Single.propTypes = {
    match: PropTypes.object
};