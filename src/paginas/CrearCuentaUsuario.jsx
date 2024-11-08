import './CrearCuentaUsuario.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function CrearCuentaUsuario() {
    const [isChecked, setIsChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        nombre_usuario: '',
        email: '',
        dia: '',
        mes: '',
        anio: '',
        contrasena: ''
    });
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsChecked(prev => !prev);
    };

    // Función para manejar los cambios en los campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Generar días
    const generarDias = () => {
        const dias = [<option key="" value="">- Día -</option>];
        for (let i = 1; i <= 31; i++) {
            dias.push(<option key={i} value={i}>{i}</option>);
        }
        return dias;
    };

    // Generar meses
    const generarMeses = () => {
        const meses = [<option key="" value="">- Mes -</option>];
        for (let i = 1; i <= 12; i++) {
            meses.push(<option key={i} value={i}>{i}</option>);
        }
        return meses;
    };

    // Generar años
    const generarAnios = () => {
        const anios = [<option key="" value="">- Año -</option>];
        const currentYear = new Date().getFullYear();
        for (let i = 1900; i <= currentYear; i++) {
            anios.push(<option key={i} value={i}>{i}</option>);
        }
        return anios;
    };

    // Validar fecha
    const validarFecha = () => {
        const { dia, mes, anio } = formData;
        const fecha = new Date(anio, mes - 1, dia);
        const fechaActual = new Date();
        const esFechaValida = (fecha.getDate() === parseInt(dia) && fecha.getMonth() === parseInt(mes) - 1 && fecha.getFullYear() === parseInt(anio));

        if (isNaN(anio) || isNaN(mes) || isNaN(dia) || dia === "" || mes === "" || anio === "") {
            setErrorMessage('Por favor ingresa una fecha válida');
            return false;
        }
        if (!esFechaValida) {
            setErrorMessage('Fecha no válida');
            return false;
        }
        if (fecha > fechaActual) {
            setErrorMessage('La fecha no puede ser mayor a la fecha actual');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { nombre, apellido, nombre_usuario, email, dia, mes, anio, contrasena } = formData;
        const fecha_nacimiento = `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`; // Formato YYYY-MM-DD

        // Verificar que todos los campos estén completos
        if (!nombre || !apellido || !nombre_usuario || !email || !dia || !mes || !anio || !contrasena || errorMessage) {
            setErrorMessage('Por favor, complete todos los campos correctamente.');
            return;
        }

        // Validar la fecha antes de enviar el formulario
        if (!validarFecha()) {
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
            const response = await fetch('http://localhost:3000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const result = await response.json();

            if (result.exito) {
                navigate('/loginUsuario');
                setSuccessMessage('Usuario creado exitosamente');
            } else {
                setErrorMessage(result.mensaje || 'Error al crear el usuario');
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
                <label htmlFor="Nombre">Nombre</label>
                <input
                    type="text"
                    className="input"
                    id="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    autoComplete="given-name"
                />
            </div>

            <div className="sub-title">
                <label htmlFor="Apellido">Apellido</label>
                <input
                    type="text"
                    className="input"
                    id="Apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    autoComplete="family-name"
                />
            </div>

            <div className="sub-title">
                <label htmlFor="Nombre-usuario">Nombre de usuario</label>
                <input
                    type="text"
                    className="input"
                    id="Nombre-usuario"
                    name="nombre_usuario"
                    value={formData.nombre_usuario}
                    onChange={handleChange}
                />
            </div>

            <div className="sub-title">
                <label htmlFor="Mail">Mail</label>
                <input
                    type="email"
                    className="input"
                    id="Mail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="xxxxxx@gmail.com"
                    autoComplete="email"
                />
            </div>

            <div className="nacimiento">
                <label htmlFor="nacimiento">Fecha de Nacimiento</label>
                <div className="select-container">
                    <select
                        id="dia"
                        name="dia"
                        value={formData.dia}
                        onChange={handleChange}
                    >
                        {generarDias()}
                    </select>
                    <select
                        id="mes"
                        name="mes"
                        value={formData.mes}
                        onChange={handleChange}
                    >
                        {generarMeses()}
                    </select>
                    <select
                        id="anio"
                        name="anio"
                        value={formData.anio}
                        onChange={handleChange}
                    >
                        {generarAnios()}
                    </select>
                </div>
                {/* Mostrar mensaje de error si la fecha es inválida */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>

            <div className="sub-title">
                <label htmlFor="Contraseña">Contraseña (entre 10 y 15 caracteres)</label>
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

            <div className="checkbox-container" onClick={handleToggle} style={{ cursor: 'pointer' }}>
                {isChecked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                <span>Aceptar Términos y Condiciones</span>          
            </div>

            <button type="submit" className="create-btn" disabled={!isChecked}>Crear Cuenta</button>
        </form>
        </>
    );
}

export default CrearCuentaUsuario;