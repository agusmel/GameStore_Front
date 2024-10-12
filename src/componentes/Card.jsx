import React from 'react'
import './Card.css';

//catalogo
function Card({ imagen, nombre, precio }) {
    return (
      <div className="card-box">
        <img className="game-image"src={imagen}/>
        <h3 className="game-title">{nombre}</h3>
        <p className="game-price">{precio}</p>
      </div>
    
    );
  }
  //carrusel
function CardGrande({imagen,nombre,precio}){
  return(
    <div className='card-box-grande'>
      <img className='game-image-grande' src={imagen}/>
      <div className='game-box-bottom'>
        <h3 className="game-title-grande">{nombre}</h3>
        <p className="game-price-grande">{precio}</p>
      </div>

    </div>
  );
}

export  {Card,CardGrande};