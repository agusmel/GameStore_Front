import './CatalogoEmpresa.css';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { juegos } from '../data/juegos.js'; // Esto lo puedes dejar si necesitas información adicional
import BarraNavegacionEmpresa from '../componentes/BarraNavegacionEmpresa.jsx';
import { CardEmpresa } from '../componentes/CardEmpresa.jsx';
import { Link } from 'react-router-dom';

// Función para obtener los juegos desde el backend
const fetchJuegosEmpresa = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/empresa/catalogo", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error('Error al obtener los juegos');
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener los juegos de la empresa:", error);
    return []; // Retorna un array vacío en caso de error
  }
};
function CatalogoEmpresa() {
  const [juegosFiltrados, setJuegosFiltrados] = useState([]);

  useEffect(() => {
    const obtenerJuegos = async () => {
      const juegosDelBackend = await fetchJuegosEmpresa();
      setJuegosFiltrados(juegosDelBackend);
    };

    obtenerJuegos();
  }, []); // El useEffect se ejecutará solo una vez al cargar el componente

  return (
    <>
      <BarraNavegacionEmpresa />

      <div className='box-juegos'>
        <Link className="card-agregar-juego" to={"/LoadGame"}>
          <AddIcon style={{ fontSize: '100px' }} />
        </Link>

        {juegosFiltrados.map((juego, index) => (
          <CardEmpresa key={index} id={juego.id} imagen={juego.imagen_chica} nombre={juego.nombre} precio={juego.precio}/>
        ))}
      </div>
    </>
  );
}

export default CatalogoEmpresa;