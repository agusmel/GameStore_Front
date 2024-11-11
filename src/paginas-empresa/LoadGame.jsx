import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EditGames.css';

const FormularioJuego = () => {
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
    requisitos: {
      windows: { minimos: {}, recomendados: {} },
      linux: { minimos: {}, recomendados: {} },
      mac: { minimos: {}, recomendados: {} },
    },
    habilitado: true,
  });
  const [selectedOS, setSelectedOS] = useState("windows");
  const navigate = useNavigate();

  // Manejo de cambios en campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGameData({
      ...gameData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Manejo de selección de sistema operativo
  const handleOSChange = (os) => {
    setSelectedOS(os);
  };

  // Manejo de cambios en los requisitos según sistema operativo seleccionado
  const handleRequisitoChange = (level, field, value) => {
    setGameData((prevData) => ({
      ...prevData,
      requisitos: {
        ...prevData.requisitos,
        [selectedOS]: {
          ...prevData.requisitos[selectedOS],
          [level]: {
            ...prevData.requisitos[selectedOS][level],
            [field]: value,
          },
        },
      },
    }));
  };

  // Envío de formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/videojuegos/cargar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });

      if (response.ok) {
        alert('Juego agregado exitosamente');
        navigate('/catalogoEmpresa');
      } else {
        const data = await response.json();
        alert(`Error: ${data.mensaje}`);
      }
    } catch (error) {
      console.error('Error al agregar el juego:', error);
      alert('Hubo un problema al agregar el juego');
    }
  };

  console.log(gameData);
  return (
    <div className="edit-games-container">
      <h2 className="edit-title">Agregar Nuevo Juego</h2>
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

        <div className="os-selector">
          <button type="button" className={selectedOS === "windows" ? "active" : ""} onClick={() => handleOSChange("windows")}>Windows</button>
          <button type="button" className={selectedOS === "linux" ? "active" : ""} onClick={() => handleOSChange("linux")}>Linux</button>
          <button type="button" className={selectedOS === "mac" ? "active" : ""} onClick={() => handleOSChange("mac")}>MacOS</button>
        </div>

        <div className="requerimientos">
          <div className="requerimiento">
            <h4>Requerimientos mínimos del sistema - {selectedOS}</h4>
            <input placeholder="OS:" value={gameData.requisitos[selectedOS]?.minimos.os || ""} onChange={(e) => handleRequisitoChange("minimos", "os", e.target.value)} />
            <input placeholder="Procesador:" value={gameData.requisitos[selectedOS]?.minimos.procesador || ""} onChange={(e) => handleRequisitoChange("minimos", "procesador", e.target.value)} />
            <input placeholder="Memoria:" value={gameData.requisitos[selectedOS]?.minimos.memoria || ""} onChange={(e) => handleRequisitoChange("minimos", "memoria", e.target.value)} />
            <input placeholder="Gráficos:" value={gameData.requisitos[selectedOS]?.minimos.graficos || ""} onChange={(e) => handleRequisitoChange("minimos", "graficos", e.target.value)} />
            <input placeholder="Almacenamiento:" value={gameData.requisitos[selectedOS]?.minimos.almacenamiento || ""} onChange={(e) => handleRequisitoChange("minimos", "almacenamiento", e.target.value)} />
          </div>
          <div className="requerimiento">
            <h4>Requerimientos recomendados del sistema - {selectedOS}</h4>
            <input placeholder="OS:" value={gameData.requisitos[selectedOS]?.recomendados.os || ""} onChange={(e) => handleRequisitoChange("recomendados", "os", e.target.value)} />
            <input placeholder="Procesador:" value={gameData.requisitos[selectedOS]?.recomendados.procesador || ""} onChange={(e) => handleRequisitoChange("recomendados", "procesador", e.target.value)} />
            <input placeholder="Memoria:" value={gameData.requisitos[selectedOS]?.recomendados.memoria || ""} onChange={(e) => handleRequisitoChange("recomendados", "memoria", e.target.value)} />
            <input placeholder="Gráficos:" value={gameData.requisitos[selectedOS]?.recomendados.graficos || ""} onChange={(e) => handleRequisitoChange("recomendados", "graficos", e.target.value)} />
            <input placeholder="Almacenamiento:" value={gameData.requisitos[selectedOS]?.recomendados.almacenamiento || ""} onChange={(e) => handleRequisitoChange("recomendados", "almacenamiento", e.target.value)} />
          </div>
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

        <div className="button-group">
          <Link to="/catalogoEmpresa" className="cancel-btn">Cancelar</Link>
          <button type="submit" className="save-btn">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioJuego;