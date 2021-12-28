
const ListadoVentas = () => {
    return (
        <>
            <div class="table_container">
                <div class="table_header" id="listado_venta">
                    <h2 >Gestión de Ventas</h2>
                    <div class="search_input">
                        <input class="search_text" type="search" placeholder="Buscar..." />
                        <select name="" id="">
                            <option value="Criterio">- Criterio -</option>
                            <option value="ID">ID Venta</option>
                            <option value="Documento">Documento</option>
                            <option value="Cliente">Cliente</option>
                        </select>
                        <button class="search_btn"><span class="material-icons-round search_icon">search</span></button>
                    </div>
                </div>
                <div class="table_canvas">
                    <table class="table">
                        <thead>
                        <tr class="table_row">
                            <th scope="col">ID</th>
                            <th scope="col">Vr. Total</th>
                            <th scope="col">ID Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio Unit.</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Documento</th>
                            <th scope="col">Nombre Cliente</th>
                            <th scope="col">Vendedor</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td scope="row">01</td>
                            <td scope="row">$</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">
                                <button class="edit_btn"><span class="material-icons edit">edit</span></button>
                                <button class="delete_btn"><span class="material-icons delete">delete</span></button>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">02</td>
                            <td scope="row">$</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">Datos</td>
                            <td scope="row">
                                <button class="edit_btn"><span class="material-icons edit">edit</span></button>
                                <button class="delete_btn"><span class="material-icons delete">delete</span></button>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row">
                                <button class="edit_btn"><span class="material-icons edit">edit</span></button>
                                <button class="delete_btn"><span class="material-icons delete">delete</span></button>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row">
                                <button class="edit_btn"><span class="material-icons edit">edit</span></button>
                                <button class="delete_btn"><span class="material-icons delete">delete</span></button>
                            </td>
                        </tr>
                        <tr>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row">
                                <button class="edit_btn"><span class="material-icons edit">edit</span></button>
                                <button class="delete_btn"><span class="material-icons delete">delete</span></button>
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