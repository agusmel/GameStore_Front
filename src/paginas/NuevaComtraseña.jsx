import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';

function NuevaComtraseña() {
    const { email } = useParams(); 
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
       
        if (!nuevaContrasena) {
            setMensaje('Por favor ingresa una nueva contraseña.');
            return;
        }

        setLoading(true); 
        setMensaje(''); 

        try {
            const response = await fetch(`http://localhost:3000/api/user/resetear-contrasena/${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nuevaContrasena }), 
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje('Contraseña actualizada exitosamente.');
                // Redirigir a la página de login o cualquier otra página después de éxito
                navigate('/loginUsuario');
            } else {
                setMensaje(data.mensaje || 'Hubo un error al actualizar la contraseña.');
            }
        } catch (error) {
            setMensaje('Hubo un error en la solicitud.');
            console.error('Error:', error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <>
            <div className="fondo">
                <div className="circle circle1"></div>
                <div className="circle circle2"></div>
                <div className="circle circle3"></div>
                <div className="circle circle4"></div>
                <div className="circle circle5"></div>
                <div className="circle circle6"></div>
            </div>

            <div className="recuperar-contraseña">
                <h1>Ingrese su nueva contraseña</h1>
            </div>

            <form className="datos" onSubmit={handleSubmit}>
                <div className="sub-title">
                    Contraseña
                    <label htmlFor="contrasena"></label>
                    <input
                        type="password"
                        id="contrasena"
                        className="input"
                        placeholder="xxxxxxxxxxxx"
                        value={nuevaContrasena}
                        onChange={(e) => setNuevaContrasena(e.target.value)}
                        disabled={loading} // Desactivar campo mientras se carga
                    />
                </div>
                <button type="submit" className="enviar-email" disabled={loading}>
                    {loading ? 'Actualizando...' : 'Enviar'}
                </button>
            </form>

            {mensaje && <p>{mensaje}</p>}
        </>
    );
}

export default NuevaComtraseña;