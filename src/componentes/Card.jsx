import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

// Catalogo
function Card({ imagen, nombre, precio }) {
    return (
        <Link to={`/game/${nombre}`} className="card-box"> {/* Añadido Link */}
            <img className="game-image" src={imagen} alt={`Portada de ${nombre}`} /> {/* Añadido alt */}
            <h3 className="game-title">{nombre}</h3>
            <p className="game-price">${precio}</p>
        </Link>
    );
}

// Carrusel
function CardGrande({ imagen, nombre, precio }) {
    return (
        <Link to={`/game/${nombre}`} className='card-box-grande'> {/* Añadido Link */}
            <img className='game-image-grande' src={imagen} alt={`Portada de ${nombre}`} /> {/* Añadido alt */}
            <div className='game-box-bottom'>
                <h3 className="game-title-grande">{nombre}</h3>
                <p className="game-price-grande">${precio}</p>
            </div>
        </Link>
    );
}

export { Card, CardGrande };
