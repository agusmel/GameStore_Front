import React, { useState } from 'react';
import './LoadGame.css';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Link, useNavigate } from 'react-router-dom';
function FormularioJuego() {
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
                <input type="text" placeholder="Nombre del juego" className="input-nombre" />
                <input id="portada-input" type="file" onChange={handleFileChange} hidden />
            </div>
            <div className="campos-superiores">
                <input type="text" placeholder="Categoría" className="input-categoria" />
                <input placeholder="Precio" className="input-precio" />
            </div>
            <input placeholder="Descripción del juego" className="textarea-descripcion"></input>

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

            <div className="caract">
                <label><input type="checkbox" /> Un jugador</label>
                <label><input type="checkbox" /> Cooperativo online</label>
                <label><input type="checkbox" /> Compatible con mando</label>
                <label><input type="checkbox" /> multijugador en linea</label>
                <label><input type="checkbox" /> conpatible con volante</label>
                <label><input type="checkbox" /> tienda de mods</label>
                <label><input type="checkbox" /> Requiere conexión a Internet </label>
                <label><input type="checkbox" /> Modo VR</label>
                <label><input type="checkbox" /> Contenido adicional descargable</label>
   
            </div>

            <div className="button">
                <Link className="button-cancelar" to="/catalogoEmpresa">Cancelar</Link>
                <Link className="button-cargar" to="/catalogoEmpresa">Cargar</Link>
            </div>
        </div>
    );
}

export default FormularioJuego;
