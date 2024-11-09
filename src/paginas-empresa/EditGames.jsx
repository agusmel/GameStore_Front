import React, { useState, useEffect } from 'react';
import './EditGames.css';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Link, useParams, useNavigate } from 'react-router-dom';

const fetchGameDetails = async (id) => {
    const response = await fetch(`http://localhost:3000/api/videojuegos/juego/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error('Error al obtener los detalles del juego');
    }
    return response.json(); 
};

function EditGames() {
    const { id } = useParams(); // Obtenemos el ID del juego desde la URL
    const [juego, setJuego] = useState(null);
    const [idiomas, setIdiomas] = useState([]);
    const [portada, setPortada] = useState(null);
    const [imagenURL, setImagenURL] = useState(null); // Estado para la URL de la imagen
    const [selectedOS, setSelectedOS] = useState("windows");
    const [requisitos, setRequisitos] = useState({
        windows: { minimos: {}, recomendados: {} },
        linux: { minimos: {}, recomendados: {} },
        mac: { minimos: {}, recomendados: {} },
    });

    const [etiquetas, setEtiquetas] = useState([
        { nombre: "Acción", checked: false },
        { nombre: "RPG", checked: false },
        { nombre: "Mundo Abierto", checked: false },
        { nombre: "Fantasía", checked: false },
        { nombre: "FPS", checked: false },
        { nombre: "Survival", checked: false },
        { nombre: "Battle Royale", checked: false },
    ]);

    const [caracteristicas, setCaracteristicas] = useState([
        { nombre: "Un jugador", checked: false },
        { nombre: "Cooperativo online", checked: false },
        { nombre: "Compatible con mando", checked: false },
        { nombre: "Multijugador", checked: false },
        { nombre: "Compatible con volante", checked: false },
        { nombre: "Tienda de mods", checked: false },
        { nombre: "Requiere conexión a Internet", checked: false },
        { nombre: "Modo VR", checked: false },
        { nombre: "Contenido adicional descargable", checked: false },
        { nombre: "Control completo", checked: false },
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        const getGameDetails = async () => {
            try {
                const gameDatas = await fetchGameDetails(id); 
                const gameData = gameDatas[0]; // Obtenemos los detalles del juego usando el ID
                   console.log(gameData);

                if (gameData) {
                    setJuego(gameData);
                    setIdiomas(gameData.idiomas || []);
                    setRequisitos(gameData.requisitos || requisitos);
                    setImagenURL( gameData.imagen_grande  || null);

                    // Actualizamos etiquetas y características en función de los datos recibidos
                    const etiquetasActualizadas = etiquetas.map((etiqueta) => ({
                        ...etiqueta,
                        checked: gameData.etiquetas?.includes(etiqueta.nombre),
                    }));
                    setEtiquetas(etiquetasActualizadas);

                    const caracteristicasActualizadas = caracteristicas.map((caracteristica) => ({
                        ...caracteristica,
                        checked: gameData.caracteristicas?.includes(caracteristica.nombre),
                    }));
                    setCaracteristicas(caracteristicasActualizadas);
                } else {
                    console.error("Juego no encontrado");
                    navigate("/catalogoEmpresa");
                }
            } catch (error) {
                console.error("Error al obtener los detalles del juego:", error);
                navigate("/catalogoEmpresa");
            }
        };

        getGameDetails();
    }, [id, navigate]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPortada(file);
            setImagenURL(URL.createObjectURL(file)); // Vista previa de la portada
        }
    };

    const handleOSChange = (os) => {
        setSelectedOS(os);
    };

    const handleAgregarIdioma = () => {
        setIdiomas([...idiomas, { idioma: "", interfaz: false, audio: false, subtitulos: false }]);
    };

    const handleIdiomaNombreChange = (index, value) => {
        const newIdiomas = [...idiomas];
        newIdiomas[index].idioma = value;
        setIdiomas(newIdiomas);
    };

    const handleIdiomaChange = (index, field) => {
        const newIdiomas = [...idiomas];
        newIdiomas[index][field] = !newIdiomas[index][field];
        setIdiomas(newIdiomas);
    };

    const handleRequisitoChange = (tipo, campo, value) => {
        setRequisitos((prevRequisitos) => ({
            ...prevRequisitos,
            [selectedOS]: {
                ...prevRequisitos[selectedOS],
                [tipo]: {
                    ...prevRequisitos[selectedOS][tipo],
                    [campo]: value,
                },
            },
        }));
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setJuego((prevJuego) => ({ ...prevJuego, [field]: value }));
    };

    const handleEtiquetaChange = (index) => {
        const newEtiquetas = [...etiquetas];
        newEtiquetas[index].checked = !newEtiquetas[index].checked;
        setEtiquetas(newEtiquetas);
    };

    const handleCaracteristicaChange = (index) => {
        const newCaracteristicas = [...caracteristicas];
        newCaracteristicas[index].checked = !newCaracteristicas[index].checked;
        setCaracteristicas(newCaracteristicas);
    };

    return (
        <div className="formulario-juego">
            <div className="portada">
                <label htmlFor="portada-input" className="portada-label">
                    {imagenURL ? (
                        <img src={imagenURL} alt="Portada actual" className="preview-imagen" />
                    ) : (
                        <div className="icono-portada">
                            <PhotoCameraIcon />
                            
                        </div>
                    )}
                </label>
                <input id="portada-input" type="file" onChange={handleFileChange} hidden />
            </div>

            <div className="campos-superiores">
                <input type="text" placeholder="Nombre del juego" className="input-nombre" value={juego?.nombre || ""} onChange={(e) => handleInputChange(e, 'nombre')} />
                <input placeholder="Precio" className="input-precio" value={juego?.precio || ""} onChange={(e) => handleInputChange(e, 'precio')} />
            </div>

            <textarea placeholder="Descripción del juego" className="textarea-descripcion" value={juego?.descripcion_juego || ""} onChange={(e) => handleInputChange(e, 'descrpcionJuego')} />

            <div className="etiquetas">
                <h4>Etiquetas</h4>
                {etiquetas.map((etiqueta, index) => (
                    <label key={index}>
                        <input type="checkbox" checked={etiqueta.checked} onChange={() => handleEtiquetaChange(index)} /> {etiqueta.nombre}
                    </label>
                ))}
            </div>

            <div className="os-selector">
                <button className={selectedOS === "windows" ? "active" : ""} onClick={() => handleOSChange("windows")} >Windows</button>
                <button className={selectedOS === "linux" ? "active" : ""} onClick={() => handleOSChange("linux")} >Linux</button>
                <button className={selectedOS === "mac" ? "active" : ""} onClick={() => handleOSChange("mac")} >MacOS</button>
            </div>

            <div className="requerimientos">
                <div className="requerimiento">
                    <h4>Requerimientos mínimos del sistema - {selectedOS}</h4>
                    <input placeholder="OS:" value={requisitos[selectedOS]?.minimos.os || ""} onChange={(e) => handleRequisitoChange("minimos", "os", e.target.value)} />
                    <input placeholder="Procesador:" value={requisitos[selectedOS]?.minimos.procesador || ""} onChange={(e) => handleRequisitoChange("minimos", "procesador", e.target.value)} />
                    <input placeholder="Memoria:" value={requisitos[selectedOS]?.minimos.memoria || ""} onChange={(e) => handleRequisitoChange("minimos", "memoria", e.target.value)} />
                    <input placeholder="Gráficos:" value={requisitos[selectedOS]?.minimos.graficos || ""} onChange={(e) => handleRequisitoChange("minimos", "graficos", e.target.value)} />
                    <input placeholder="Almacenamiento:" value={requisitos[selectedOS]?.minimos.almacenamiento || ""} onChange={(e) => handleRequisitoChange("minimos", "almacenamiento", e.target.value)} />
                </div>
                <div className="requerimiento">
                    <h4>Requerimientos recomendados del sistema - {selectedOS}</h4>
                    <input placeholder="OS:" value={requisitos[selectedOS]?.recomendados.os || ""} onChange={(e) => handleRequisitoChange("recomendados", "os", e.target.value)} />
                    <input placeholder="Procesador:" value={requisitos[selectedOS]?.recomendados.procesador || ""} onChange={(e) => handleRequisitoChange("recomendados", "procesador", e.target.value)} />
                    <input placeholder="Memoria:" value={requisitos[selectedOS]?.recomendados.memoria || ""} onChange={(e) => handleRequisitoChange("recomendados", "memoria", e.target.value)} />
                    <input placeholder="Gráficos:" value={requisitos[selectedOS]?.recomendados.graficos || ""} onChange={(e) => handleRequisitoChange("recomendados", "graficos", e.target.value)} />
                    <input placeholder="Almacenamiento:" value={requisitos[selectedOS]?.recomendados.almacenamiento || ""} onChange={(e) => handleRequisitoChange("recomendados", "almacenamiento", e.target.value)} />
                </div>
            </div>

            <div className="opciones">
                <div className="caract">
                    <h4>Características</h4>
                    {caracteristicas.map((caract, index) => (
                        <label key={index}>
                            <input type="checkbox" checked={caract.checked} onChange={() => handleCaracteristicaChange(index)} /> {caract.nombre}
                        </label>
                    ))}
                </div>

                <div className="lenguajes">
                    <h4>Idiomas Disponibles</h4>
                    {idiomas.map((idioma, index) => (
                        <div key={index} className="idioma">
                            <input type="text" placeholder="Idioma" value={idioma.idioma} onChange={(e) => handleIdiomaNombreChange(index, e.target.value)} className="input-idioma" />
                            <label><input type="checkbox" checked={idioma.interfaz} onChange={() => handleIdiomaChange(index, 'interfaz')} /> Interfaz</label>
                            <label><input type="checkbox" checked={idioma.audio} onChange={() => handleIdiomaChange(index, 'audio')} /> Audio</label>
                            <label><input type="checkbox" checked={idioma.subtitulos} onChange={() => handleIdiomaChange(index, 'subtitulos')} /> Subtítulos</label>
                        </div>
                    ))}
                    <button onClick={handleAgregarIdioma}>Agregar Idioma</button>
                </div>
            </div>

            <div className="button">
                <Link className="button-cancelar" to="/catalogoEmpresa">Cancelar</Link>
                <Link className="button-cargar" to="/catalogoEmpresa">Cargar</Link>
            </div>
        </div>
    );
}

export default EditGames;