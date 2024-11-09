import React, { useState, useEffect } from 'react';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import './Perfil.css';

const PerfilUsuario = () => {
    const [perfil, setPerfil] = useState(null); // Guardar los datos del perfil
    const [loading, setLoading] = useState(true); // Para manejar el estado de carga
    const [error, setError] = useState(null); // Para manejar errores

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
                    {perfil && (
                        <>
                            <h1>{perfil.nombre_usuario}</h1>
                            <form className="formulario">
                                <div className="campo">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        value={perfil.nombre}
                                        disabled
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="apellido">Apellido</label>
                                    <input
                                        type="text"
                                        id="apellido"
                                        value={perfil.apellido}
                                        disabled
                                    />
                                </div>

                                <div className="campo-nacimiento">
                                    <label htmlFor="nacimiento">Fecha de Nacimiento</label>
                                    <select id="dia" value={new Date(perfil.fecha_nacimiento).getDate()} disabled>
                                        {generarDias()}
                                    </select>
                                    <select id="mes" value={new Date(perfil.fecha_nacimiento).getMonth() + 1} disabled>
                                        {generarMeses()}
                                    </select>
                                    <select id="anio" value={new Date(perfil.fecha_nacimiento).getFullYear()} disabled>
                                        {generarAnios()}
                                    </select>
                                </div>

                                <div className="campo">
                                    <label htmlFor="usuario">Nombre de usuario</label>
                                    <input
                                        type="text"
                                        id="usuario"
                                        value={perfil.nombre_usuario}
                                        disabled
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="mail">Mail</label>
                                    <input
                                        type="email"
                                        id="mail"
                                        value={perfil.email}
                                        disabled
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
