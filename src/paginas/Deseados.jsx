import React from 'react';
import './Deseados.css';
import { Link } from 'react-router-dom';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import TarjetaDeseados from '../componentes/TarjetaDeseados.jsx';
import { juegos } from '../data/juegos.js';
import { JuegosDeseados } from '../data/juegosDeseados.js';

const Deseados = () => {
    const juegoFiltrado = JuegosDeseados.map(juegoCarrito => 
        juegos.find(j => j.nombre === juegoCarrito.nombre)
    );

    return (
        <>
            <BarraNavegacion />
            <div className="checkout">
                {juegoFiltrado.map((juego, index) =>
                    juego ? (
                        <TarjetaDeseados
                            key={index}
                            nombre={juego.nombre}
                            imagen={juego.imagenGrande}
                        />
                    ) : (
                        <p key={index}>El juego no se encontró.</p>
                    )
                )}
            </div>
            
        </>
    );
};

export default Deseados;