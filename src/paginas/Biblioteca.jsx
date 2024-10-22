import React, { useState } from 'react';
import './Biblioteca.css';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import { juegos } from '../data/juegos.js';
import { MisJuegos } from '../data/juegosUsuario.js'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


function Biblioteca() {
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(MisJuegos[0]); 
  const [puntuacionSeleccionada, setPuntuacionSeleccionada] = useState(null); 

  const seleccionarJuego = (nombreJuego) => {
    const juego = MisJuegos.find(j => j.nombre === nombreJuego); 
    if (juego) {
      setJuegoSeleccionado(juego); 
      setPuntuacionSeleccionada(null); 
    }
  };

  const manejarPuntuacion = (num) => {
    setPuntuacionSeleccionada(num); 
  };

  const juegoBiblio = juegos.find(j => j.nombre === juegoSeleccionado.nombre); 

  return (
    <>
      <BarraNavegacion />
      <div className='app'>
        <div className='content'>
          <div className='sidebar'>
            <input type='text' placeholder='Buscar' className='search' />
            <ul className='games-list'>
              {MisJuegos.map((juego, index) => (
                <li
                  key={index}
                  className={`game-item ${juegoSeleccionado.nombre === juego.nombre ? 'selected' : ''}`}
                  onClick={() => seleccionarJuego(juego.nombre)}>
                  {juego.nombre}
                </li>
              ))}
            </ul>
          </div>
          <div className='main-content'>
            {juegoBiblio ? ( 
              <div className='game-detail'>
                <img src={juegoBiblio.imagenAncha} className='game-banner'/>
                <div className='game-info'>
                  <button className='install-btn'>Instalar</button>
                </div>
              </div>
            ) : (
              <div>No se ha seleccionado ningún juego</div>
            )}

            <div className='review'>
              <h3>Reseña</h3>
              <div className='rating'>
                <span>Puntua su experiencia</span>
                <div className='rating-options'>
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      className={`rating-btn ${puntuacionSeleccionada === num ? 'selected' : ''}`}
                      onClick={() => manejarPuntuacion(num)} 
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <textarea placeholder='Escriba...' className='review-text'></textarea>
              <div className='review-actions'>
                <button className='submit-review'><ThumbUpIcon /></button>
                <button className='cancel-review'><ThumbDownIcon /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Biblioteca;
