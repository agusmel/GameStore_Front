import './GamePage.css';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';

const fetchGameDetails = async (id) => {
    const response = await fetch(`http://localhost:3000/api/videojuegos/juego/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error('Error al obtener los detalles del juego');
    }

    return response.json(); 
};

const addToWishList = async (id) => {
    if (!id) {
        throw new Error('ID del juego no válido');
    }

    const response = await fetch(`http://localhost:3000/api/wishlist/add/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Error al agregar el juego a la lista de deseados: ${errorDetails.message || 'Desconocido'}`);
    }

    return response.json();
};

const addToCart = async (id) => {
    if (!id) {
        throw new Error('ID del juego no válido');
    }

    const response = await fetch(`http://localhost:3000/api/carrito/add/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error al agregar el juego al carrito');
    }

    return response.json();
};

function GamePage() {
    const { id } = useParams();
    const [juego, setJuego] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [soSeleccionado, setSoSeleccionado] = useState('windows');

    useEffect(() => {
        const getGameDetails = async () => {
            try {
                const gameData = await fetchGameDetails(id);
                setJuego(gameData[0]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getGameDetails();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleAddToWishList = async () => {
        try {
            await addToWishList(id);
            alert('Juego añadido a la lista de deseados');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleAddToCart = async () => {
        try {
            await addToCart(id);
            alert('Juego añadido al carrito');
        } catch (error) {
            alert(error.message);
        }
    };

    const obtenerClaseCalificacion = (calificacion) => {
        if (calificacion === 1 || calificacion === 2) {
            return 'calificacion-baja';
        } else if (calificacion === 3) {
            return 'calificacion-media';
        } else {
            return 'calificacion-alta';
        }
    };

    return (
        <>
            <BarraNavegacion />
            <div className="game-page-container">
                <div className="titulo">
                    <h1>{juego.nombre}</h1> 
                </div>

                <div className="contenedor-sup">
                    <img 
                        className="imagen-juego"
                        src={juego.imagen_grande}
                        alt="Portada del juego"
                    />
                    <div className="informacion">
                        <h2>Desarrollador</h2>
                        <p>Nombre: {juego.desarrollador}</p>
                        <p className='descripcion'>Descripción: {juego.descripcion_desarrollador}</p>
                        <img 
                            className="developer-logo"
                            src={juego.logo_desarrolladora}
                            alt="Logo del desarrollador"
                        />
                        <p className="precio">Precio: {juego.precio}</p>
                        <div className="botones">
                            <button className="agregar-deseados" onClick={handleAddToWishList}>Añadir a deseados</button>
                            <button className="agregar-carrito" onClick={handleAddToCart}>Agregar al carrito</button>
                        </div>
                    </div>
                </div>

                <div className="bloque-inf">
                    <div className="izq">
                        <div className="game-details">
                            <div className="acerca-juego">
                                <h2>Descripción del juego</h2>
                                <p>{juego.descripcion_juego}</p>
                            </div>
                        </div>
                        <div className="requisitos">
                            <div className="navegacion-requisitos">
                                <h2>Requisitos</h2>
                                <div className="botones-so">
                                    <button onClick={() => setSoSeleccionado('windows')}>Windows</button>
                                    <button onClick={() => setSoSeleccionado('mac')}>Mac</button>
                                    <button onClick={() => setSoSeleccionado('linux')}>Linux</button>
                                </div>
                            </div>

                            <div className="requisitos-container">
                                <div className="minimos">
                                    <h3>Mínimo</h3>
                                    <ul>
                                        <li><strong>OS:</strong> {juego.requisitos?.[soSeleccionado]?.minimos?.os}</li>
                                        <li><strong>Procesador:</strong> {juego.requisitos?.[soSeleccionado]?.minimos?.procesador}</li>
                                        <li><strong>Memoria:</strong> {juego.requisitos?.[soSeleccionado]?.minimos?.memoria}</li>
                                        <li><strong>Gráficos:</strong> {juego.requisitos?.[soSeleccionado]?.minimos?.graficos}</li>
                                        <li><strong>DirectX:</strong> {juego.requisitos?.[soSeleccionado]?.minimos?.directX}</li>
                                        <li><strong>Almacenamiento:</strong> {juego.requisitos?.[soSeleccionado]?.minimos?.almacenamiento}</li>
                                    </ul>
                                </div>
                                <div className="recomendados">
                                    <h3>Recomendado</h3>
                                    <ul>
                                        <li><strong>OS:</strong> {juego.requisitos?.[soSeleccionado]?.recomendados?.os}</li>
                                        <li><strong>Procesador:</strong> {juego.requisitos?.[soSeleccionado]?.recomendados?.procesador}</li>
                                        <li><strong>Memoria:</strong> {juego.requisitos?.[soSeleccionado]?.recomendados?.memoria}</li>
                                        <li><strong>Gráficos:</strong> {juego.requisitos?.[soSeleccionado]?.recomendados?.graficos}</li>
                                        <li><strong>DirectX:</strong> {juego.requisitos?.[soSeleccionado]?.recomendados?.directX}</li>
                                        <li><strong>Almacenamiento:</strong> {juego.requisitos?.[soSeleccionado]?.recomendados?.almacenamiento}</li>
                                    </ul>
                                </div>
                            </div>                 
                        </div> 
                        <div className="opiniones-container">
                            <h2>Opiniones</h2>
                            <div className="opiniones">
                                {juego.opiniones?.map((opinion, index) => (
                                    <div key={index} className="opinion">
                                        <p className={obtenerClaseCalificacion(opinion.calificacion)}>Calificación: {opinion.calificacion}</p>
                                        <p>{opinion.texto}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="der">
                        <div className="detalles-adicionales"> 
                            <div className="etiquetas">
                                <h2>Etiquetas</h2>
                                <ul>
                                
                                {juego.etiquetas?.map((etiqueta, index) => (
                                    <li key={index}>{etiqueta}</li>
                                ))}
                                </ul>
                            </div>

                            <div className="caracteristicas">
                                <h2>Características</h2>
                                <ul>
                                {juego.caracteristicas?.map((caracteristica, index) => (
                                    <li key={index}>{caracteristica}</li>
                                ))}
                                </ul>
                            </div>

                            <div className="idiomas">
                                <h2>Idiomas</h2>
                                <table>
                                <thead>
                                    <tr>
                                    <th>Idioma</th>
                                    <th>Interfaz</th>
                                    <th>Subtítulos</th>
                                    <th>Audio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {juego.idiomas?.map((idioma, index) => (
                                    <tr key={index}>
                                        <td>{idioma.idioma}</td>
                                        <td>{idioma.interfaz ? '✔️' : ''}</td>
                                        <td>{idioma.subtitulos ? '✔️' : ''}</td>
                                        <td>{idioma.audio ? '✔️' : ''}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>                 
                </div>
            </div>               
        </>
    );
}

export default GamePage;
