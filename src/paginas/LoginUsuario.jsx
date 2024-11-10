import './LoginUsuario.css';
import { Link, useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';

// Función para enviar el formulario de inicio de sesión
 const sendLoginForm = async (credentials) => {
    try {
        const response = await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            credentials:"include"
        });

        if (response.status === 401) return 401;
        return await response.json(); 
    } catch (error) { 
        console.error("Error al enviar el formulario de inicio de sesión:", error);
        return { exito: false, error: "Error en la conexión al servidor" }; 
    }
};


const LoginUsuario = () => {
    const [email, setEmail] = useState('');
    const [contrasena, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const credentials = { email, contrasena };
        const response = await sendLoginForm(credentials);

        if (response === 401) {
            alert("Credenciales incorrectas");
        } else if (response.exito) {
            console.log("Login exitoso", response);
            navigate("/tienda"); // Redirige solo si la autenticación fue exitosa
        } else {
            console.log("Error inesperado o problema de conexión:", response.error || response);
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
            <div className="create-account">
                <h2>¿Tu primera vez?</h2>
                <button><Link to="/registrarUsuario">Crea tu cuenta</Link></button>
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
                    Contraseña 
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
                    <Link className='boton-olvide' to="/recuperarContraseña">Olvide contraseña</Link>
                </div>
               
                <button type="submit" className="login-btn">Iniciar sesión</button>
            </form>
        </>
    );
};

export default LoginUsuario;


sendLoginForm 