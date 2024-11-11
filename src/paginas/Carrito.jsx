import React, { useState, useEffect } from 'react';
import './Carrito.css'; 
import { useParams } from 'react-router-dom';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import TarjetaCarrito from '../componentes/TarjetaCarrito.jsx'; 
import { Link } from 'react-router-dom';

export const fetchProductosCarrito = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/carrito`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include", 
        });

        if (!response.ok) {
            throw new Error("Error al obtener los productos del carrito");
        }

        return await response.json(); 
    } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
        return []; 
    }
};

export const eliminarProductoCarrito = async (id_videojuego) => {
    try {
        const response = await fetch(`http://localhost:3000/api/carrito/delete/${id_videojuego}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include", 
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el producto del carrito");
        }

        return await response.json(); 
    } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
        return null; 
    }
};

const Carrito = () => {
    const { email } = useParams(); 
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [total, setTotal] = useState(0); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProductosCarrito = async () => {
            const data = await fetchProductosCarrito();
            console.log('Carrito deseados:', data); 

            setProductosCarrito(data); 
            setLoading(false); 

            let totalPrecio = 0;
            data.forEach((producto) => {
                const precio = parseFloat(producto.precio.replace('$', '').trim());
                totalPrecio += precio;
            });

            setTotal(totalPrecio.toFixed(2)); 
        };

        getProductosCarrito();
    }, [email]); 

    const handleEliminarProducto = async (id_videojuego) => {
        if (!id_videojuego) {
            console.error('ID de videojuego no proporcionado');
            return; 
        }

        console.log(`Eliminando producto con ID: ${id_videojuego}`); 
        const resultado = await eliminarProductoCarrito(id_videojuego);
        console.log(resultado);
    
        if (resultado && resultado.carrito) {
            setProductosCarrito(resultado.carrito);
    
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
                        console.log('Producto en el carrito:', producto); 
                        return (
                            <div key={producto.id_videojuego} className="producto-carrito">
                                <TarjetaCarrito
                                    id_videojuego={producto.id_videojuego}  
                                    nombre={producto.nombre}
                                    imagen={producto.imagen_chica}  
                                    precio={producto.precio}  
                                    handleEliminarProducto={handleEliminarProducto}  
                                />
                            </div>
                        );
                    })
                )}
            </div>
            <div className="total">
                <h3>Total de productos en el carrito: ${total}</h3>
            </div>
            <button 
                className="confirm-btn" 
                disabled={parseFloat(total) === 0} // Deshabilitar si el total es 0
            >
                <Link to={parseFloat(total) === 0 ? "#" : "/pagos"}>Confirmar</Link>
            </button>  
        </>
    );
};

export default Carrito;
