import './LoginEmpresa.css';
import { Link, useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';

const LoginEmpresa = () => {
    const [email, setEmail] = useState('');
    const [contrasena, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const credentials = { email, contrasena };
        const response = await sendLoginForm(credentials);

        if (response === 401) {
            alert("Credenciales incorrectas");
        } else {
            console.log("Login exitoso", response);
            navigate("/tienda"); 
        }
    };

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
            <div className="login">
                <h1>Iniciar Sesión</h1>    
            </div>
          
            
            <form className="datos" onSubmit={handleSubmit}>
                <div className="sub-title">
                    Mail
                    <label htmlFor="email"></label>
                    <input 
                        type="email" 
                        id="email" 
                        className="input" 
                        placeholder="xxxxxx@gmail.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <div className="sub-title">
                    Contraseña (entre 10 y 15 caracteres)
                    <label htmlFor="contrasena"></label>
                    <input 
                        type="password" 
                        id="contrasena" 
                        className="input" 
                        placeholder="xxxxxxxxxxxx" 
                        value={contrasena} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>

                <div className="olv-empre">
                    <button className='boton-olvide'>Olvide contraseña</button>
                    <button className='boton-registrar-empresa'><Link to="/registrarEmpresa">Registrar empresa</Link></button>           
                </div>
               
                <button type="submit" className="login-btn">Iniciar sesión</button>
            </form>
        </>
    );
};

export default LoginEmpresa;