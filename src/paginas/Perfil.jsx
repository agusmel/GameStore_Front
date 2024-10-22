import './Perfil.css';
import React, { useState } from 'react';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';

const PerfilUsuario = () => {
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
            const fechaActual = new Date(); 

             const esFechaValida = (fecha.getDate() === dia && fecha.getMonth() === mes && fecha.getFullYear() === anio);

            if (isNaN(anio) || isNaN(mes) || isNaN(dia) || dia === 0 || mes === -1 || anio === 0) {
                setErrorMessage('');
                return;
            }
            if (!esFechaValida) {
                setErrorMessage('Fecha no válida');
                return;
            }
            if (fecha > fechaActual) {
                setErrorMessage('La fecha no puede ser mayor a la fecha actual');
            } else {
                setErrorMessage('');
            }
        };
    

    return (
        <>
            <BarraNavegacion/>
            
            <main>
                <div className="perfil">
                    <h1>Agusmel03</h1>
                </div>

                <form className="formulario">
                    <div className="campo">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" defaultValue="Agustin melnitzky" />
                    </div>

                    <div className="campo">
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text" id="apellido" defaultValue="Melnitzky" />
                    </div>

                    <div className="campo-nacimiento">

                        <label htmlFor="nacimiento">Fecha de Nacimiento</label>

                         <select id="dia" onChange={validarFecha}>
                            {generarDias()}
                        </select>

                        <select id="mes" onChange={validarFecha}>
                            {generarMeses()}
                        </select>

                        <select id="anio" onChange={validarFecha}>
                            {generarAnios()}
                        </select>

                        {/* Mostrar mensaje de error si la fecha es inválida*/}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </div>

                    <div className="campo">
                        <label htmlFor="pais">País</label>
                        <select id="pais">
                            <option value="">- Seleccione un país -</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Chile">Chile</option>
                            <option value="Mexico">Mexico</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="Spain">Spain</option>
                            <option value="France">France</option>
                            <option value="Germany">Germany</option>
                            <option value="Italy">Italy</option>
                            <option value="Japan">Japan</option>
                            <option value="United Kingdom">United Kingdom</option>
                        </select>
                    </div>

                    <div className="campo">
                        <label htmlFor="usuario">Nombre de usuario</label>
                        <input type="text" id="usuario" defaultValue="Agusmel03" />
                    </div>

                    <div className="campo">
                        <label htmlFor="direccion">Dirección</label>
                        <input type="text" id="direccion" />
                    </div>

                    <div className="campo">
                        <label htmlFor="mail">Mail</label>
                        <input type="email" id="mail" defaultValue="AgustinMelnitzky@gmail.com" />
                    </div>

                    <div className="campo">
                        <label htmlFor="telefono">Teléfono</label>
                        <input type="tel" id="telefono" />
                    </div>
                </form>
            </main>
        </>
    );
};

export default PerfilUsuario;