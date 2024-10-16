import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Categorias from './componentes/barraNavegacion';
import Carrito from './componentes/barraNavegacion';
import Biblioteca from './componentes/barraNavegacion';
import Deseados from './componentes/barraNavegacion';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import CrearCuenta from './paginas/CrearCuenta.jsx';
import Catalogo from './paginas/Catalogo.jsx';
import PerfilUsuario from './paginas/perfil.jsx';
import GamePage from './paginas/GamePage.jsx';

const routes=[
  {
      path: "/",
      element: <App/>,
  },
  {
    path: "/tienda",
    element: <Catalogo/>
  },
  {
    path: "/game/:nombre", // Ruta para la página de detalles del juego
    element: <GamePage/>
  },
  {
    path: "/carrito",
    element: <Carrito/>
  },
  {
    path: "/categorias",
    element: <Categorias/>
  },
  {
    path: "/biblioteca",
    element: <Biblioteca/>
  },
  {
    path: "/deseados",
    element: <Deseados/>
  },
  {
    path: "/account",
    element: <PerfilUsuario />
  },
  {
    path: "/register",
    element: <CrearCuenta/>
  },

]

const router= createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
