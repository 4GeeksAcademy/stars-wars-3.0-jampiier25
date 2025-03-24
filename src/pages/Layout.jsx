import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import {Footer} from "../components/Footer";

export const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            
            <main className="container mt-4 flex-grow-1" role="main">
                <Outlet /> {/* Aquí se renderizan las páginas */}
            </main>
            
            <Footer />
        </div>
    );
};