import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        console.log(`📜 Cambiaste de vista a: ${location.pathname}`);
    }, [location]);

    return children;
};

export default ScrollToTop;