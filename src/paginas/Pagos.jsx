import './Pagos.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';


function Pagos() {
    const [errorMessage, setErrorMessage] = useState('');

        // Llenar opciones de mes
       const generarMeses = () => {
        const meses =  [<option key="" value=""> Mes </option>];
        for (let i = 1; i <= 12; i++) {
            meses.push(<option key={i} value={i}>{i}</option>);
        }
        return meses;
    };
    const generarAnios = () => {
        const anios =  [<option key="" value=""> Año </option>];
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i <= currentYear+10; i++) {
            anios.push(<option key={i} value={i}>{i}</option>);
        }

        return anios;
    };
        // validar la fecha
        const validarFecha = () => {
            const mes = parseInt(document.getElementById('mes').value);
            const anio = parseInt(document.getElementById('anio').value);
            const fechaActual = new Date();
            const anioActual = fechaActual.getFullYear();
            const mesActual = fechaActual.getMonth() +1; 
        
            // Comprobar que el año y el mes son válidos 
            if (isNaN(anio) || isNaN(mes) || mes === 0 || anio === 0) {
                setErrorMessage('');
                return; 
            }
        
            // Validar la fecha
            if (anio > anioActual) {
                setErrorMessage(''); 
            } 
            else if (anio === anioActual) {
                if (mes <= mesActual) {
                    setErrorMessage('Fecha de vencimiento inválida.');
                } else {
                    setErrorMessage(''); // Fecha válida
                }
            } 
            else {
                setErrorMessage('Fecha de vencimiento inválida.');
            }
        };

    return (
        <>
            <BarraNavegacion/>

            <form className='contenedor-pagos'>

                <div className="tarjeta-vencimiento">
                    <div className='num-tarjeta'>
                        <label htmlFor="numero de tarjeta" >Numero de tarjeta</label>
                        <input type="text" id="numero de tarjeta"  maxlength="16"/>
                    </div>

                    <div className="campo-vencimietno">
                        <label htmlFor="vencimietno"> Fecha de vencimietno</label>
                        <select id="mes" onChange={validarFecha}>
                            {generarMeses()}
                        </select>
                        <select id="anio" onChange={validarFecha}>
                            {generarAnios()}
                        </select>
                        <input type="text" id="cvv" maxLength="3" pattern="\d{3}" placeholder="cvv" />
                    </div>
                </div>

                
                {/* Mostrar mensaje de error si la fecha es inválida */}
                {errorMessage && <p className="msj-fechaInvalida"style={{ color: 'red'}}>{errorMessage}</p>}
                

                <h1>Informacion de facturacion</h1>

                <div className="nomb-apellido">                        
                    <div className="nombre">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" />
                    </div>
                    <div className="apellido">
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text" id="apellido" />
                    </div>
                    <div className="localidad">
                        <label htmlFor="localidad">Localidad</label>
                        <input type="text" id="localidad" />
                    </div>
                </div>

                <div className="direcc-cod">
                    <div className="direcc">
                        <label htmlFor="direccion">Direccion</label>
                        <input type="text" id="direccion" />
                    </div>
                    <div className="codigo">
                        <label htmlFor="codigo postal">codigo postal</label>
                        <input type="text" id="codigo postal" />
                    </div>
                </div>

                <div className='pais-telefono'>
                    <div className="pais">
                        <label htmlFor="pais" className='label-pais'>Pais</label>
                        <select type="text" id="pais">
                            <option value=""></option>
                            <option value="colombia">Argentina</option>
                            <option value="estados-unidos">Otro</option>
                        </select>                
                    </div>
                    <div className="telefono">
                        <label htmlFor="telefono">Telefono</label>
                        <input type="text" id="telefono" />
                    </div>
                </div>

                <div className="botones">
                <button className="boton1">Pagar</button>
                <button className="boton2"><Link to="/tienda">Cancelar</Link></button>
            </div>
            </form>
       
        </>
    );
    
}

export default Pagos;


