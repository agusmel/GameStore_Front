import './LoginEmpresa.css';
import { Link, useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';

// Función para enviar el formulario de inicio de sesión
export const sendLoginForm = async (credentials) => {
    try {
        const response = await fetch("http://localhost:3000/api/empresa/login", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            credentials: "include"
        });

        if (response.status === 401) return 401;
        return await response.json(); 
    } catch (error) { 
        console.error("Error al enviar el formulario de inicio de sesión:", error);
        return { exito: false, error: "Error en la conexión al servidor" }; 
    }
};

const LoginEmpresa = () => {
    const [email_empresa, setEmail] = useState('');
    const [contrasena, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const credentials = {email_empresa, contrasena };
        const response = await sendLoginForm(credentials);

        if (response === 401) {
            alert("Credenciales incorrectas");
        } else {
            console.log("Login exitoso", response);
            navigate("/catalogoEmpresa"); // Redirige solo si la autenticación fue exitosa
        }
    };

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
                        value={email_empresa} 
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