import './Catalogo.css';
import {Card,CardGrande} from '../componentes/Card.jsx';
import { juegos, juegosDest } from '../data/juegos.js';
import React, { useEffect, useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';


function Catalogo() {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <BarraNavegacion/>
      <div className='container'>
        <div className='titulo-grande'>
          <button className='boton-left-carrousel' onClick={handlePrev}><ArrowBackIosNewIcon/></button>
          <ul ref={listRef}>
            {juegosDest.map((item, index) => {
              return (
                <li key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
                  <CardGrande imagen={item.imagen} nombre={item.nombre} precio={item.precio}/>
                </li>
              );
            })}          
          </ul>
          <button className='boton-right-carrousel' onClick={handleNext}><ArrowForwardIosIcon/></button>
        </div>
        <div className='box-juegos'>
          {juegos.map((juegos, index) => (
            <Card key={index} imagen={juegos.imagen} nombre={juegos.nombre} precio={juegos.precio} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Catalogo;