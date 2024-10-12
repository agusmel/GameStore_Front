import './Login.css';
import { Link } from 'react-router-dom'; 
import React, { useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function Login() {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(prev => !prev);
    };
    return (
        <>

        <div className="login" Login>
        <h1>Iniciar Sesion</h1>    
        </div>
        <div className="create-account">
            <h2 >Tu primera vez? </h2>
            <button>Crea tu cuenta</button>
        </div>
        
        <form className="datos">
            <div className="sub-title">Mail
                <label htmlFor="mail"></label>
                <input type="text" id="email" className="input" placeholder="xxxxxx@gmail.com" />
            </div>

            <div className="sub-title">Contraseña (entre 10 y 15 caracteres)
                <label htmlFor="contraseña"></label>
                <input type="password" id="contraseña" className="input" placeholder="xxxxxxxxxxxx" />
            </div>

            <div className="checkbox-container" onClick={handleToggle} style={{ cursor: 'pointer' }}>
                {isChecked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                <span>Términos y Condiciones</span>          
            </div>
            <Link to="/tienda">
            <button className="login-btn">Iniciar sesion</button>
            </Link>
        </form>
        
      

        </>
    );
}

export default Login;
