import { Link } from 'react-router-dom';
import useActiveRoute from 'hooks/useActiveRoute';

const Sidebar = () => {

    return (
        <nav className="navbar_container sidebar">
            <div className="navbar_title">
                <h2>MLD</h2>
            </div>
            <ul>
                <li className="navbar_items">
                    <div>
                        <div className="module_title">
                            <span className="navbar_icons material-icons">store</span>
                            <span>Ventas</span>
                        </div>
                        <NavLink titulo="Registro de ventas" ruta="registro-ventas" />
                        <NavLink titulo="Listado" ruta="listado-ventas" />
                    </div>
                </li>
                <li className="navbar_items">
                    <div>
                        <div className="module_title">
                            <span className="navbar_icons material-icons-round">inventory</span>
                            <span>Productos</span>
                        </div>
                        <NavLink titulo="Registro de productos" ruta="registro-productos" />
                        <NavLink titulo="Listado" ruta="listado-productos" />
                    </div>
                </li>
                <li className="navbar_items">
                    <div>
                        <div className="module_title">
                            <span className="navbar_icons material-icons">manage_accounts</span>
                            <span>Usuarios</span>
                        </div>
                        <NavLink titulo="Gestión de usuarios" ruta="listado-usuarios" />
                    </div>
                </li>
            </ul>
        </nav>
    )
}

const NavLink = ({ titulo, ruta }) => {

    const isActive = useActiveRoute(ruta)

    return (
        <Link className={`module_items ${ isActive ? "activo" : ""}`} to={ruta}>{titulo}</Link>
    )
}

export default Sidebar

// {`module_items ${ isActive ? "active_link" : ""}`}