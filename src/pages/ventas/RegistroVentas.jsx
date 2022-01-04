import React, { useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { obtenerProductos, obtenerUsuarios, crearVenta } from "utils/api";
import { nanoid } from "nanoid";

const RegistroVentas = () => {
    const form = useRef(null);
    const [vendedores, setVendedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [filasTabla, setFilasTabla] = useState([]);
    const [productoAAgregar, setProductoAAgregar] = useState({})
    const [productosTabla, setProductosTabla] = useState([])

    useEffect(() => {
        const fetchVendedores = async () => {
            await obtenerUsuarios(
                (response) => { setVendedores(response.data) },
                (error) => { console.error(error) }
            );
        };
        const fetchProductos = async () => {
            await obtenerProductos(
                (response) => { setProductos(response.data) },
                (error) => { console.error(error) }
            );
        };
        fetchVendedores();
        fetchProductos();

    }, []);

    useEffect(()=>{
        setProductosTabla(filasTabla)
    },[filasTabla])

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        const formData = {};
        fd.forEach((value,key)=>{
            formData[key] = value;
        })
        const listaProductos = Object.keys(formData).map((k)=>{
            if (k.includes("producto")) {
                return productosTabla.filter((p)=>p._id === formData[k][0])
            } return null;
        }).filter((p)=>p);
        // el anterior filtro me filtra los que no son NULL. Para que no me salgan undefined. 

        const datosVenta = {
            vendedor: vendedores.filter((v)=>v._id===formData.vendedor)[0],
            cantidad: formData.cantidad,
            vehiculos: listaProductos
        }

        await crearVenta(
            datosVenta, 
            (response) => {
                console.log("La respuesta que se recibe es:", response);
            },
            (error) => {
                console.error("Salió un error y es:", error)
            }
        )
    }

    const agregarNuevoProducto = () => {
        if (productoAAgregar._id === undefined) {
            <></>
        } else {
            setFilasTabla([...filasTabla, productoAAgregar]);
            setProductos(productos.filter((p) => p._id !== productoAAgregar._id));
            setProductoAAgregar({});
        }
    };

    const modificarProducto = () => { };

    const quitarProducto = (productoAQuitar) => {
        setFilasTabla(filasTabla.filter((ft) => ft._id !== productoAQuitar._id));
        setProductos([...productos, productoAQuitar]);
    };

    return (
        <div className="custom_record">
            <h2 id="registro_venta">Nuevo registro de Venta</h2>
            <form ref={form} className="custom-sales_form">

                <label htmlFor="nombreCliente">Cliente</label>
                <input className="custom_input" type="text" placeholder="Nombre completo del cliente" name="nombreCliente" id="nombreCliente" required />

                <label htmlFor="ciudad">Ciudad</label>
                <input className="custom_input" type="text" placeholder="Ciudad de envío" name="ciudad" id="ciudad" required />

                <label htmlFor="puntoVenta">Medio de contacto</label>
                <select name="puntoVenta" id="puntoVenta" className="custom_input" required defaultValue="">
                    <option value="" disabled>- Seleccione el medio de contacto -</option>
                    <option>Instagram</option>
                    <option>Whatsapp</option>
                    <option>Otro</option>
                </select>

                <label htmlFor="medioPago">Medio de pago</label>
                <select name="medioPago" id="medioPago" className="custom_input" required defaultValue="">
                    <option value="" disabled>- Seleccione el medio de pago -</option>
                    <option>Bancolombia</option>
                    <option>NEQUI</option>
                    <option>Gane/Efecty</option>
                    <option>PSE</option>
                </select>

                <label htmlFor="costoEnvio">Costo de envío ($)</label>
                <input className="custom_input" type="number" placeholder="Costo de envío en pesos" name="costoEnvio" id="costoEnvio" required />

                <label htmlFor="vendedor">Vendedor</label>
                <select name="vendedor" id="vendedor" className="custom_input" required defaultValue="">
                    <option value="" disabled>- Seleccione el vendedor -</option>
                    {vendedores.map((v) => {
                        return (
                            <option key={nanoid()} value={v._id}>{v.email}</option>
                        )
                    })}
                </select>

                <label htmlFor="producto">Producto</label>
                <div className="select_add-producto">
                    <select
                        className="custom_input"
                        id="producto"
                        required
                        value={productoAAgregar._id ?? ""}
                        onChange={(e) => setProductoAAgregar(productos.filter((p) => p._id === e.target.value)[0])}>

                        <option disabled value="">- Seleccione el producto -</option>
                        {productos.map((p) => { return (<option key={nanoid()} value={p._id}>{`${p.nombre} - ${p.tamano}cm`}</option>) })}

                    </select>
                    <button type="button" onClick={() => { agregarNuevoProducto() }} className="edit_btn add_btn">
                        <span className="material-icons-round">add_circle</span>
                    </button>
                </div>

                <table className="table custom-sales_table">
                    <thead>
                        <tr className="table_row">
                            <th className="texto">Producto</th>
                            <th className="numero">Vr. Unitario ($)</th>
                            <th className="numero">Cantidad</th>
                            <th className="acciones">Quitar</th>
                            <th className="hidden">input</th>
                        </tr>
                    </thead>

                    <tbody>{filasTabla.map((ft, index) => {
                        return (
                            <tr key={nanoid()}>
                                <td className="texto">{`${ft.nombre} - ${ft.tamano}cm`}</td>
                                <td className="numero">{ft.valorUnitario}</td>
                                <td className="numero">
                                    <label htmlFor={`cantidad_${ft.index}`}>
                                    <input className="cantidad_input" type="number" name={`cantidad_${ft.index}`}/>
                                    </label>
                                </td>
                                <td className="acciones">
                                    <button onClick={() => { quitarProducto(ft) }} className="delete_btn"><span className="material-icons delete">remove_circle_outline</span></button>
                                </td>
                                <td className="hidden"><input hidden defaultValue={ft._id} name={`producto_${ft.index}`}/></td>
                            </tr>
                        )
                    })}</tbody>

                </table>

                <div className="register_btn">
                    <button type="reset" className="">Reset</button>
                    <button type="submit" className="">Añadir</button>
                </div>
            </form>
        </div>
    )
}

export default RegistroVentas

{/* <label htmlFor="estadoVenta">Estado</label>
<select name="estadoVenta" id="estadoVenta" className="custom_input">
    <option value="Estado">- Estado -</option>
    <option value="En proceso">En proceso</option>
    <option value="Entregada">Entregada</option>
    <option value="Cancelada">Cancelada</option>
</select> */}

{/* <label htmlFor="fecha">Fecha</label>
<input className="custom_input" type="date" placeholder="Fecha (dd/mm/aaaa)" name="fecha" id="fecha" required /> */}