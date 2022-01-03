import React, { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { obtenerProductos, eliminarProducto, editarProducto } from "utils/api.js"
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
                                <th className="texto" scope="col">ID</th>
                                <th className="texto" scope="col">Nombre</th>
                                <th className="texto" scope="col">Descripción</th>
                                <th className="texto" scope="col">Estado</th>
                                <th className="numero" scope="col">Tamaño (cm)</th>
                                <th className="numero" scope="col">Vr. Unitario ($)</th>
                                <th className="acciones" scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((p) => {
                                return (
                                    <FilaProducto p={p} key={nanoid()}></FilaProducto>
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

const FilaProducto = ({ p }) => {

    const [editar, setEditar] = useState(false);
    const [infoNuevoProducto, setInfoNuevoProducto] = useState({
        _id: p._id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        estado: p.estado,
        tamano: p.tamano,
        valorUnitario: p.valorUnitario   
    })

    const actualizarProducto = async () => {
        await editarProducto(
            p._id,
            {
                nombre: infoNuevoProducto.nombre,
                descripcion: infoNuevoProducto.descripcion,
                estado: infoNuevoProducto.estado,
                tamano: infoNuevoProducto.tamano,
                valorUnitario: infoNuevoProducto.valorUnitario
            },
            (response) => {
                console.log(response.data);
                toast.success("Producto editado con éxito");
                setEditar(false);
            },
            (error) => {
                console.error(error);
                toast.error("Error editando el producto");
            }
        )

    }

    const eliminacionDeProducto = async () => {
        await eliminarProducto(
            p._id,
            (response) => {
                console.log(response.data);
                toast.success("Producto eliminado con éxito")
            },
            (error) => {
                console.error(error);
                toast.error("Error eliminando el producto")
            },
        )
    }

    return (
        <tr>
            {editar ? (
                <>
                    <td>{p._id.slice(15)}</td>
                    <td><input type="text" name="nombre" className="edit_input" value={infoNuevoProducto.nombre} onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto, nombre: e.target.value})}/></td>
                    <td className="descripcion"><textarea name="descripcion" className="edit_input textarea_edit" value={infoNuevoProducto.descripcion} onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto, descripcion: e.target.value})}/></td>
                    <td className="estado">
                        <select name="estado" className="edit_input" required value={infoNuevoProducto.estado} onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto, estado: e.target.value})}>
                            <option >Disponible</option>
                            <option >No disponible</option>
                        </select>
                    </td>
                    <td><input type="number" name="tamano" className="edit_input numero" value={infoNuevoProducto.tamano} onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto, tamano: e.target.value})}/></td>
                    <td><input type="number" name="tamano" className="edit_input numero" value={infoNuevoProducto.valorUnitario} onChange={(e)=>setInfoNuevoProducto({...infoNuevoProducto, valorUnitario: e.target.value})}/></td>
                </>) : (
                <>
                    <td className="texto">{p._id.slice(15)}</td>
                    <td className="texto">{p.nombre}</td>
                    <td className="texto">{p.descripcion}</td>
                    <td className="texto">{p.estado}</td>
                    <td className="numero">{p.tamano}</td>
                    <td className="numero">{p.valorUnitario}</td>
                </>)}
            {editar ? (<>
                <td className="acciones">
                    <button title="Editar" onClick={() => actualizarProducto()} className="edit_btn"><span className="material-icons edit">check_circle</span></button >
                    <button title="Cancelar" onClick={() => setEditar(!editar)} className="delete_btn"><span className="material-icons delete">cancel</span></button>
                </td >
            </>) : (
                <>
                    <td className="acciones">
                        <button title="Editar" onClick={() => setEditar(!editar)} className="edit_btn"><span className="material-icons edit">edit</span></button >
                        <button title="Eliminar" onClick={() => eliminacionDeProducto()} className="delete_btn"><span className="material-icons delete">delete</span></button>
                    </td >
                </>)}
        </tr >
    )
}

export default ListadoProductos