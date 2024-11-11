import './Pagos.css';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import React, { useState, useEffect } from 'react';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import Cookies from 'js-cookie'; // Importar js-cookie

// Función para obtener el carrito con cookies incluidas
const fetchProductosCarrito = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/carrito', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Incluye cookies (como la sesión)
        });

        if (!response.ok) {
            throw new Error("Error al obtener los productos del carrito");
        }

        return await response.json(); // La respuesta es un array de productos
    } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
        return [];  // Retorna un array vacío si ocurre un error
    }
};

function Pagos() {
    const navigate = useNavigate(); // Usar useNavigate aquí
    const [errorMessage, setErrorMessage] = useState('');
    const [carrito, setCarrito] = useState([]); // Estado para el carrito
    const [loading, setLoading] = useState(true); // Estado de carga
    const [mes, setMes] = useState(''); // Estado para el mes
    const [anio, setAnio] = useState(''); // Estado para el año

    // Llenar opciones de mes
    const generarMeses = () => {
        const meses = [<option key="" value="">Mes</option>];
        for (let i = 1; i <= 12; i++) {
            meses.push(<option key={i} value={i}>{i}</option>);
        }
        return meses;
    };

    const generarAnios = () => {
        const anios = [<option key="" value="">Año</option>];
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i <= currentYear + 10; i++) {
            anios.push(<option key={i} value={i}>{i}</option>);
        }
        return anios;
    };

    // Validar la fecha
    const validarFecha = () => {
        const fechaActual = new Date();
        const anioActual = fechaActual.getFullYear();
        const mesActual = fechaActual.getMonth() + 1;

        if (mes && anio) {
            if (anio < anioActual || (anio === anioActual && mes <= mesActual)) {
                setErrorMessage('Fecha de vencimiento inválida.');
            } else {
                setErrorMessage('');
            }
        }
    };

    // Obtener el carrito cuando el componente se monte
    useEffect(() => {
        const obtenerCarrito = async () => {
            const productos = await fetchProductosCarrito();
            setCarrito(productos); // Actualizar el estado con los productos del carrito
            setLoading(false); // Cambiar el estado de carga a false una vez que se haya obtenido el carrito
        };

        obtenerCarrito();
    }, []); // Este efecto solo se ejecuta una vez cuando se monta el componente

    // Función para confirmar el pago
    const confirmarPago = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/biblioteca/insertar-carrito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    carrito: carrito, // El carrito con los productos seleccionados
                }),
                credentials:'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Carrito insertado:', data.mensaje);
                
                // Vaciar el carrito después de confirmar el pago
                const vaciarCarritoResponse = await fetch('http://localhost:3000/api/carrito/vaciar', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}), // No necesitamos enviar email
                    credentials: 'include',
                });

                if (vaciarCarritoResponse.ok) {
                    const vaciarCarritoData = await vaciarCarritoResponse.json();
                    console.log(vaciarCarritoData.message || vaciarCarritoData.mensaje); // Mostrar mensaje de éxito
                    alert('Pago realizado con éxito, el carrito ha sido vaciado.');
                    navigate('/biblioteca'); // Redirigimos a la página de biblioteca
                } else {
                    const errorData = await vaciarCarritoResponse.json();
                    setErrorMessage('Error al vaciar el carrito: ' + (errorData.error || 'Error desconocido'));
                }
            } else {
                const errorData = await response.json();
                setErrorMessage('Error al insertar el carrito: ' + (errorData.error || 'ya cuentas con este juego'));
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setErrorMessage('Hubo un error al procesar el pago. Inténtalo nuevamente.');
        }
    };

    return (
        <>
            <BarraNavegacion />
            <form className="contenedor-pagos">
                <div className="tarjeta-vencimiento">
                    <div className='num-tarjeta'>
                        <label htmlFor="numero de tarjeta">Número de tarjeta</label>
                        <input type="text" id="numero de tarjeta" maxLength="16" />
                    </div>

                    <div className="campo-vencimiento">
                        <label htmlFor="vencimiento">Fecha de vencimiento</label>
                        <select id="mes" value={mes} onChange={(e) => setMes(e.target.value)} onBlur={validarFecha}>
                            {generarMeses()}
                        </select>
                        <select id="anio" value={anio} onChange={(e) => setAnio(e.target.value)} onBlur={validarFecha}>
                            {generarAnios()}
                        </select>
                        <input type="text" id="cvv" maxLength="3" pattern="\d{3}" placeholder="CVV" />
                    </div>
                </div>

                {errorMessage && <p className="msj-fechaInvalida" style={{ color: 'red' }}>{errorMessage}</p>}

                <h1>Información de facturación</h1>

   
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
                        <label htmlFor="direccion">Dirección</label>
                        <input type="text" id="direccion" />
                    </div>
                    <div className="codigo">
                        <label htmlFor="codigo postal">Código postal</label>
                        <input type="text" id="codigo postal" />
                    </div>
                </div>

                <div className='pais-telefono'>
                    <div className="pais">
                        <label htmlFor="pais" className='label-pais'>País</label>
                        <select type="text" id="pais">
                            <option value=""></option>
                            <option value="colombia">Argentina</option>
                            <option value="estados-unidos">Otro</option>
                        </select>
                    </div>
                    <div className="telefono">
                        <label htmlFor="telefono">Teléfono</label>
                        <input type="text" id="telefono" />
                    </div>
                </div>
                <button className="boton2"><Link to="/tienda">Cancelar</Link></button>
                <button type="button" className="boton1" onClick={confirmarPago}>pagar </button>
            </form>
        </>
    );
}

export default Pagos;
