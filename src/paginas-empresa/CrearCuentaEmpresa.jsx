import './CrearCuentaEmpresa.css';
import { useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function CrearCuentaEmpresa() {
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        nombre_empresa: '',
        pagina_web: '',
        nro_telefono: '',
        email_empresa: '',
        contrasena: ''
    });

    const navigate = useNavigate();

    const handleToggle = () => {
        setIsChecked(prev => !prev);
    };

    // Manejar cambios en los campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { nombre_empresa, pagina_web, nro_telefono, email_empresa, contrasena } = formData;

        // Verificar que todos los campos estén completos
        if (!nombre_empresa || !pagina_web || !nro_telefono || !email_empresa || !contrasena) {
            setErrorMessage('Por favor, complete todos los campos correctamente.');
            return;
        }

        // Validar correo electrónico
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email_empresa)) {
            setErrorMessage('Por favor ingrese un correo electrónico válido.');
            return;
        }

        // Validar número de teléfono
        const phoneRegex = /^[0-9]{9}$/;
        if (!phoneRegex.test(nro_telefono)) {
            setErrorMessage('El número de teléfono debe tener 9 dígitos.');
            return;
        }

        // Limpiar el mensaje de error si todo está bien
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:3000/api/empresa/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok) {
                setSuccessMessage('Cuenta creada exitosamente');
                navigate('/loginEmpresa');
            } else {
                setErrorMessage(result.mensaje || 'Error al crear la cuenta');
            }

        } catch (error) {
            console.error('Error en la solicitud:', error);
            setErrorMessage('Error en la solicitud');
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

            <div className="login">
                <h1>Crear Cuenta</h1>
            </div>

            <form className="datos" onSubmit={handleSubmit}>
                <div className="sub-title">
                    <label htmlFor="NombreEmpresa">Nombre de la empresa</label>
                    <input
                        type="text"
                        className="input"
                        id="NombreEmpresa"
                        name="nombre_empresa"
                        value={formData.nombre_empresa}
                        onChange={handleChange}
                    />
                </div>

                <div className="sub-title">
                    <label htmlFor="pagina-web">Página web</label>
                    <input
                        type="text"
                        className="input"
                        id="pagina-web"
                        name="pagina_web"
                        value={formData.pagina_web}
                        onChange={handleChange}
                    />
                </div>

                <div className="sub-title">
                    <label htmlFor="nro-telefono">Número de teléfono</label>
                    <input
                        type="text"
                        className="input"
                        id="nro-telefono"
                        name="nro_telefono"
                        value={formData.nro_telefono}
                        onChange={handleChange}
                    />
                </div>

                <div className="sub-title">
                    <label htmlFor="Mail">Correo electrónico</label>
                    <input
                        type="email"
                        className="input"
                        id="Mail"
                        name="email_empresa"
                        value={formData.email_empresa}
                        onChange={handleChange}
                        placeholder="xxxxxx@gmail.com"
                        autoComplete="email"
                    />
                </div>

                <div className="sub-title">
                    <label htmlFor="Contraseña">Contraseña</label>
                    <input
                        type="password"
                        className="input"
                        id="Contraseña"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        placeholder="************"
                    />
                </div>

                {/* Mostrar mensaje de error si hay un error */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                {/* Mostrar mensaje de éxito si el registro fue exitoso */}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <div className="checkbox-container" onClick={handleToggle} style={{ cursor: 'pointer' }}>
                    {isChecked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                    <span>Aceptar Términos y Condiciones</span>
                </div>

                <button type="submit" className="create-btn" disabled={!isChecked}>Crear Cuenta</button>
            </form>
        </>
    );
}

export default CrearCuentaEmpresa;
