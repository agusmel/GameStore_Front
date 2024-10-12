import './CrearCuenta.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function CrearCuenta() {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(prev => !prev);
    };


    return (
        <>
        
        <div className="login">
            <h1>Crear Cuenta</h1>
        </div>

        <form className="datos">

            <div className="sub-title">
                <label htmlFor="nombre">Nombre </label>
                <input type="text" className="input" id="Nombre" autocomplete=" given-name"/>
            </div>

            <div className="sub-title">
                <label htmlFor="Apellido">Apellido</label>
                <input type="text" className="input" id="Apellido" autocomplete="family-name" />
            </div>

            <div className="sub-title">
                <label htmlFor="nombre-usuario">Nombre de usuario</label>
                <input type="text" className="input" id="Nombre-usuario"/>
            </div>

            <div className="sub-title">
                <label htmlFor="Mail">Mail</label>
                <input type="text" className="input" id="Mail" placeholder="xxxxxx@gmail.com" autocomplete="email" />
            </div>

            <div className="sub-title">
                <label htmlFor="Fecha-nacimiento">Fecha de nacimiento</label>
                <input type="text" id="Fecha-nacimiento" className="input"/>
            </div>
            
            <div className="sub-title">
                <label >Contraseña (entre 10 y 15 caracteres)</label>
                <input type="password" className="input" id="Contraseña" placeholder="xxxxxxxxxxxx" />
            </div>

            <div className="checkbox-container" onClick={handleToggle} style={{ cursor: 'pointer' }}>
                {isChecked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                <span>Términos y Condiciones</span>          
            </div>

            <button className="create-btn" >Crear</button>

        </form>
        </>
    );
}
export default CrearCuenta;