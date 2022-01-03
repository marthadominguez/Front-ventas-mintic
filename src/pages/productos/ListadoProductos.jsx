import React, { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { obtenerProductos, eliminarProducto } from "utils/api.js"
import { toast } from "react-toastify"

const ListadoProductos = () => {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        const fetchProductos = async () => {

            await obtenerProductos(
                (response) => {
                    console.log("La respuesta que se recibe es:", response);
                    setProductos(response.data)
                },
                (error) => {
                    console.error("Salió un error y es:", error)
                }
            )
        }
        fetchProductos()
    }, [])

    return (
        <>
            <div className="table_container">
                <div className="table_header" id="listado_venta">
                    <h2 >Gestión de Productos</h2>
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
                                <th className="texto" scope="col">ID Producto</th>
                                <th className="texto" scope="col">Nombre</th>
                                <th className="texto" scope="col">Descripción</th>
                                <th className="texto" scope="col">Estado</th>
                                <th className="numero" scope="col">Tamaño (cm)</th>
                                <th className="numero" scope="col">Valor Unitario ($)</th>
                                <th className="acciones" scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((p) => {
                                return (
                                    <tr key={nanoid()}>
                                        <td className="texto" >{p._id.slice(15)}</td>
                                        <td className="texto" >{p.nombre}</td>
                                        <td className="texto">{p.descripcion}</td>
                                        <td className="texto">{p.estado}</td>
                                        <td className="numero">{p.tamano}</td>
                                        <td className="numero">{p.valorUnitario}</td>
                                            <AccionProducto p={p}></AccionProducto>
                                    </tr>
                                )
                            }
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

const AccionProducto = ({p}) => {

    const eliminacionDeProducto = async () => {
        await eliminarProducto(
            p._id, 
            (response)=>{
                console.log(response.data);
                toast.success("Producto eliminado con éxito")
            },
            (error)=>{
                console.error(error);
                toast.error("Error eliminando el producto")
            },
        )
    }

    return (
        <td className="acciones">
            <button title="Editar" className="edit_btn"><span className="material-icons edit">edit</span></button>
            <button title="Eliminar" onClick={() => eliminacionDeProducto()} className="delete_btn"><span className="material-icons delete">delete</span></button>
        </td>
    )

}


export default ListadoProductos