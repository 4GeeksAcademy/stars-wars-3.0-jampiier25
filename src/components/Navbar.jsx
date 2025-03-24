import { Link } from "react-router-dom";


export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                 
				<span className="text-warning">wiki Star Wars </span>
	</Link>
	
	<div className="nav-links">
		<Link to="/characters" className="btn btn-outline-warning mx-2">
			<i className="fa-solid fa-user"></i> Personajes
		</Link>
		<Link to="/vehicles" className="btn btn-outline-danger mx-2">
			<i className="fa-solid fa-space-shuttle"></i> Vehículos
		</Link>
		<Link to="/planets" className="btn btn-outline-primary mx-2">
			<i className="fa-solid fa-globe"></i> Planetas
		</Link>
	</div>
</div>
</nav>
    );
};
