import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import BarraNavegacion from './componentes/barraNavegacion';
import Tienda from './componentes/barraNavegacion';
import Categorias from './componentes/barraNavegacion';
import Carrito from './componentes/barraNavegacion';
import Biblioteca from './componentes/barraNavegacion';
import Deseados from './componentes/barraNavegacion';
import Agus from './componentes/barraNavegacion';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const routes=[
  {
      path: "/",
      element: <App/>,
  },
  {
    path: "/tienda",
    element: <Tienda/>
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
    element: <Agus />
  },

]

const router= createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
