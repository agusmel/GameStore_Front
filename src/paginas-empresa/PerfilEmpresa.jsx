import BarraNavegacionEmpresa from '../componentes/BarraNavegacionEmpresa.jsx';
import React, { useState, useEffect } from 'react';

function PerfilEmpresa() {
    const [empresa, setEmpresa] = useState({
        nombre_empresa: '',
        pagina_web: '',
        email_empresa: '',
        nro_telefono: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Realizar la solicitud GET para obtener los datos de la empresa
    useEffect(() => {
        const obtenerDatosEmpresa = async () => {
            setLoading(true);
            try {
                const respuesta = await fetch('http://localhost:3000/api/empresa/perfil', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',  // Incluye las cookies en la solicitud
                });

                const data = await respuesta.json();

                if (respuesta.ok) {
                    // Maneja la respuesta exitosa
                    console.log('Empresa encontrada:', data);
                    // Aquí es donde debemos acceder correctamente a la propiedad "empresa" en la respuesta
                    setEmpresa(data.empresa);  // Asignamos los datos de la empresa
                } else {
                    // Maneja los errores
                    setErrorMessage(data.message || 'Error al obtener los datos de la empresa');
                }
            } catch (error) {
                // Maneja los errores de conexión
                setErrorMessage('Error al conectarse al servidor');
            } finally {
                setLoading(false);  // En cualquier caso, para la carga
            }
        };

        obtenerDatosEmpresa();
    }, []);
    console.log(empresa);
    return (
        <>
            <BarraNavegacionEmpresa />
            
            <main>
                <div className="perfil">
                    <h1>{empresa.nombre_empresa}</h1>
                </div>

                <div className="formulario">
                    <div className="campo">
                        <label htmlFor="nombre_empresa">Nombre de la empresa</label>
                        <input 
                            type="text" 
                            id="nombre_empresa" 
                            value={empresa.nombre_empresa} 
                            onChange={(e) => setEmpresa({ ...empresa, nombre_empresa: e.target.value })} 
                            disabled
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="pagina_web">Página web</label>
                        <input 
                            type="text" 
                            id="pagina_web" 
                            value={empresa.pagina_web} 
                            onChange={(e) => setEmpresa({ ...empresa, pagina_web: e.target.value })} 
                            disabled
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="email_empresa">Email</label>
                        <input 
                            type="email" 
                            id="email_empresa" 
                            value={empresa.email_empresa} 
                            onChange={(e) => setEmpresa({ ...empresa, email_empresa: e.target.value })} 
                            disabled
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="nro_telefono">Teléfono</label>
                        <input 
                            type="tel" 
                            id="nro_telefono" 
                            value={empresa.nro_telefono} 
                            onChange={(e) => setEmpresa({ ...empresa, nro_telefono: e.target.value })} 
                            disabled
                        />
                    </div>
                    
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
            </main>
        </>
    );
}

export default PerfilEmpresa;