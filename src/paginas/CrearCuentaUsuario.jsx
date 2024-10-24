import './CrearCuentaUsuario.css';
import { Link, useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function CrearCuentaUsuario() {
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsChecked(prev => !prev);
    };
    

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
    const mes = parseInt(document.getElementById('mes').value) - 1; 
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('Nombre').value;
        const apellido = document.getElementById('Apellido').value;
        const nombre_usuario = document.getElementById('Nombre-usuario').value;
        const email = document.getElementById('Mail').value;
        const dia = document.getElementById('dia').value;
        const mes = document.getElementById('mes').value;
        const anio = document.getElementById('anio').value;
        const contrasena = document.getElementById('Contraseña').value;

        const fecha_nacimiento = `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`; // Formato YYYY-MM-DD

        if (!nombre || !apellido || !nombre_usuario || !email || !dia || !mes || !anio || !contrasena || errorMessage) {
            setErrorMessage('Por favor, complete todos los campos correctamente.');
            return;
        }

        const userData = {
            nombre,
            apellido,
            nombre_usuario,
            email,
            fecha_nacimiento,
            contrasena
        };

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const result = await response.json();

            if (result.exito) {
                navigate('/tienda');
                setSuccessMessage('Usuario creado exitosamente');
                // Opcional: Redirigir o limpiar el formulario
            } else {
                setErrorMessage(result.mensaje || 'Error al crear el usuario');
            }

        } catch (error) {
            console.error('Error en la solicitud:', error);
            setErrorMessage('Error en la solicitud');
        }
    };
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
                <input type="email" className="input" id="Mail" placeholder="xxxxxx@gmail.com" autocomplete="email" />
            </div>

            <div className="nacimiento">

                <label htmlFor="nacimiento">Fecha de Nacimiento</label>

                <div className="select-container">
                    <select id="dia" onChange={validarFecha} >
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

            <button className="create-btn" ><Link to="/tienda">Crear</Link></button>

        </form>
        </>
    );
}
export default CrearCuentaUsuario;