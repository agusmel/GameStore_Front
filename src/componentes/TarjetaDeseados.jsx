import React from "react";
import './TarjetaDeseados.css';

function TarjetaDeados({ nombre, imagen }) {
    return (
        <div className="game-card">
            <div className="left-card-game">
                <img src={imagen} alt={`Imagen de ${nombre}`} />
                <p>{nombre}</p>
            </div>
            <div className="derecha-card-game">
                <button>Eliminar</button>
            </div>
        </div>
    );
}

export default TarjetaDeados;
