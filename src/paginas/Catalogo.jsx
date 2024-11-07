import './Catalogo.css';
import { Card, CardGrande } from '../componentes/Card.jsx';
import React, { useEffect, useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';

function Catalogo() {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [juegos, setJuegos] = useState([]);
  const [juegosDest, setJuegosDest] = useState([]);

  // Función para obtener el catálogo de videojuegos
  const obtenerVideojuegosCatalogo = async () => {
    try {
      const response1 = await fetch("http://localhost:3000/api/videojuegos/catalogo", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials:'include'
      });
      if (!response1.ok) throw new Error("Error al obtener el catálogo");
      return await response1.json();
    } catch (error) {
      console.error("Error en obtenerVideojuegosCatalogo:", error);
      return [];
    }
  };

  const juegosCatalogo =  obtenerVideojuegosCatalogo();
  console.log(juegosCatalogo);
  // Función para obtener los videojuegos destacados del carrusel
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



  // useEffect para cargar los datos al montar el componente
  useEffect(() => {
    const cargarVideojuegos = async () => {
      try {
        const dataCatalogo = await obtenerVideojuegosCatalogo();
        const dataCarrusel = await obtenerVideojuegosCarrusel();

        setJuegos(dataCatalogo);
        setJuegosDest(dataCarrusel);
      } catch (error) {
        console.error("Error cargando los videojuegos:", error);
      }
    };
    cargarVideojuegos();
  }, []);

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
                <CardGrande imagen={item.imagen} nombre={item.nombre} precio={item.precio} />
              </li>
            ))}
          </ul>
          <button className='boton-right-carrousel' onClick={handleNext}>
            <ArrowForwardIosIcon />
          </button>
        </div>
        <div className='box-juegos'>
          {juegos.map((juego, index) => (
            <Card key={index} imagen={juego.imagenChica} nombre={juego.nombre} precio={juego.precio} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Catalogo;