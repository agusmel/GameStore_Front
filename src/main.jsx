import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import CrearCuentaUsuario from './paginas/CrearCuentaUsuario.jsx';
import Catalogo from './paginas/Catalogo.jsx';
import PerfilUsuario from './paginas/perfil.jsx';
import GamePage from './paginas/GamePage.jsx';
import { Login } from '@mui/icons-material';
import Biblioteca from './paginas/biblioteca.jsx';
import Carrito from './paginas/Carrito.jsx';
import Pagos from './paginas/Pagos.jsx';
import Deseados from './paginas/Deseados.jsx';
import LoginUsuario from './paginas/LoginUsuario.jsx';
import LoginEmpresa from './paginas-empresa/LoginEmpresa.jsx';
import PageInicio from './paginas/Pageinicio.jsx';
import CrearCuentaEmpresa from './paginas-empresa/CrearCuentaEmpresa.jsx';
import CatalogoEmpresa from './paginas-empresa/CatalogoEmpresa.jsx';
import GamePageEmpresa from './paginas-empresa/GamePageEmpresa.jsx';
import PerfilEmpresa from './paginas-empresa/PerfilEmpresa.jsx';

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
    path: "/game/:id", // Ruta para la página de detalles del juego
    element: <GamePage/>
  },
  {
    path: "/carrito",
    element: <Carrito/>
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
    path: "/registrarUsuario",
    element: <CrearCuentaUsuario/>
  },
  {
    path: "/pagos",
    element: <Pagos/>
  },
  {
    path: "/loginUsuario",
    element: <LoginUsuario/>,
},
{
  path: "/loginEmpresa",
  element: <LoginEmpresa/>
},
{
  path: "/registrarEmpresa",
  element: <CrearCuentaEmpresa/>,
},
{
  path: "/catalogoEmpresa",
  element: <CatalogoEmpresa/>,
},
{
  path: "/gameDetail/:nombre", // Ruta para la página de detalles del juego
  element: <GamePageEmpresa/>
},
{
  path: "/perfilEmpresa", // Ruta para la página de detalles del juego
  element: <PerfilEmpresa/>
},

  
]

const router= createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
