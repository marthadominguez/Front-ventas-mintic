import 'styles/styles.css';
import 'styles/responsive.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from 'layouts/Layout';
import RegistroVentas from 'pages/ventas/RegistroVentas';
import ListadoVentas from 'pages/ventas/ListadoVentas';
import RegistroProductos from 'pages/productos/RegistroProductos';
import ListadoProductos from 'pages/productos/ListadoProductos';
import Usuarios from 'pages/Usuarios';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="registro-ventas" element={<RegistroVentas/>}/>
            <Route path="listado-ventas" element={<ListadoVentas/>}/>
            <Route path="registro-productos" element={<RegistroProductos/>}/>
            <Route path="listado-productos" element={<ListadoProductos/>}/>
            <Route path="usuarios" element={<Usuarios/>}/>   
          </Route>
          <Route path="login" element={<Login/>}/>  
          <Route path="*" element={<NotFound/>}/>  
        </Routes>
      </Router>
    </div>
  );
}

export default App;

