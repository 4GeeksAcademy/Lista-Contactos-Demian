import React from "react";
import { Link } from "react-router-dom"; 

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
    
        <span className="navbar-brand">Lista de Contactos</span>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
           
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Inicio
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="btn btn-primary nav-link" to="/create">
                Agregar Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};