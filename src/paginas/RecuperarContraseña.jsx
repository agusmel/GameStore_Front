import './RecuperarContraseña.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function RecuperarContraseñas() {
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false); // Estado para mostrar carga
    const navigate = useNavigate();

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir la acción predeterminada de enviar el formulario

        // Validar si el correo es válido
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setMensaje('Por favor ingresa un correo electrónico válido.');
            return;
        }

        setLoading(true); // Activar estado de carga
        setMensaje(''); // Limpiar mensaje previo

        // Enviar el correo de recuperación al backend
        try {
            const response = await fetch('http://localhost:3000/api/user/recuperacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // Verificar si el backend devuelve un enlace o token para restablecer la contraseña
                const resetLink = data.resetLink; // El enlace de restablecimiento con el token

                if (resetLink) {
                    // Redirigir al formulario de restablecimiento de contraseña con el token
                    navigate(`/NuevaComtraseña`);
                } else {
                    setMensaje('Hubo un problema al generar el enlace de recuperación.');
                }
            } else {
                setMensaje(data.message || 'Hubo un error al enviar el correo.');
            }
        } catch (error) {
            setMensaje('Hubo un error en la solicitud.');
            console.error('Error:', error);
        } finally {
            setLoading(false); // Desactivar estado de carga
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
                <h1>¿Olvidaste tu contraseña?</h1>
                <h2>Por favor ingresa tu correo</h2>
            </div>

            <form className="datos" onSubmit={handleSubmit}>
                <div className="sub-title">
                    Mail
                    <label htmlFor="email"></label>
                    <input
                        type="email"
                        id="email"
                        className="input"
                        placeholder="xxxxxx@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading} // Desactivar campo mientras se carga
                    />
                </div>
                <Link type="submit" className="enviar-email" disabled={loading} to={`/nuevaComtraseña/${email}`}>
                    {loading ? 'Enviando...' : 'Enviar'}
                </Link>
            </form>

            {mensaje && <p>{mensaje}</p>}
        </>
    );
}

export default RecuperarContraseñas;