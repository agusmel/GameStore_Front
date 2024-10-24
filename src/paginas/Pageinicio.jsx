import './PageInicio.css';
import { Link, useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';



const PageInicio = () => {
   

    return (
        <>
            <div className="fondo">
                <div class="circle circle1"></div>
                <div class="circle circle2"></div>
                <div class="circle circle3"></div>
                <div class="circle circle4"></div>
                <div class="circle circle5"></div>
                <div class="circle circle6"></div>
            </div>
            <div className="encabezado">
                <h1>Bienvenido</h1>    
            </div>
            <div className="subtitulo">
                <h2>Elige tu tipo de cuenta</h2>
            </div>
           
            <div className="btns">
                <button type="submit" className="btn"><Link to="/loginUsuario">Particular</Link></button>
                <button type="submit" className="btn"><Link to="/loginEmpresa">Empresa</Link></button>
            </div>
        </>
    );
};

export default PageInicio;