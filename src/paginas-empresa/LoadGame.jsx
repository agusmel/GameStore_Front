import React, { useState, useEffect } from 'react';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Link } from 'react-router-dom';

function FormularioJuego() {


    return (
        <div className="edit-games-container">
        <h2 className="edit-title">Editar Juego</h2>
        <form  className="edit-form">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"            
              className="form-input"
            />
          </div>
  
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="descripcion_juego"          
              className="form-textarea"
            />
          </div>
  
          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              name="precio"          
              className="form-input"
            />
          </div>
  
          <div className="form-group">
            <label>Desarrollador:</label>
            <input
              type="text"
              name="desarrollador"        
              className="form-input"
            />
          </div>
  
          <div className="form-group">
            <label>Descripción del Desarrollador:</label>
            <textarea
              name="descripcion_desarrollador"        
              className="form-textarea"
            />
          </div>
  
          <div className="form-group">
            <label>Logo Desarrolladora:</label>
            <input
              type="text"
              name="logo_desarrolladora"   
              className="form-input"
            />
          </div>
  
          <div className="form-group">
            <label>Imagen Pequeña:</label>
            <input
              type="text"
              name="imagen_chica"     
              className="form-input"
            />
          </div>
  
          <div className="form-group">
            <label>Imagen Grande:</label>
            <input
              type="text"
              name="imagen_grande" 
              className="form-input"
            />
          </div>
  
          <div className="form-group">
            <label>Etiquetas (separadas por comas):</label>
            <input
              type="text"
              name="etiquetas"        
              className="form-input"
            />
          </div>
  
          <div className="form-group">
            <label>Características (separadas por comas):</label>
            <input
              type="text"
              name="caracteristicas"       
              className="form-input"
            />
          </div>
  
          <div className="form-group">
            <label>Idiomas (separados por comas):</label>
            <input
              type="text"
              name="idiomas"
              className="form-input"
            />
          </div>
  
          <div className="form-group">
            <label>Requisitos:</label>
            <textarea
              name="requisitos"         
              className="form-textarea"
            />
          </div>
  
          <div className="form-group">
            <label>Habilitado:</label>
            <input
              type="checkbox"
              name="habilitado"
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
