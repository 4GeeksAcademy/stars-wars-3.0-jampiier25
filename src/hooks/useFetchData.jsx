import { useState, useEffect } from "react";

const useFetchData = (category, page = 1) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://www.swapi.tech/api/${category}?page=${page}&limit=9`);
                const result = await response.json();

                if (!response.ok) throw new Error("Error al obtener datos");

                setData(result.results);
                setTotalPages(Math.ceil(result.total_records / 9)); // Calcula páginas dinámicamente
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        fetchData();
    }, [category, page]);

    return { data, loading, error, totalPages };
};

export default useFetchData;