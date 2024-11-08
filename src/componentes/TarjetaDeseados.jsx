import React from "react";
import './TarjetaDeseados.css';

function TarjetaDeseados({ nombre, imagen, handleEliminar, id_videojuego }) {
    return (
        <div className="game-card">
            <div className="left-card-game">
                <img src={imagen} alt={`Imagen de ${nombre}`} />
                <p>{nombre}</p>
            </div>
            <div className="derecha-card-game">
                <button onClick={() => handleEliminar(id_videojuego)}>Eliminar</button> {/* Pasamos id_videojuego correctamente */}
            </div>
        </div>
    );
}

export default TarjetaDeseados;
