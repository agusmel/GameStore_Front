import React, { useState, useEffect } from 'react';
import './Deseados.css';
import { useParams } from 'react-router-dom';
import BarraNavegacion from '../componentes/barraNavegacion.jsx';
import TarjetaDeseados from '../componentes/TarjetaDeseados.jsx';

// Función para obtener los juegos deseados usando el email
export const fetchJuegosDeseados = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/wishlist`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Si es necesario para mantener la sesión
        });

        if (!response.ok) {
            throw new Error("Error al obtener los juegos deseados");
        }

        const data = await response.json();
        return Array.isArray(data) ? data : []; // Asegurarse de que siempre sea un array
    } catch (error) {
        console.error("Error al obtener juegos deseados:", error);
        return []; // Retorna un array vacío en caso de error
    }
};

// Función para eliminar el juego deseado
export const eliminarJuegoDeseado = async (id_videojuego) => {
    try {
        const response = await fetch(`http://localhost:3000/api/wishlist/delete/${id_videojuego}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Si es necesario para mantener la sesión
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el juego deseado");
        }

        return await response.json(); // Devuelve la wishlist actualizada después de la eliminación
    } catch (error) {
        console.error("Error al eliminar el juego deseado:", error);
        return null; // Devuelve null en caso de error
    }
};

const Deseados = () => {
    const { email } = useParams(); // Obtén el email desde la URL
    const [juegosDeseados, setJuegosDeseados] = useState([]);
    const [loading, setLoading] = useState(true);

    // Usamos useEffect para cargar los juegos deseados al montar el componente
    useEffect(() => {
        const getJuegosDeseados = async () => {
            const data = await fetchJuegosDeseados();
            console.log('Juegos deseados:', data); // Imprimir los datos para asegurarte de que llegan correctamente
            setJuegosDeseados(Array.isArray(data) ? data : []); // Asegurarse de que siempre sea un array
            setLoading(false); // Dejamos de mostrar el mensaje de carga
        };

        getJuegosDeseados();
    }, [email]); // Se ejecuta cada vez que el email cambie

    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <p>Cargando juegos...</p>;
    }

    // Función para manejar la eliminación de un juego deseado
    const handleEliminar = async (id_videojuego) => {
        const resultado = await eliminarJuegoDeseado(id_videojuego); // Llamada para eliminar el videojuego del wishlist
        console.log('Resultado de eliminar:', resultado); // Añade este log para ver lo que llega del backend

        if (resultado && resultado.wishlist) { // Verificamos si la respuesta tiene la wishlist actualizada
            setJuegosDeseados(Array.isArray(resultado.wishlist) ? resultado.wishlist : []); // Asegurarse de que siempre sea un array
        } else {
            console.error("Error al eliminar el videojuego o no se obtuvo la wishlist actualizada.");
        }
    };

    return (
        <>
            <BarraNavegacion />
            <div className="checkout">
                {/* Si no hay juegos deseados, muestra el mensaje */}
                {juegosDeseados.length === 0 ? (
                    <p>No tienes juegos deseados.</p>
                ) : (
                    // Si hay juegos, los mapea
                    juegosDeseados.map((juego) => (
                        <TarjetaDeseados
                            key={juego.id}  // Usa el id del videojuego como clave
                            id_videojuego={juego.id}  // Pasamos id_videojuego correctamente
                            nombre={juego.nombre}
                            imagen={juego.imagen_chica}
                            precio={juego.precio}
                            handleEliminar={handleEliminar}  // Pasamos la función de eliminación
                        />
                    ))
                )}
            </div>
        </>
    );
};

export default Deseados;