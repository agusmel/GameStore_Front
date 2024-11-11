import './Catalogo.css';
import { Card, CardGrande } from '../componentes/Card.jsx';
import React, { useEffect, useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIos';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import { useParams } from 'react-router-dom';

function Catalogo() {
  const listRef = useRef();
  const { categorias } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [juegos, setJuegos] = useState([]);
  const [juegosDest, setJuegosDest] = useState([]);

  const obtenerVideojuegosCatalogo = async () => {
    try {
      const response1 = await fetch("http://localhost:3000/api/videojuegos/catalogo", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      });
      if (!response1.ok) throw new Error("Error al obtener el catálogo");
      return await response1.json();
    } catch (error) {
      console.error("Error en obtenerVideojuegosCatalogo:", error);
      return [];
    }
  };

  const obtenerVideojuegosCarrusel = async () => {
    try {
      const response2 = await fetch("http://localhost:3000/api/videojuegos/carrusel", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      if (!response2.ok) throw new Error("Error al obtener los videojuegos del carrusel");
      return await response2.json();
    } catch (error) {
      console.error("Error en obtenerVideojuegosCarrusel:", error);
      return [];
    }
  };

  useEffect(() => {
    const cargarVideojuegos = async () => {
      try {
        const dataCatalogo = await obtenerVideojuegosCatalogo();
        const dataCarrusel = await obtenerVideojuegosCarrusel();
        console.log("Datos de juegosDest:", dataCarrusel);
        setJuegos(dataCatalogo);
        setJuegosDest(dataCarrusel);
      } catch (error) {
        console.error("Error cargando los videojuegos:", error);
      }
    };
    cargarVideojuegos();
  }, []);

  const esRangoPrecio = categorias && /^\d+\-\d+$/.test(categorias);
  const rango = esRangoPrecio ? categorias.split('-').map(parseFloat) : [];
  
  const juegosFiltradosPorEtiqueta = !esRangoPrecio && categorias
    ? juegos.filter((juego) => juego.habilitado === 1 && juego.etiquetas && juego.etiquetas.includes(categorias))
    : juegos.filter((juego) => juego.habilitado === 1);

  const juegosFiltradosPorCaracteristica = juegosFiltradosPorEtiqueta.length > 0
    ? juegosFiltradosPorEtiqueta
    : juegos.filter((juego) => 
        juego.habilitado === 1 && 
        juego.caracteristicas && 
        juego.caracteristicas.includes(categorias)
      );

      const juegosFiltradosPorIdioma = juegosFiltradosPorCaracteristica.length > 0
      ? juegosFiltradosPorCaracteristica
      : juegos.filter((juego) => 
          juego.habilitado === 1 && 
          Array.isArray(juego.idiomas) && // Verifica si juego.idiomas es un array
          juego.idiomas.some((idioma) => idioma.idioma === categorias)
        );
    
  const juegosFiltrados = juegosFiltradosPorIdioma.length > 0
    ? juegosFiltradosPorIdioma
    : juegos.filter((juego) => 
        juego.habilitado === 1 &&
        juego.requisitos && (
          (categorias === 'windows' && (juego.requisitos.windows?.minimos || juego.requisitos.windows?.recomendados)) ||
          (categorias === 'linux' && (juego.requisitos.linux?.minimos || juego.requisitos.linux?.recomendados)) ||
          (categorias === 'mac' && (juego.requisitos.mac?.minimos || juego.requisitos.mac?.recomendados))
        )
      );

  // Aplica el filtro de precios si es un rango de precio
  const juegosFiltradosPorPrecio = esRangoPrecio
    ? juegos.filter((juego) => {
        const precio = parseFloat(juego.precio);
        return juego.habilitado === 1 && precio >= rango[0] && precio <= rango[1];
      })
    : juegosFiltrados;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % juegosDest.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + juegosDest.length) % juegosDest.length);
  };

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];
    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);
  console.log(juegos);
  return (
    <>
    
      <BarraNavegacion />
      <div className='container'>
        <div className='titulo-grande'>
          <button className='boton-left-carrousel' onClick={handlePrev}>
            <ArrowBackIosNewIcon />
          </button>
          <ul ref={listRef}>
            {juegosDest.map((item, index) => (
              <li key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
                <CardGrande id={item.id} imagen={item.imagen_grande} nombre={item.nombre} precio={item.precio} />
              </li>
            ))}
          </ul>
          <button className='boton-right-carrousel' onClick={handleNext}>
            <ArrowForwardIosIcon />
          </button>
        </div>
        
        <div className='box-juegos'>
          {juegosFiltradosPorPrecio.length > 0 ? (
            juegosFiltradosPorPrecio.map((juego, index) => (
              <Card key={juego.id || index} id={juego.id} imagen={juego.imagen_chica} nombre={juego.nombre} precio={juego.precio} />
            ))
          ) : (
            <p>No se encontraron resultados</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Catalogo;
