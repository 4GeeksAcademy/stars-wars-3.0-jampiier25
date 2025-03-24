import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const endpoints = ["people", "planets", "vehicles"];
                const requests = endpoints.map(endpoint =>
                    fetch(`https://www.swapi.tech/api/${endpoint}/?name=${query}`).then(res => res.json())
                );

                const responses = await Promise.all(requests);
                const formattedResults = responses.flatMap((response, index) =>
                    response.result?.map(item => ({
                        name: item.name,
                        uid: item.uid,
                        type: endpoints[index] === "people" ? "characters" : endpoints[index]
                    })) || []
                );

                setResults(formattedResults);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults([]);
            }
            setLoading(false);
        };

        const timeoutId = setTimeout(fetchData, 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    const handleSelect = (item) => {
        navigate(`/single/${item.type}/${item.uid}`);
        setQuery("");
        setResults([]);
    };

    return (
        <div className="position-relative">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar personajes, planetas o vehículos..."
                value={query}
                onChange={handleSearch}
            />
            {loading && <div className="spinner-border text-warning position-absolute top-50 start-50 translate-middle" role="status"></div>}
            
            {results.length > 0 && (
                <ul className="list-group position-absolute w-100 mt-1 z-3 bg-dark">
                    {results.map((item) => (
                        <li 
                            key={item.uid} 
                            className="list-group-item list-group-item-action text-white bg-dark"
                            onClick={() => handleSelect(item)}
                        >
                            {item.name} ({item.type})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;