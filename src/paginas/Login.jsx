import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';


export const sendLoginForm = async (credentials) => {
    const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
    });

    if (response.status === 401) return 401;

    return response.json();
};

const Login = () => {
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
            <div className="login">
                <h1>Iniciar Sesión</h1>    
            </div>
            <div className="create-account">
                <h2>¿Tu primera vez?</h2>
                <button><Link to="/register">Crea tu cuenta</Link></button>
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
                    <button className='boton-registrar-empresa'>Registrar empresa</button>           
                </div>
               
                <button type="submit" className="login-btn"><Link to="/tienda">Iniciar sesión</Link></button>
            </form>
        </>
    );
};

export default Login;