import { Link } from 'react-router-dom';

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
                        <Link className="module_items" to="ventas">Registro de venta</Link>
                        <Link className="module_items" to="listado-ventas">Listado</Link>
                    </div>
                </li>
                <li className="navbar_items">
                    <div>
                        <div className="module_title">
                            <span className="navbar_icons material-icons-round">inventory</span>
                            <span>Productos</span>                        
                        </div>
                        <Link className="module_items" to="productos">Registro de productos</Link>
                        <Link className="module_items" to="listado-productos">Listado</Link>
                    </div>
                </li>
                <li className="navbar_items">
                    <div>
                        <div className="module_title">
                            <span className="navbar_icons material-icons">manage_accounts</span>
                            <Link to="usuarios"><span>Usuarios</span></Link>                          
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar
