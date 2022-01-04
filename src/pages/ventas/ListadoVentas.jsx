
const ListadoVentas = () => {
    return (
        <>
            <div className="table_container">
                <div className="table_header">
                    <h2 >Gestión de Ventas</h2>
                    <div className="search_input">
                        <input className="search_text" type="search" placeholder="Buscar..." />
                        <select name="" id="">
                            <option value="Criterio">- Criterio -</option>
                            <option value="ID">ID Venta</option>
                            <option value="Documento">Documento</option>
                            <option value="Cliente">Cliente</option>
                        </select>
                        <button className="search_btn"><span className="material-icons-round search_icon">search</span></button>
                    </div>
                </div>
                <div className="table_canvas">
                    <table className="table">
                        <thead>
                            <tr className="table_row">
                                <th>ID</th>
                                <th>Vr. Total</th>
                                <th>ID Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unit.</th>
                                <th>Fecha</th>
                                <th>Documento</th>
                                <th>Nombre Cliente</th>
                                <th>Vendedor</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>$</td>
                                <td>Datos</td>
                                <td>Datos</td>
                                <td>Datos</td>
                                <td>Datos</td>
                                <td>Datos</td>
                                <td>Datos</td>
                                <td>Datos</td>
                                <td>Datos</td>
                                <td>
                                    <button className="edit_btn"><span className="material-icons edit">edit</span></button>
                                    <button className="delete_btn"><span className="material-icons delete">delete</span></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ListadoVentas