import React, { useState, useEffect } from 'react';
import './LoadGame.css';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Link } from 'react-router-dom';

function FormularioJuego() {
    const [idiomas, setIdiomas] = useState([]);
    const [portada, setPortada] = useState(null);
    const [imagenURL, setImagenURL] = useState(null);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [etiquetas, setEtiquetas] = useState([]);
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [selectedOS, setSelectedOS] = useState("Windows");
    const [requisitos, setRequisitos] = useState({
        Windows: { minimos: {}, recomendados: {} },
        Linux: { minimos: {}, recomendados: {} },
        macOS: { minimos: {}, recomendados: {} },
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPortada(file);
        setImagenURL(URL.createObjectURL(file));
    };

    const handleOSChange = (os) => {
        setSelectedOS(os);
    };

    const handleAgregarIdioma = () => {
        setIdiomas([...idiomas, { nombre: "", interfaz: false, audio: false, subtitulos: false }]);
    };

    const handleIdiomaNombreChange = (index, value) => {
        const newIdiomas = [...idiomas];
        newIdiomas[index].nombre = value;
        setIdiomas(newIdiomas);
    };

    const handleIdiomaChange = (index, field) => {
        const newIdiomas = [...idiomas];
        newIdiomas[index][field] = !newIdiomas[index][field];
        setIdiomas(newIdiomas);
    };

    const handleEtiquetaChange = (etiqueta) => {
        setEtiquetas(prev =>
            prev.includes(etiqueta)
                ? prev.filter(e => e !== etiqueta)
                : [...prev, etiqueta]
        );
    };

    const handleCaracteristicaChange = (caracteristica) => {
        setCaracteristicas(prev =>
            prev.includes(caracteristica)
                ? prev.filter(c => c !== caracteristica)
                : [...prev, caracteristica]
        );
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

    const isFormValid = () => {
        const hasPortada = !!portada;
        const hasNombre = nombre.trim() !== "";
        const hasPrecio = precio.trim() !== "";
        const hasDescripcion = descripcion.trim() !== "";
        const hasEtiqueta = etiquetas.length > 0;
        const hasCaracteristica = caracteristicas.length > 0;
        const hasIdioma = idiomas.some(idioma => idioma.nombre);
        
        const hasRequisitosMinimos = Object.values(requisitos[selectedOS].minimos).every(val => val && val.trim() !== "");
        const hasRequisitosRecomendados = Object.values(requisitos[selectedOS].recomendados).every(val => val && val.trim() !== "");

        return hasPortada && hasNombre && hasPrecio && hasDescripcion && hasEtiqueta && hasCaracteristica && hasIdioma && hasRequisitosMinimos && hasRequisitosRecomendados;
    };

    return (
        <div className="formulario-juego">
            <div className="portada">
                <label htmlFor="portada-input" className="portada-label">
                    {imagenURL ? (
                        <img src={imagenURL} alt="Portada" className="preview-imagen" />
                    ) : (
                        <div className="icono-portada">
                            <PhotoCameraIcon />
                            
                        </div>
                    )}
                </label>
                <input id="portada-input" type="file" onChange={handleFileChange} hidden />
            </div>
            <div className="campos-superiores">
                <input type="text" placeholder="Nombre del juego" className="input-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input placeholder="Precio" className="input-precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            </div>
            <textarea placeholder="Descripción del juego" className="textarea-descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

            <div className="etiquetas">
                <h4>Etiquetas</h4>
                {["FPS", "Survival", "Battle royale", "Mundo abierto", "Fantasía", "RPG"].map(etiqueta => (
                    <label key={etiqueta}>
                        <input type="checkbox" checked={etiquetas.includes(etiqueta)} onChange={() => handleEtiquetaChange(etiqueta)} /> {etiqueta}
                    </label>
                ))}
            </div>

            <div className="os-selector">
                <button className={selectedOS === "Windows" ? "active" : ""} onClick={() => handleOSChange("Windows")}>Windows</button>
                <button className={selectedOS === "Linux" ? "active" : ""} onClick={() => handleOSChange("Linux")}>Linux</button>
                <button className={selectedOS === "macOS" ? "active" : ""} onClick={() => handleOSChange("macOS")}>macOS</button>
            </div>

            <div className="requerimientos">
                <div className="requerimiento">
                    <h4>Requerimientos mínimos del sistema - {selectedOS}</h4>
                    <input placeholder="OS:" value={requisitos[selectedOS].minimos.os || ""} onChange={(e) => handleRequisitoChange("minimos", "os", e.target.value)} />
                    <input placeholder="Procesador:" value={requisitos[selectedOS].minimos.procesador || ""} onChange={(e) => handleRequisitoChange("minimos", "procesador", e.target.value)} />
                    <input placeholder="Memoria:" value={requisitos[selectedOS].minimos.memoria || ""} onChange={(e) => handleRequisitoChange("minimos", "memoria", e.target.value)} />
                    <input placeholder="Gráficos:" value={requisitos[selectedOS].minimos.graficos || ""} onChange={(e) => handleRequisitoChange("minimos", "graficos", e.target.value)} />
                    <input placeholder="Almacenamiento:" value={requisitos[selectedOS].minimos.almacenamiento || ""} onChange={(e) => handleRequisitoChange("minimos", "almacenamiento", e.target.value)} />
                </div>
                <div className="requerimiento">
                    <h4>Requerimientos recomendados del sistema - {selectedOS}</h4>
                    <input placeholder="OS:" value={requisitos[selectedOS].recomendados.os || ""} onChange={(e) => handleRequisitoChange("recomendados", "os", e.target.value)} />
                    <input placeholder="Procesador:" value={requisitos[selectedOS].recomendados.procesador || ""} onChange={(e) => handleRequisitoChange("recomendados", "procesador", e.target.value)} />
                    <input placeholder="Memoria:" value={requisitos[selectedOS].recomendados.memoria || ""} onChange={(e) => handleRequisitoChange("recomendados", "memoria", e.target.value)} />
                    <input placeholder="Gráficos:" value={requisitos[selectedOS].recomendados.graficos || ""} onChange={(e) => handleRequisitoChange("recomendados", "graficos", e.target.value)} />
                    <input placeholder="Almacenamiento:" value={requisitos[selectedOS].recomendados.almacenamiento || ""} onChange={(e) => handleRequisitoChange("recomendados", "almacenamiento", e.target.value)} />
                </div>
            </div>

            <div className="opciones">
                <div className="caract">
                    <h4>Características</h4>
                    {["Un jugador", "Cooperativo online", "Compatible con mando", "Multijugador en línea", "Compatible con volante", "Tienda de mods", "Requiere conexión a Internet", "Modo VR", "Contenido adicional descargable"].map(caracteristica => (
                        <label key={caracteristica}>
                            <input type="checkbox" checked={caracteristicas.includes(caracteristica)} onChange={() => handleCaracteristicaChange(caracteristica)} /> {caracteristica}
                        </label>
                    ))}
                </div>

                <div className="lenguajes">
                    <h4>Idiomas Disponibles</h4>
                    {idiomas.map((idioma, index) => (
                        <div key={index} className="idioma">
                            <input type="text" placeholder="Idioma" value={idioma.nombre} onChange={(e) => handleIdiomaNombreChange(index, e.target.value)} className="input-idioma" />
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
                <Link className={`button-cargar ${isFormValid() ? '' : 'disabled'}`} to="/catalogoEmpresa" onClick={(e) => !isFormValid() && e.preventDefault()}>
                    Cargar
                </Link>
            </div>
        </div>
    );
}

export default FormularioJuego;
