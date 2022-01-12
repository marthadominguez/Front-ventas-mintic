import React, { useEffect, useState } from "react"
import { queryAllVentas } from "../../utils/api"


const ListadoVentas = () => {
    const [ventas, setVentas] = useState([])

    useEffect(() => {
        const fetchVentas = async () => {
            await queryAllVentas(
                (response) => {
                    console.log("ventas:", response);
                    setVentas(response.data);
                },
                (error) => {
                    console.error("Salió un error y es:", error)
                }
            )
        }
        fetchVentas()
    }, [])

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
                                <th className="texto tl">ID</th>
                                <th className="texto">Nombre Cliente</th>
                                <th className="texto">Producto</th>
                                <th>Cant.</th>
                                <th className="numero">Vr. Total</th>
                                <th className="numero">Costo Envío</th>
                                <th className="texto">Medio de Pago</th>
                                <th className="texto">Contacto</th>
                                <th className="numero">Fecha</th>
                                <th className="texto">Vendedor</th>
                                <th className="texto">Estado</th>
                                <th className="acciones tr">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map((venta, index) => {
                                return (<FilasVentas venta={venta} key={index}></FilasVentas>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

const FilasVentas = ({ venta }) => {

    return (
        <tr>
            <td className="texto tl">{venta._id.slice(18)}</td>
            <td className="texto">{venta.cliente}</td>
            <td className="texto">
                <table className="tn">
                    {venta.productos.map((p) => { return (<tr><td className="td_nested">{p.nombre}</td></tr>) })}
                </table>
            </td>
            <td>
                <table className="tn">
                    {venta.productos.map((p) => { return (<tr className="numero"><td className="td_nested numero">{p.cantidad}</td></tr>) })}
                </table>
            </td>
            <td className="numero">aa</td>
            <td className="numero">{venta.costoEnvio}</td>
            <td className="texto">{venta.medioPago}</td>
            <td className="texto">{venta.puntoVenta}</td>
            <td className="numero">fecha</td>
            <td className="texto">{venta.vendedor.email}</td>
            <td className="texto tr">estado</td>
            <td>
                <button className="edit_btn"><span className="material-icons edit">edit</span></button>
                <button className="delete_btn"><span className="material-icons delete">delete</span></button>
            </td>
        </tr >
    )
}

export default ListadoVentas