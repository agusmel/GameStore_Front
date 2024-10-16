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
    const [errorMessage, setErrorMessage] = useState('');

    // Llenar opciones de día
    const generarDias = () => {
       const dias = [<option key="" value="">- Día -</option>];
       for (let i = 1; i <= 31; i++) {
           dias.push(<option key={i} value={i}>{i}</option>);
       }
       return dias;
   };

   // Llenar opciones de mes
   const generarMeses = () => {
       const meses =  [<option key="" value="">- Mes -</option>];
       for (let i = 1; i <= 12; i++) {
           meses.push(<option key={i} value={i}>{i}</option>);
       }
       return meses;
   };

   // Llenar opciones de año 
   const generarAnios = () => {
       const anios =  [<option key="" value="">- Año -</option>];
       const currentYear = new Date().getFullYear();
       for (let i = 1900; i <= currentYear; i++) {
           anios.push(<option key={i} value={i}>{i}</option>);
       }
       return anios;
   };
       // validar la fecha
       const validarFecha = () => {
           const dia = parseInt(document.getElementById('dia').value);
           const mes = parseInt(document.getElementById('mes').value) - 1; // Enero es 0 en JavaScript
           const anio = parseInt(document.getElementById('anio').value);
   
           const fecha = new Date(anio, mes, dia);
           const esFechaValida = (fecha.getDate() === dia && fecha.getMonth() === mes && fecha.getFullYear() === anio);
   
           if (!esFechaValida) {
               setErrorMessage('Fecha no válida');
           } else {
               setErrorMessage('');
           }
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

            <div className="nacimiento">
                <label htmlFor="nacimiento">Fecha de Nacimiento</label>
                <div className="select-container">
                    <select id="dia" onChange={validarFecha}>
                        {generarDias()}
                    </select>
                    <select id="mes" onChange={validarFecha}>
                        {generarMeses()}
                    </select>
                    <select id="anio" onChange={validarFecha}>
                        {generarAnios()}
                    </select>
                </div>
                {/* Mostrar mensaje de error si la fecha es inválida*/}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
            
            <div className="sub-title">
                <label >Contraseña (entre 10 y 15 caracteres)</label>
                <input type="password" className="input" id="Contraseña" placeholder="xxxxxxxxxxxx" />
            </div>

            <div className="checkbox-container" onClick={handleToggle} style={{ cursor: 'pointer' }}>
                {isChecked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                <span>Aceptar Términos y Condiciones</span>          
            </div>

            <button className="create-btn" >Crear</button>

        </form>
        </>
    );
}
export default CrearCuenta;