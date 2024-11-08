import React from "react";
import './TarjetaCarrito.css';
import DeleteIcon from '@mui/icons-material/Delete';

// Componente TarjetaCarrito
function TarjetaCarrito({ id_videojuego, nombre, precio, imagen, handleEliminarProducto }) {
    return (
        <div className="game-card">
            <div className="left-card-game">
                <img src={imagen} alt={`Imagen de ${nombre}`} />
                <p>{nombre}</p>
            </div>
            <div className="right-card-game">
                <p>{precio}</p> 
                <button onClick={() => handleEliminarProducto(id_videojuego)}>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
}

export default TarjetaCarrito;
