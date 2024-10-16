import './GamePage.css';
import { Link } from 'react-router-dom';
import React from 'react';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import { useParams } from 'react-router-dom'; // Importa useParams
import { juegos } from '../data/juegos.js'; // Asegúrate de importar tus datos

function GamePage() {
    const { nombre } = useParams(); // Obtiene el nombre del juego de la URL
    const juego = juegos.find(j => j.nombre === nombre); // Busca el juego por nombre

    if (!juego) {
        return <div>No se encontró el juego.</div>;
    }


    return (
        <>
            <BarraNavegacion/>
            <div className="game-page-container">



                <div className="titulo">
                    <h1>{juego.nombre}</h1> {/* Aquí se colocaría el título dinámicamente */}
                </div>

                <div className="bloque-1">
                    <img 
                        className="imagen-juego"
                        src={juego.imagenGrande}
                        alt="Portada del juego"
                    />
                    <div className="informacion">
                        <h2>Desarrollador</h2>
                        <p>nombre: FromSoftware, Inc.</p>
                        <p>descripcion: </p>
                        <img 
                            className="developer-logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2c/FromSoftware_logo.svg"
                            alt="Logo del desarrollador"
                        />

                        <p className='precio'>{juego.precio}</p>
                        <button className="add-to-cart-btn">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GamePage;
