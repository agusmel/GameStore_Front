import React, { useState, useEffect } from 'react';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import './Perfil.css';

const PerfilUsuario = () => {
    const [perfil, setPerfil] = useState(null); // Guardar los datos del perfil
    const [loading, setLoading] = useState(true); // Para manejar el estado de carga
    const [error, setError] = useState(null); // Para manejar errores

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/user/perfil", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include' // Si usas cookies de sesión
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.exito) {
                        setPerfil(data.usuario); // Actualizamos el estado con los datos del perfil

                        // Establecemos los valores del formulario a partir de los datos del usuario
                        setNombre(data.usuario.nombre);
                        setApellido(data.usuario.apellido);
                        setNacimiento(data.usuario.fecha_nacimiento); // Asegúrate de que el backend envíe el formato correcto
                        setUsuario(data.usuario.nombre_usuario);
                        setEmail(data.usuario.email);
                    } else {
                        setError('Error al obtener los datos del usuario');
                    }
                } else {
                    setError(`Error al obtener los datos: ${response.statusText}`);
                }
            } catch (error) {
                setError(`Error de red: ${error.message}`);
            } finally {
                setLoading(false); // Ya no estamos cargando
            }
        };

        fetchUserData();
    }, []); // El array vacío asegura que solo se ejecute una vez al cargar el componente

    // Función para generar los días, meses y años
    const generarDias = () => {
        const dias = [];
        for (let i = 1; i <= 31; i++) {
            dias.push(<option key={i} value={i}>{i}</option>);
        }
        return dias;
    };

    const generarMeses = () => {
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return meses.map((mes, index) => (
            <option key={index} value={index + 1}>{mes}</option>
        ));
    };

    const generarAnios = () => {
        const anios = [];
        for (let i = 1900; i <= new Date().getFullYear(); i++) {
            anios.push(<option key={i} value={i}>{i}</option>);
        }
        return anios;
    };

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


    if (loading) {
        return <p>Cargando...</p>; // Muestra "Cargando..." mientras esperamos los datos
    }

    if (error) {
        return <p>Error: {error}</p>; // Si hay un error, lo mostramos
    }

    return (
        <>
            <BarraNavegacion />
            <main>
                <div className="perfil">
                    {/* Asegúrate de que 'perfil' no sea nulo antes de acceder a las propiedades */}
                    {perfil && (
                        <>
                            <h1>{perfil.nombre_usuario}</h1>
                            <p>{perfil.email}</p>
                            <form className="formulario">
                                <div className="campo">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)} // Habilitar la edición
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="apellido">Apellido</label>
                                    <input
                                        type="text"
                                        id="apellido"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)} // Habilitar la edición
                                    />
                                </div>

                                <div className="campo-nacimiento">
                                    <label htmlFor="nacimiento">Fecha de Nacimiento</label>
                                    <select id="dia" value={nacimiento} onChange={validarFecha}>
                                        {generarDias()}
                                    </select>
                                    <select id="mes" value={nacimiento} onChange={validarFecha}>
                                        {generarMeses()}
                                    </select>
                                    <select id="anio" value={nacimiento} onChange={validarFecha}>
                                        {generarAnios()}
                                    </select>
                                </div>

                                <div className="campo">
                                    <label htmlFor="usuario">Nombre de usuario</label>
                                    <input
                                        type="text"
                                        id="usuario"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)} // Habilitar la edición
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="mail">Mail</label>
                                    <input
                                        type="email"
                                        id="mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} // Habilitar la edición
                                    />
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </main>
        </>
    );
};

export default PerfilUsuario;