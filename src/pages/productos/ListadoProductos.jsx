import React, { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { obtenerProductos, eliminarProducto, editarProducto } from "utils/api.js"
import { toast } from "react-toastify"
import { Dialog } from "@mui/material"

const ListadoProductos = () => {
    const [productos, setProductos] = useState([]);
    const [refetch, setRefetch] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [productosFiltrados, setProductosFiltrados] = useState(productos)

    useEffect(() => {
        const fetchProductos = async () => {

            await obtenerProductos(
                (response) => {
                    console.log("Productos: La respuesta que se recibe es:", response);
                    setProductos(response.data);
                    setRefetch(false)
                },
                (error) => {
                    console.error("Salió un error y es:", error)
                }
            )
        }
        if (refetch) {
            fetchProductos()
        }

    }, [refetch])

    useEffect(() => {
        setProductosFiltrados(
            productos.filter((elemento) => {
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
            })
        )
    }, [busqueda, productos])

    return (
        <>
            <div className="table_container">
                <div className="table_header" id="listado_venta">
                    <h2 >Gestión de Productos</h2>
                    <div className="search_input">
                        <input value={busqueda} onChange={(e) => { setBusqueda(e.target.value) }} className="search_text" type="search" placeholder="Buscar..." />
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
                                <th className="texto">ID</th>
                                <th className="texto">Nombre</th>
                                <th className="texto">Descripción</th>
                                <th className="texto">Estado</th>
                                <th className="numero">Tamaño (cm)</th>
                                <th className="numero">Vr. Unitario ($)</th>
                                <th className="acciones">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosFiltrados.map((p) => {
                                return (
                                    <FilaProducto p={p} key={nanoid()} setRefetch={setRefetch}></FilaProducto>
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

const FilaProducto = ({ p, setRefetch }) => {

    const [openDialog, setOpenDialog] = useState(false)

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
                setRefetch(true);
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
                toast.success("Producto eliminado con éxito");
                setRefetch(true)
            },
            (error) => {
                console.error(error);
                toast.error("Error eliminando el producto")
            },
        )
        setOpenDialog(false);
    }

    return (
        <tr>
            {editar ? (
                <>
                    <td>{p._id.slice(18)}</td>
                    <td><input type="text" name="nombre" className="edit_input" value={infoNuevoProducto.nombre} onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, nombre: e.target.value })} /></td>
                    <td className="descripcion"><textarea name="descripcion" className="edit_input textarea_edit" value={infoNuevoProducto.descripcion} onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, descripcion: e.target.value })} /></td>
                    <td className="estado">
                        <select name="estado" className="edit_input" required value={infoNuevoProducto.estado} onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, estado: e.target.value })}>
                            <option >Disponible</option>
                            <option >No disponible</option>
                        </select>
                    </td>
                    <td><input type="number" name="tamano" className="edit_input numero" value={infoNuevoProducto.tamano} onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, tamano: e.target.value })} /></td>
                    <td><input type="number" name="tamano" className="edit_input numero" value={infoNuevoProducto.valorUnitario} onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, valorUnitario: e.target.value })} /></td>
                </>) : (
                <>
                    <td className="texto">{p._id.slice(18)}</td>
                    <td className="texto">{p.nombre}</td>
                    <td className="texto">{p.descripcion}</td>
                    <td className="texto">{p.estado}</td>
                    <td className="numero">{p.tamano}</td>
                    <td className="numero">{p.valorUnitario.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </>)}
            {editar ? (<>
                <td className="acciones">
                    <button title="Editar" onClick={() => actualizarProducto()} className="edit_btn"><span className="material-icons edit">done</span></button >
                    <button title="Cancelar" onClick={() => setEditar(!editar)} className="delete_btn"><span className="material-icons delete">clear</span></button>
                </td >
            </>) : (
                <>
                    <td className="acciones">
                        <button title="Editar" onClick={() => setEditar(!editar)} className="edit_btn"><span className="material-icons edit">edit</span></button >
                        <button title="Eliminar" onClick={() => setOpenDialog(true)} className="delete_btn"><span className="material-icons delete">delete</span></button>
                    </td >
                </>)}
            <Dialog open={openDialog}>
                <div className="dialog_eliminar_prod">
                    <h1>¿Está seguro que quiere eliminar el producto?</h1>
                    <button className="yes" title="Editar" onClick={() => eliminacionDeProducto()}>SI</button >
                    <button className="no" title="Eliminar" onClick={() => setOpenDialog(false)}>NO</button>
                </div>
            </Dialog>
        </tr >
    )
}

export default ListadoProductos