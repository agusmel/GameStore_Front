import './CrearCuentaEmpresa.css';
import { Link, useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function CrearCuentaEmpresa() {
    const [isChecked, setIsChecked] = useState(false);
    

    const handleToggle = () => {
        setIsChecked(prev => !prev);
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
            <h1>Crear Cuenta</h1>
        </div>

        <form className="datos">

            <div className="sub-title">
                <label htmlFor="NombreEmpresa">Nombre de la empresa</label>
                <input type="text" className="input" id="NombreEmpresa"/>
            </div>

            <div className="sub-title">
                <label htmlFor="pagina-web">pagina web</label>
                <input type="text" className="input" id="pagina-web"/>
            </div>

            <div className="sub-title">
                <label htmlFor="numero-telefono">numero de telefono</label>
                <input type="text" className="input" id="numero-telefono"/>
            </div>

            <div className="sub-title">
                <label htmlFor="Mail">Mail</label>
                <input type="email" className="input" id="Mail" placeholder="xxxxxx@gmail.com" autocomplete="email" />
            </div>
            
            <div className="sub-title">
                <label >Contraseña</label>
                <input type="password" className="input" id="Contraseña" placeholder="xxxxxxxxxxxx" />
            </div>

            <div className="checkbox-container" onClick={handleToggle} style={{ cursor: 'pointer' }}>
                {isChecked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                <span>Aceptar Términos y Condiciones</span>          
            </div>

            <button className="create-btn">Crear</button>

        </form>
        </>
    );
}
export default CrearCuentaEmpresa;