import './RecuperarContraseña.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


function RecuperarContraseñas() {


    return (
        <>
        <div className="fondo">
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
            <div className="circle circle4"></div>
            <div className="circle circle5"></div>
            <div className="circle circle6"></div>
        </div>
    
        <div className="recuperar-contraseña">
            <h1>¿Olvidaste tu contraseña?</h1>
            <h2>Por favor ingresa tu correo</h2>
        </div>
        <form className="datos">
                <div className="sub-title">
                    Mail
                    <label htmlFor="email"></label>
                    <input 
                        type="email" 
                        id="email" 
                        className="input" 
                        placeholder="xxxxxx@gmail.com" 
                        
                    />
                </div>
            <button type="submit" className="enviar-email">Enviar</button>

        </form>


        </>
    
    );

}

export default RecuperarContraseñas;