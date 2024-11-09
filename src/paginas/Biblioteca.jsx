import React, { useState, useEffect } from 'react';
import './Biblioteca.css';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

// Función para obtener la lista de juegos desde el backend
const fetchGames = async () => {
  const response = await fetch('http://localhost:3000/api/biblioteca', {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error('Error al obtener la lista de juegos');
  }
  return response.json(); // Suponemos que la respuesta es un array de juegos con el puntaje promedio
};

// Función para enviar la puntuación al backend
const submitRating = async (email_usuario, id_videojuego, puntaje) => {
  const response = await fetch('http://localhost:3000/api/biblioteca/puntaje', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email_usuario, id_videojuego, puntaje })
  });

  if (!response.ok) {
    throw new Error('Error al enviar la puntuación');
  }
  return response.json();
};

// Función para enviar la reseña al backend
const submitReview = async (id_videojuego, nombreJuego, reseña) => {
  const response = await fetch('http://localhost:3000/api/biblioteca/resena', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id_videojuego, nombreJuego, reseña })
  });

  if (!response.ok) {
    throw new Error('Error al enviar la reseña');
  }
  return response.json();
};

function Biblioteca() {
  const [juegos, setJuegos] = useState([]);  // Lista de juegos obtenida de la API
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);  // Juego seleccionado
  const [puntuacionSeleccionada, setPuntuacionSeleccionada] = useState(null);  // Puntuación seleccionada
  const [reseña, setReseña] = useState('');  // Contenido de la reseña
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [error, setError] = useState(null);  // Estado de error
  const [emailUsuario, setEmailUsuario] = useState('usuario@example.com');  // Simula el email del usuario, cambiar según tu lógica

  useEffect(() => {
    // Cargar los juegos cuando el componente se monta
    const loadGames = async () => {
      try {
        const data = await fetchGames();
        setJuegos(data); // Guardamos la lista de juegos, ahora con el puntaje promedio
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Maneja la selección de un juego
  const seleccionarJuego = (nombreJuego) => {
    const juego = juegos.find(j => j.nombre === nombreJuego);
    if (juego) {
      setJuegoSeleccionado(juego);
      setPuntuacionSeleccionada(null);  // Resetear la puntuación al cambiar de juego
      setReseña('');  // Resetear la reseña al cambiar de juego
    }
  };

  // Maneja la puntuación
  const manejarPuntuacion = (num) => {
    setPuntuacionSeleccionada(num);
  };

  // Maneja el cambio en el campo de la reseña
  const manejarCambioReseña = (event) => {
    setReseña(event.target.value);
  };

  // Envía la puntuación al backend
  const manejarEnvioPuntuacion = async () => {
    if (!juegoSeleccionado || puntuacionSeleccionada === null) {
      alert('Por favor, selecciona un puntaje antes de enviar.');
      return;
    }

    try {
      // Llamar al endpoint para enviar la puntuación
      await submitRating(emailUsuario, juegoSeleccionado.id, puntuacionSeleccionada);
      alert('¡Puntuación enviada con éxito!');
      setPuntuacionSeleccionada(null);  // Resetear la puntuación después del envío
    } catch (error) {
      alert('Error al enviar la puntuación: ' + error.message);
    }
  };

  // Envía la reseña al backend
  const manejarEnvioReseña = async () => {
    if (!juegoSeleccionado || reseña === '') {
      alert('Por favor, selecciona un juego y escribe una reseña antes de enviar.');
      return;
    }

    try {
      await submitReview(juegoSeleccionado.id, juegoSeleccionado.nombre, reseña);
      alert('¡Reseña enviada con éxito!');
      setReseña('');  // Resetear la reseña después del envío
    } catch (error) {
      alert('Error al enviar la reseña: ' + error.message);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <BarraNavegacion />
      <div className='app'>
        <div className='content'>
          <div className='sidebar'>
            <input type='text' placeholder='Buscar' className='search' />
            <ul className='games-list'>
              {juegos.map((juego, index) => (
                <li
                  key={index}
                  className={`game-item ${juegoSeleccionado?.nombre === juego.nombre ? 'selected' : ''}`}
                  onClick={() => seleccionarJuego(juego.nombre)}>
                  {juego.nombre} {juego.puntaje_promedio && (
                    <span className="rating">Puntaje: {juego.puntaje_promedio}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className='main-content'>
            {juegoSeleccionado ? (
              <div className='game-detail'>
                <img src={juegoSeleccionado.imagen_grande} className='game-banner' alt="Banner del juego" />
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
                <span>Puntúa su experiencia</span>
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
              <textarea
                placeholder='Escriba...'
                className='review-text'
                value={reseña}
                onChange={manejarCambioReseña}
              ></textarea>
              <div className='review-actions'>
                <button className='submit-review' onClick={manejarEnvioPuntuacion}><ThumbUpIcon /> Enviar Puntuación</button>
                <button className='submit-review' onClick={manejarEnvioReseña}><ThumbUpIcon /> Enviar Reseña</button>
                <button className='cancel-review' onClick={() => setReseña('')}><ThumbDownIcon /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Biblioteca;
