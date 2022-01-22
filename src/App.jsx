import 'styles/styles.css';
import 'styles/responsive.css'
import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateLayout from 'layouts/PrivateLayout';
// import PublicLayout from 'layouts/PublicLayout';
import RegistroVentas from 'pages/ventas/RegistroVentas';
import ListadoVentas from 'pages/ventas/ListadoVentas';
import RegistroProductos from 'pages/productos/RegistroProductos';
import ListadoProductos from 'pages/productos/ListadoProductos';
import ListadoUsuarios from 'pages/usuarios/ListadoUsuarios';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserContext } from "context/userContext"

function App() {

  const [userData, setUserData] = useState({})

  return (
    <Auth0Provider
      domain="sistema-ventas.us.auth0.com"
      clientId="QTIh1sIfSTok7zOkD3Y2D9sIAIBEMH2E"
      // redirectUri='http://localhost:3000/'
      redirectUri="https://sistema-ventas-mld.herokuapp.com/"
      audience='api-sistema-ventas'
    >
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<PrivateLayout />}>
                <Route path="registro-ventas" element={<RegistroVentas />} />
                <Route path="listado-ventas" element={<ListadoVentas />} />
                <Route path="registro-productos" element={<RegistroProductos />} />
                <Route path="listado-productos" element={<ListadoProductos />} />
                <Route path="listado-usuarios" element={<ListadoUsuarios />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </UserContext.Provider>
    </Auth0Provider>
  );
}

export default App;

