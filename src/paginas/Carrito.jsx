import React from 'react';
import './Carrito.css';
import { Link } from 'react-router-dom';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import TarjetaCarrito from '../componentes/tarjetaCarrito.jsx';
import { juegos } from '../data/juegos.js';
import { juegosCarrito } from '../data/juegosCarrito.js';

const Carrito = () => {
    const juegoFiltrado = juegosCarrito.map(juegoCarrito => 
        juegos.find(j => j.nombre === juegoCarrito.nombre) 
    );
    const total = juegoFiltrado.reduce((acumulador, juego) => {
        
        if (juego && typeof juego.precio === 'number') {
            return acumulador + juego.precio; 
        }
        return acumulador;
    }, 0); 

    console.log('Total:', total); 

    return (
        <>
            <BarraNavegacion />
            <div className="checkout">
                {juegoFiltrado.map((juego, index) =>
                    juego ? (
                        <TarjetaCarrito
                            key={index}
                            nombre={juego.nombre}
                            precio={juego.precio}
                            imagen={juego.imagenGrande}
                        />
                    ) : (
                        <p key={index}>El juego no se encontró.</p>
                    )
                )}
            </div>
            <div className="total">
                <p>Total: ${total.toFixed(2)}</p> 
            </div>
                <button className="confirm-btn"><Link to="/pagos">Confirmar</Link></button>
            
        </>
    );
};

export default Carrito;
