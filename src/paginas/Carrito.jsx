import React, { useState, useEffect } from 'react';
import './Carrito.css'; // Suponiendo que tienes este archivo CSS
import { useParams } from 'react-router-dom';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import TarjetaCarrito from '../componentes/TarjetaCarrito.jsx'; 
import { Link } from 'react-router-dom';

// Función para obtener los productos del carrito usando el email
export const fetchProductosCarrito = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/carrito`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Si es necesario para mantener la sesión
        });

        if (!response.ok) {
            throw new Error("Error al obtener los productos del carrito");
        }

        return await response.json(); // La respuesta es un array de objetos de productos en el carrito
    } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
        return []; // Retorna un array vacío en caso de error
    }
};

// Función para eliminar un producto del carrito
export const eliminarProductoCarrito = async (id_videojuego) => {
    try {
        const response = await fetch(`http://localhost:3000/api/carrito/delete/${id_videojuego}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Si es necesario para mantener la sesión
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el producto del carrito");
        }

        return await response.json(); // Respuesta con el éxito de la eliminación
    } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
        return null; // Retorna null en caso de error
    }
};

const Carrito = () => {
    const { email } = useParams(); // Obtén el email desde la URL
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [total, setTotal] = useState(0); // Estado para el total
    const [loading, setLoading] = useState(true);

    // Usamos useEffect para cargar los productos del carrito al montar el componente
    useEffect(() => {
        const getProductosCarrito = async () => {
            const data = await fetchProductosCarrito();
            console.log('Carrito deseados:', data); // Imprimir los datos para asegurarte de que llegan correctamente

            setProductosCarrito(data); // Ahora data es un array, lo guardamos directamente
            setLoading(false); // Dejamos de mostrar el mensaje de carga

            // Calcular el total de los precios, uno por uno
            let totalPrecio = 0;
            data.forEach((producto) => {
                const precio = parseFloat(producto.precio.replace('$', '').trim());
                totalPrecio += precio;
            });

            setTotal(totalPrecio.toFixed(2)); // Actualizamos el estado del total
        };

        getProductosCarrito();
    }, [email]); // Se ejecuta cada vez que el email cambie

    // Función para manejar la eliminación del producto
    const handleEliminarProducto = async (id_videojuego) => {
        if (!id_videojuego) {
            console.error('ID de videojuego no proporcionado');
            return; // Asegúrate de que id_videojuego esté presente antes de proceder
        }

        console.log(`Eliminando producto con ID: ${id_videojuego}`); // Verifica el ID de videojuego antes de hacer la solicitud
        const resultado = await eliminarProductoCarrito(id_videojuego);
        console.log(resultado);
    
        if (resultado && resultado.carrito) {
            // Actualizamos el estado con el carrito actualizado
            setProductosCarrito(resultado.carrito);
    
            // Calculamos el nuevo total de los productos
            let totalPrecio = 0;
            resultado.carrito.forEach((producto) => {
                const precio = parseFloat(producto.precio.replace('$', '').trim());
                totalPrecio += precio;
            });
            setTotal(totalPrecio.toFixed(2));
        } else {
            console.error("Error al eliminar el producto o no se obtuvo el carrito actualizado.");
        }
    };
    
    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <p>Cargando productos...</p>;
    }

    return (
        <>
            <BarraNavegacion />
            <div className="checkout">
                {productosCarrito.length === 0 ? (
                    <p>No tienes productos en el carrito.</p>
                ) : (
                    productosCarrito.map((producto) => {
                        console.log('Producto en el carrito:', producto); // Verifica el valor de producto.id_videojuego
                        return (
                            <div key={producto.id_videojuego} className="producto-carrito">
                                <TarjetaCarrito
                                    id_videojuego={producto.id_videojuego}  // Asegúrate de que este id esté presente
                                    nombre={producto.nombre}
                                    imagen={producto.imagen_chica}  // Propiedad correcta de la imagen
                                    precio={producto.precio}  // Precio del producto
                                    handleEliminarProducto={handleEliminarProducto}  // Pasamos la función de eliminación
                                />
                            </div>
                        );
                    })
                )}
            </div>
            <div className="total">
                <h3>Total de productos en el carrito: ${total}</h3>
            </div>
            <button className="confirm-btn" ><Link to="/pagos">Confirmar</Link></button>  
        </>
    );
};

export default Carrito;