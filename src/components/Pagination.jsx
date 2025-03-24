import React from "react";

export const Pagination = ({ currentPage, totalPages, setPage }) => {
    return (
        <div className="d-flex justify-content-center my-4">
            <button 
                className="btn btn-outline-warning mx-2" 
                onClick={() => setPage(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                ⬅ Anterior
            </button>

            <span className="text-white mx-3">Página {currentPage} de {totalPages}</span>

            <button 
                className="btn btn-outline-warning mx-2" 
                onClick={() => setPage(currentPage + 1)} 
                disabled={currentPage === totalPages}
            >
                Siguiente ➡
            </button>
        </div>
    );
};