import React from "react";
import './TarjetaCarrito.css';
import DeleteIcon from '@mui/icons-material/Delete';

function TarjetaCarrito({ nombre, precio, imagen }) {
    return (
        <div className="game-card">
            <div className="left-card-game">
                <img src={imagen} alt={`Imagen de ${nombre}`} />
                <p>{nombre}</p>
            </div>
            <div className="right-card-game">
                <p>{precio}</p> 
                <button><DeleteIcon /></button>
            </div>
        </div>
    );
}

export default TarjetaCarrito;
