import './GamePageEmpresa.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BarraNavegacionEmpresa from '../componentes/BarraNavegacionEmpresa.jsx';

function GamePageEmpresa() {
    const { id } = useParams(); // Obtenemos el 'id' del juego de la URL
    const [juego, setJuego] = useState(null); // Estado para almacenar los datos del juego

    // useEffect para cargar los datos
    useEffect(() => {
        const fetchJuego = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/videojuegos/empresaJuego/${id}`, {
                    method: "GET", 
                    headers: { 
                        "Content-Type": "application/json"
                    },
                    credentials: "include", 
                });

                if (response.ok) {
                    const data = await response.json();
                    // Si los datos vienen como un array, accedemos al primer elemento
                    if (data.length > 0) {
                        setJuego(data[0]); // Establecemos el juego solo si hay datos
                    }
                }
            } catch (error) {
                console.error('Error al obtener el juego:', error);
            }
        };

        fetchJuego(); // Llamamos a la función fetch al montar el componente
    }, [id]); // Dependencia de 'id' para que se recargue cuando cambie

    // Función para alternar el texto del botón
    const [textoPausarPublicacion, setTextoDespausarPublicacion] = useState("Pausar publicacion");

    const cambiarTextoBoton = () => {
        setTextoDespausarPublicacion((prevTexto) => (prevTexto === "Pausar publicacion" ? "Despausar publicacion" : "Pausar publicacion"));
    };

    if (!juego) {
        return null; // Si no hay datos de juego, no renderizamos nada
    }

    console.log(juego);
    return (
        <>
            <BarraNavegacionEmpresa />
            <div className="game-page-container">
                <div className="titulo">
                    <h1>{juego.nombre}</h1>
                </div>

                <div className="botonesAccion">
                    <Link className="modificar-boton" to={`/editGames/${id}`}>Modificar</Link>
                    <button onClick={cambiarTextoBoton} className="pausar-boton">
                        {textoPausarPublicacion}
                    </button>
                    <button className="eliminar-boton">Eliminar</button>
                </div>

                <div className="contenedor-superior">
                    <img 
                        className="imagen-juego"
                        src={juego.imagen_grande || '/default-image.png'} 
                        alt={`Portada de ${juego.nombre}`}
                    />
                    <div className="informacion">
                        <h2>Desarrollador</h2>
                        <p>Nombre: {juego.desarrollador || 'Desarrollador no disponible'}</p>
                        <p className='descripcion'>Descripción: {juego.descripcion || 'Descripción no disponible'}</p>
                        <p className='logo-desarrollador' style={{ fontSize: '1.5rem' }}>Logo</p>
                        <img 
                            className="developer-logo"                            
                            src={juego.logo || '/default-logo.png'} 
                            alt={`Logo de ${juego.desarrollador}`}
                        />
                    </div>
                </div>

                <div className="bloque-inferior">
                    <div className="datosJuego">
                        <div className="field-group">
                            <label className="label">Cantidad de vistas</label>
                            <div className="static-field">{juego.vistas}</div>
                        </div>

                        <div className="field-group">
                            <label className="label">Cantidad de deseados</label>
                            <div className="static-field">{juego.deseados}</div>
                        </div>

                        <div className="field-group">
                            <label className="label">Cantidad de compras</label>
                            <div className="static-field">{juego.compras}</div>
                        </div>

                        <div className="field-group">
                            <label className="label">Tasa de conversión</label>
                            <div className="static-field">{juego.tasa_conversion}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GamePageEmpresa;