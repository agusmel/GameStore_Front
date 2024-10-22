import './GamePage.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import { useParams } from 'react-router-dom'; 
import { juegos } from '../data/juegos.js'; 


function GamePage() {
    const { nombre } = useParams();
    const juego = juegos.find(j => j.nombre === nombre); 
    const [soSeleccionado, setSoSeleccionado] = useState('windows');
    
    if (!juego) {
        return <div>No se encontró el juego.</div>;
    }

    const requisitos = juego.requisitos[soSeleccionado];

    const obtenerClaseCalificacion = (calificacion) => {
        if (calificacion === 1 || calificacion === 2) {
            return 'calificacion-baja'; // Rojo
        } else if (calificacion === 3) {
            return 'calificacion-media'; // Amarillo
        } else {
            return 'calificacion-alta'; // Verde
        }
    };

    return (
        <>
            <BarraNavegacion/>
            <div className="game-page-container">



                <div className="titulo">
                    <h1>{juego.nombre}</h1> 
                </div>

                <div className="contenedor-sup">
                    <img 
                        className="imagen-juego"
                        src={juego.imagenGrande}
                        alt="Portada del juego"
                    />
                    <div className="informacion">
                        <h2>Desarrollador</h2>
                        <p>nombre:{juego.desarrollador} </p>
                        <p className='descripcion'>descripcion:{juego.descripcionDesarrollador} </p>
                        <p className='logo-desarrollador' style={{ fontSize: '1.5rem'}}>logo</p>
                        <img 
                            className="developer-logo"                           
                            src={juego.logoDesarrolladora}
                            alt="Logo del desarrollador"
                        />

                        <p className='precio'>precio: ${juego.precio}</p>
                        <div className="botones">
                            <button className="agregar-deseados">Añadir a deseados</button>
                            <button className="agregar-carrito">Agregar al carrito</button>                    
                       </div>  
                    </div>                  
                </div>
                


                <div className="bloque-inf">
                    <div className="izq">
                        <div className="game-details">
                            <div className="acerca-juego">
                                <h2>Descripcion del juego</h2>
                                <p>{juego.descrpcionJuego}</p>
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
                                        <li><strong>OS:</strong> {requisitos.minimos.os}</li>
                                        <li><strong>Procesador:</strong> {requisitos.minimos.procesador}</li>
                                        <li><strong>Memoria:</strong> {requisitos.minimos.memoria}</li>
                                        <li><strong>Gráficos:</strong> {requisitos.minimos.graficos}</li>
                                        <li><strong>DirectX:</strong> {requisitos.minimos.directX}</li>
                                        <li><strong>Almacenamiento:</strong> {requisitos.minimos.almacenamiento}</li>
                                    </ul>
                                </div>
                                <div className="recomendados">
                                    <h3>Recomendado</h3>
                                    <ul>
                                        <li><strong>OS:</strong> {requisitos.recomendados.os}</li>
                                        <li><strong>Procesador:</strong> {requisitos.recomendados.procesador}</li>
                                        <li><strong>Memoria:</strong> {requisitos.recomendados.memoria}</li>
                                        <li><strong>Gráficos:</strong> {requisitos.recomendados.graficos}</li>
                                        <li><strong>DirectX:</strong> {requisitos.recomendados.directX}</li>
                                        <li><strong>Almacenamiento:</strong> {requisitos.recomendados.almacenamiento}</li>
                                    </ul>
                                </div>
                            </div>                 
                        
                        </div> 
                        <div className="opiniones-container">
                            <h2>Opiniones</h2>
                            <div className="opiniones">
                                {juego.opiniones.map((opinion, index) => (
                                <div key={index} className="opinion">
                                    <p className={obtenerClaseCalificacion(opinion.calificacion)}> Calificación: {opinion.calificacion}</p>
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
                                {juego.etiquetas.map((etiqueta, index) => (
                                    <li key={index}>{etiqueta}</li>
                                ))}
                                </ul>
                            </div>

                            <div className="caracteristicas">
                                <h2>Características</h2>
                                <ul>
                                {juego.caracteristicas.map((caracteristica, index) => (
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
                                    {juego.idiomas.map((idioma, index) => (
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
