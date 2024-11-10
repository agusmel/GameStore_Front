import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

function FormularioJuego() {
  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion_juego: '',
    precio: '',
    desarrollador: '',
    descripcion_desarrollador: '',
    logo_desarrolladora: '',
    imagen_chica: '',
    imagen_grande: '',
    etiquetas: '',
    caracteristicas: '',
    idiomas: '',
    requisitos: '',
    habilitado: false,
  });

  // Obtén la función navigate usando el hook useNavigate
  const navigate = useNavigate();

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Enviar los datos al backend usando fetch
    try {
      const response = await fetch('http://localhost:3000/api/videojuegos/cargar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Si el juego se agregó correctamente
        alert('Juego agregado exitosamente');
        navigate("/catalogoEmpresa"); // Redirige solo si la autenticación fue exitosa
      } else {
        // Si hubo un error
        alert(`Error: ${data.mensaje}`);
      }
    } catch (error) {
      console.error('Error al agregar el juego:', error);
      alert('Hubo un problema al agregar el juego');
    }
  };

  return (
    <div className="edit-games-container">
      <h2 className="edit-title">Agregar Nuevo Juego</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            className="form-input"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="descripcion_juego"
            className="form-textarea"
            value={formData.descripcion_juego}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            className="form-input"
            value={formData.precio}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Desarrollador:</label>
          <input
            type="text"
            name="desarrollador"
            className="form-input"
            value={formData.desarrollador}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Descripción del Desarrollador:</label>
          <textarea
            name="descripcion_desarrollador"
            className="form-textarea"
            value={formData.descripcion_desarrollador}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Logo Desarrolladora:</label>
          <input
            type="text"
            name="logo_desarrolladora"
            className="form-input"
            value={formData.logo_desarrolladora}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Imagen Pequeña:</label>
          <input
            type="text"
            name="imagen_chica"
            className="form-input"
            value={formData.imagen_chica}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Imagen Grande:</label>
          <input
            type="text"
            name="imagen_grande"
            className="form-input"
            value={formData.imagen_grande}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Etiquetas (separadas por comas):</label>
          <input
            type="text"
            name="etiquetas"
            className="form-input"
            value={formData.etiquetas}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Características (separadas por comas):</label>
          <input
            type="text"
            name="caracteristicas"
            className="form-input"
            value={formData.caracteristicas}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Idiomas (separados por comas):</label>
          <input
            type="text"
            name="idiomas"
            className="form-input"
            value={formData.idiomas}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Requisitos:</label>
          <textarea
            name="requisitos"
            className="form-textarea"
            value={formData.requisitos}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Habilitado:</label>
          <input
            type="checkbox"
            name="habilitado"
            className="form-checkbox"
            checked={formData.habilitado}
            onChange={handleChange}
          />
        </div>

        <div className="button-group">
          <Link to="/catalogoEmpresa" className="cancel-btn">Cancelar</Link>
          <button type="submit" className="save-btn">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}

export default FormularioJuego;