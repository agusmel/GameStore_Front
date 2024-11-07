import './GamePageEmpresa.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { juegos } from '../data/juegos.js'; 
import BarraNavegacionEmpresa from '../componentes/BarraNavegacionEmpresa.jsx';

function GamePageEmpresa() {
    const { nombre } = useParams();
    const juego = juegos.find(j => j.nombre === nombre); 

    if (!juego) {
        return <div>No se encontró el juego.</div>;
    }

    const [textoPausarPublicacion, setTextoDespausarPublicacion] = useState("Pausar publicacion");

    const cambiarTextoBoton = () => {
        setTextoDespausarPublicacion((prevTexto) => (prevTexto === "Pausar publicacion" ? "Despausar publicacion" : "Pausar publicacion"));
    };
  return (
        <>
            <BarraNavegacionEmpresa/>
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
                    </div>                  
                </div>

                <div className="bloque-inferior">
                    <div className="datosJuego">
                        
                        <div className="field-group">
                            <label className="label">Cantidad de vistas</label>
                            <div className="static-field">{12}</div>
                        </div>

                        <div className="field-group">
                            <label className="label">Cantidad de deseados</label>
                            <div className="static-field">{10}</div>
                        </div>

                        <div className="field-group">
                            <label className="label">Cantidad de compras</label>
                            <div className="static-field">{2}</div>
                        </div>

                        <div className="field-group">
                            <label className="label">tasa de convercion</label>
                            <div className="static-field">{1}</div>
                        </div>

                    </div>

                </div>
            </div>
        </>

  );
}

export default GamePageEmpresa;