import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './EditGames.css';

const EditGames = () => {
  const [gameData, setGameData] = useState({
    nombre: '',
    descripcion_juego: '',
    precio: '',
    sistema_operativo: '',
    idioma: '',
    numero_jugadores: '',
    puntaje: '',
    desarrollador: '',
    descripcion_desarrollador: '',
    logo_desarrolladora: '',
    imagen_chica: '',
    imagen_grande: '',
    etiquetas: '',
    caracteristicas: '',
    idiomas: '',
    requisitos: '',
    habilitado: true,
  });
  const [formError, setFormError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/videojuegos/juego/${id}`);
        if (!response.ok) throw new Error('No se pudo cargar el juego');
        const data = await response.json();
        setGameData({
          ...data[0],
          etiquetas: data[0].etiquetas.join(', '),
          caracteristicas: data[0].caracteristicas.join(', '),
          idiomas: data[0].idiomas.map((lang) => lang.idioma).join(', ')
        });
      } catch (err) {
        setFormError('Error al cargar los datos del juego');
      }
    };
    fetchGameData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedGameData = {
      nombre: gameData.nombre,
      precio: parseFloat(gameData.precio),
      desarrollador: gameData.desarrollador,
      descripcion_desarrollador: gameData.descripcion_desarrollador,
      descripcion_juego: gameData.descripcion_juego,
      logo_desarrolladora: gameData.logo_desarrolladora,
      imagen_chica: gameData.imagen_chica,
      imagen_grande: gameData.imagen_grande,
      etiquetas: gameData.etiquetas.split(',').map(tag => tag.trim()),
      caracteristicas: gameData.caracteristicas.split(',').map(caract => caract.trim()),
      idiomas: gameData.idiomas.split(',').map(lang => ({ idioma: lang.trim(), audio: true, interfaz: true, subtitulos: true })),
      requisitos: gameData.requisitos,
      habilitado: gameData.habilitado ? 1 : 0,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/videojuegos/editar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGameData),
      });

      if (!response.ok) throw new Error('Error al actualizar el juego');
      navigate(`/catalogoEmpresa`);
    } catch (err) {
      setFormError('Error al actualizar el juego');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGameData({
      ...gameData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="edit-games-container">
      <h2 className="edit-title">Editar Juego</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={gameData.nombre}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="descripcion_juego"
            value={gameData.descripcion_juego}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={gameData.precio}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Desarrollador:</label>
          <input
            type="text"
            name="desarrollador"
            value={gameData.desarrollador}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Descripción del Desarrollador:</label>
          <textarea
            name="descripcion_desarrollador"
            value={gameData.descripcion_desarrollador}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label>Logo Desarrolladora:</label>
          <input
            type="text"
            name="logo_desarrolladora"
            value={gameData.logo_desarrolladora}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Imagen Pequeña:</label>
          <input
            type="text"
            name="imagen_chica"
            value={gameData.imagen_chica}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Imagen Grande:</label>
          <input
            type="text"
            name="imagen_grande"
            value={gameData.imagen_grande}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Etiquetas (separadas por comas):</label>
          <input
            type="text"
            name="etiquetas"
            value={gameData.etiquetas}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Características (separadas por comas):</label>
          <input
            type="text"
            name="caracteristicas"
            value={gameData.caracteristicas}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Idiomas (separados por comas):</label>
          <input
            type="text"
            name="idiomas"
            value={gameData.idiomas}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Requisitos:</label>
          <textarea
            name="requisitos"
            value={gameData.requisitos}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label>Habilitado:</label>
          <input
            type="checkbox"
            name="habilitado"
            checked={gameData.habilitado}
            onChange={handleChange}
            className="form-checkbox"
          />
        </div>

        {formError && <div className="form-error">{formError}</div>}

        <div className="button-group">
          <button type="submit" className="save-btn">Guardar Cambios</button>
          <Link to="/catalogoEmpresa" className="cancel-btn">Cancelar</Link>
        </div>
      </form>
    </div>
  );
};

export default EditGames;
