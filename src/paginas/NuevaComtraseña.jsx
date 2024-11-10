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
            <h1>ingrese su nueva contraseña</h1>
        </div>
        <form className="datos">
                <div className="sub-title">
                    contraseña
                    <label htmlFor="email"></label>
                    <input 
                        type="password" 
                        id="contrasena" 
                        className="input" 
                        placeholder="xxxxxxxxxxxx" 
                        
                    />
                </div>
            <button type="submit" className="enviar-email">Enviar</button>

        </form>


        </>
    
    );

}

export default RecuperarContraseñas;