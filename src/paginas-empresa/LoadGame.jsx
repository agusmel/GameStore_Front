import React, { useState } from 'react';
import './LoadGame.css';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Link, useNavigate } from 'react-router-dom';

function FormularioJuego() {
    const [idiomas, setIdiomas] = useState([]);  // Estado para almacenar la lista de idiomas disponibles
    const [portada, setPortada] = useState(null);
    const [selectedOS, setSelectedOS] = useState("Windows");
    const [requisitos, setRequisitos] = useState({
        Windows: { minimos: {}, recomendados: {} },
        Linux: { minimos: {}, recomendados: {} },
        macOS: { minimos: {}, recomendados: {} },
    });

    const handleFileChange = (event) => {
        setPortada(event.target.files[0]);
    };

    const handleOSChange = (os) => {
        setSelectedOS(os);
    };


    const handleAgregarIdioma = () => {
        setIdiomas([...idiomas, { nombre: "", interfaz: false, audio: false, subtitulos: false }]);
        // Agrega un nuevo idioma con campos vacíos e inicia los valores de interfaz, audio y subtítulos en false
    };

    const handleIdiomaNombreChange = (index, value) => {
        const newIdiomas = [...idiomas];
        newIdiomas[index].nombre = value;  // Cambia el nombre del idioma en el índice correspondiente
        setIdiomas(newIdiomas);
    };

    const handleIdiomaChange = (index, field) => {
        const newIdiomas = [...idiomas];
        newIdiomas[index][field] = !newIdiomas[index][field];  // Cambia el estado de interfaz, audio o subtítulos para un idioma
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

    return (
        <div className="formulario-juego">
            <div className="portada">
                <label htmlFor="portada-input" className="portada-label">
                    <div className="icono-portada"><PhotoCameraIcon /></div>
                    <span>Portada</span>
                </label>
                <input id="portada-input" type="file" onChange={handleFileChange} hidden />
            </div>
            <div className="campos-superiores">
                <input type="text" placeholder="Nombre del juego" className="input-nombre" />
                <input placeholder="Precio" className="input-precio" />
            </div>
            <textarea placeholder="Descripción del juego" className="textarea-descripcion"></textarea>


            <div className="etiquetas">
                <h4>Etiquetas</h4>
                    <label><input type="checkbox" /> FPS</label>
                    <label><input type="checkbox" /> Survival</label>
                    <label><input type="checkbox" /> Battle royale</label>
                    <label><input type="checkbox" /> Mundo abierto</label>
                    <label><input type="checkbox" /> Fantasia</label>
                    <label><input type="checkbox" /> RPG</label>

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
                    <label><input type="checkbox" /> Un jugador</label>
                    <label><input type="checkbox" /> Cooperativo online</label>
                    <label><input type="checkbox" /> Compatible con mando</label>
                    <label><input type="checkbox" /> Multijugador en linea</label>
                    <label><input type="checkbox" /> Compatible con volante</label>
                    <label><input type="checkbox" /> Tienda de mods</label>
                    <label><input type="checkbox" /> Requiere conexión a Internet </label>
                    <label><input type="checkbox" /> Modo VR</label>
                    <label><input type="checkbox" /> Contenido adicional descargable</label>
                </div>

                <div className="lenguajes">
                    <h4>Idiomas Disponibles</h4>
                    {idiomas.map((idioma, index) => (
                        <div key={index} className="idioma">
                            <input type="text" placeholder="Idioma" value={idioma.nombre} onChange={(e) => handleIdiomaNombreChange(index, e.target.value)} className="input-idioma"/> 
                            <label><input type="checkbox" checked={idioma.interfaz} onChange={() => handleIdiomaChange(index, 'interfaz')}/>Interfaz</label>
                            <label><input type="checkbox" checked={idioma.audio} onChange={() => handleIdiomaChange(index, 'audio')}/>Audio </label>
                            <label><input type="checkbox"checked={idioma.subtitulos} onChange={() => handleIdiomaChange(index, 'subtitulos')}/>Subtítulos</label>
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

export default FormularioJuego;
