import './GamePageEmpresa.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BarraNavegacionEmpresa from '../componentes/BarraNavegacionEmpresa.jsx';

function GamePageEmpresa() {
    const { id } = useParams(); // Obtenemos el 'id' del juego de la URL
    const [juego, setJuego] = useState(null); // Estado para almacenar los datos del juego
    const [loading, setLoading] = useState(true); // Estado para controlar la carga
    const [error, setError] = useState(null); // Estado para manejar errores

    // Efecto que se ejecuta cuando el componente se monta
    useEffect(() => {
        // Fetch para obtener los datos del juego desde el backend, ahora usando 'id'
        const fetchJuego = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/videojuegos/empresaJuego/${id}`, {
                    method: "GET",                             // Método GET
                    headers: { 
                        "Content-Type": "application/json"    // Cabecera indicando que se espera JSON
                    },
                    credentials: "include",                    // Incluir credenciales (cookies, sesión)
                });

                if (!response.ok) {
                    throw new Error('No se pudo obtener el juego');
                }

                const data = await response.json();
                console.log(data); // Procesamos la respuesta
                setJuego(data); // Actualizamos el estado con los datos del juego
                setLoading(false); // Cambiamos el estado de carga
            } catch (error) {
                setError(error.message); // Capturamos cualquier error
                setLoading(false); // También cambiamos el estado de carga
            }
        };

        fetchJuego(); // Llamamos a la función fetch al montar el componente
    }, [id]); // Solo se ejecuta cuando 'id' cambia

    // Si estamos cargando, mostramos un mensaje de carga
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Si ocurre un error, lo mostramos
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Si no se encuentra el juego, mostramos un mensaje


    const [textoPausarPublicacion, setTextoDespausarPublicacion] = useState("Pausar publicacion");

    const cambiarTextoBoton = () => {
        setTextoDespausarPublicacion((prevTexto) => (prevTexto === "Pausar publicacion" ? "Despausar publicacion" : "Pausar publicacion"));
    };

    return (
        <>
            <BarraNavegacionEmpresa />
            <div className="game-page-container">
                <div className="titulo">
                    <h1>{juego.nombre}</h1>
                </div>

                <div className="botonesAccion">
                    <button>Modificar</button>
                    <button onClick={cambiarTextoBoton}>{textoPausarPublicacion}</button>
                    <button>Eliminar</button>
                </div>

                <div className="contenedor-superior">
                    <img 
                        className="imagen-juego"
                        src={juego.imagen_chica}
                        alt="Portada del juego"
                    />
                    <div className="informacion">
                        <h2>Desarrollador</h2>
                        <p>nombre: {juego.desarrollador}</p>
                        <p className='descripcion'>descripcion: {juego.descripcion}</p>
                        <p className='logo-desarrollador' style={{ fontSize: '1.5rem'}}>logo</p>
                        <img 
                            className="developer-logo"                           
                            src={juego.logo}
                            alt="Logo del desarrollador"
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