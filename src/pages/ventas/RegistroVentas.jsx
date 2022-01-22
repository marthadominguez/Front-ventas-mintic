import React, { useRef, useState, useEffect } from "react";
// import { toast } from 'react-toastify';
import {
  obtenerProductosDisponibles,
  obtenerVendedores,
  crearVenta,
} from "utils/api";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import PrivateComponent from "components/PrivateComponent";

const RegistroVentas = () => {
  const form = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [productos, setProductos] = useState([]);

  const [filasTabla, setFilasTabla] = useState([]);
  const [productoAAgregar, setProductoAAgregar] = useState({});
  const [productosTabla, setProductosTabla] = useState([]);

  useEffect(() => {
    const fetchVendedores = async () => {
      await obtenerVendedores(
        (response) => {
          setVendedores(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    const fetchProductos = async () => {
      await obtenerProductosDisponibles(
        (response) => {
          setProductos(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    fetchVendedores();
    fetchProductos();
  }, []);

  useEffect(() => {
    setProductosTabla(filasTabla);
  }, [filasTabla, setProductosTabla]);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    const listaProductos = Object.keys(formData)
      .map((k) => {
        if (k.includes("producto")) {
          return productosTabla.filter((p) => p._id === formData[k])[0];
        }
        return null;
      })
      .filter((p) => p);
    // el anterior filtro me filtra los que no son NULL. Para que no me salgan undefined.

    console.log("productosTabla", productosTabla);

    const datosVenta = {
      cliente: formData.nombreCliente,
      puntoVenta: formData.puntoVenta,
      medioPago: formData.medioPago,
      costoEnvio: parseFloat(formData.costoEnvio),
      vendedor: vendedores.filter((v) => v._id === formData.vendedor)[0],
      productos: listaProductos,
      total: sumaValor,
      fecha: formData.fecha,
      estado: "En proceso",
    };

    await crearVenta(
      datosVenta,
      (response) => {
        console.log("Respuesta", response);
        toast.success("Venta agregada con éxito");
      },
      (error) => {
        console.error("Salió un error y es:", error);
        toast.error("Error creando la venta");
      }
    );
    e.target.reset();
    setFilasTabla([]);
  };

  const agregarNuevoProducto = () => {
    if (productoAAgregar._id === undefined) {
      <></>;
    } else {
      setFilasTabla([...filasTabla, productoAAgregar]);
      setProductos(productos.filter((p) => p._id !== productoAAgregar._id));
      setProductoAAgregar({});
    }
  };

  const modificarProducto = (producto, cantidad) => {
    setFilasTabla(
      filasTabla.map((ft) => {
        if (ft._id === producto._id) {
          ft.cantidad = cantidad;
          ft.total = producto.valorUnitario * cantidad;
        }
        return ft;
      })
    );
  };

  const quitarProducto = (productoAQuitar) => {
    setFilasTabla(filasTabla.filter((ft) => ft._id !== productoAQuitar._id));
    setProductos([...productos, productoAQuitar]);
  };

  let sumaValor = 0;
  filasTabla.forEach((el) => {
    if (el.total > 0) {
      sumaValor += el.total;
    } else {
      return sumaValor;
    }
  });

  return (
    <>
      <div className="custom_record">
        <h2 id="registro_venta">Nuevo registro de Venta</h2>
        <form ref={form} onSubmit={submitForm} className="custom-sales_form">
          <label htmlFor="nombreCliente">Cliente</label>
          <input
            className="custom_input"
            type="text"
            placeholder="Nombre completo del cliente"
            name="nombreCliente"
            id="nombreCliente"
            required
          />
          <label htmlFor="puntoVenta">Medio de contacto</label>
          <select
            name="puntoVenta"
            id="puntoVenta"
            className="custom_input"
            required
            defaultValue=""
          >
            <option value="" disabled>
              - Seleccione el medio de contacto -
            </option>
            <option>Instagram</option>
            <option>Whatsapp</option>
            <option>Otro</option>
          </select>
          <label htmlFor="medioPago">Medio de pago</label>
          <select
            name="medioPago"
            id="medioPago"
            className="custom_input"
            required
            defaultValue=""
          >
            <option value="" disabled>
              - Seleccione el medio de pago -
            </option>
            <option>Bancolombia</option>
            <option>NEQUI</option>
            <option>Gane/Efecty</option>
            <option>PSE</option>
          </select>
          <label htmlFor="costoEnvio">Costo de envío ($)</label>
          <input
            className="custom_input"
            type="number"
            placeholder="Costo de envío en pesos"
            name="costoEnvio"
            id="costoEnvio"
            required
          />

          <label htmlFor="fecha">Fecha de pago</label>
          <input
            className="custom_input"
            type="date"
            placeholder="Fecha"
            name="fecha"
            id="fecha"
            required
          />

          <label htmlFor="vendedor">Vendedor</label>
          <select
            name="vendedor"
            id="vendedor"
            className="custom_input"
            required
            defaultValue=""
          >
            <option value="" disabled>
              - Seleccione el vendedor -
            </option>
            {vendedores.map((v, index) => {
              return <option key={index} value={v._id}>{`${v.email}`}</option>;
            })}
          </select>

          <label htmlFor="producto">Producto</label>
          <div className="select_add-producto">
            <select
              className="custom_input"
              id="producto"
              value={productoAAgregar._id ?? ""}
              onChange={(e) =>
                setProductoAAgregar(
                  productos.filter((p) => p._id === e.target.value)[0]
                )
              }
            >
              <option disabled value="">
                - Seleccione el producto -
              </option>
              {productos.map((p) => {
                return (
                  <option
                    key={nanoid()}
                    value={p._id}
                  >{`${p.nombre} - ${p.tamano}cm`}</option>
                );
              })}
            </select>
            <button
              type="button"
              onClick={() => {
                agregarNuevoProducto();
              }}
              className="edit_btn add_btn"
            >
              <span className="material-icons-round">add_circle</span>
            </button>
          </div>

          <table className="table custom-sales_table">
            <thead>
              <tr className="table_row">
                <th className="texto">Producto</th>
                <th className="numero">Vr. Unitario ($)</th>
                <th className="numero">Cantidad</th>
                <th className="numero">Vr. Total ($)</th>
                <th className="acciones">Quitar</th>
                <th className="hidden">input</th>
              </tr>
            </thead>

            <tbody>
              {filasTabla.map((ft, index) => {
                return (
                  <FilaProducto
                    key={ft._id}
                    ft={ft}
                    index={index}
                    quitarProducto={quitarProducto}
                    modificarProducto={modificarProducto}
                  ></FilaProducto>
                );
              })}
            </tbody>
          </table>

          <span>Valor total:</span>

          <b>
            <span>$ {sumaValor.toLocaleString("es-CO")}</span>
          </b>

          <div className="register_btn">
            <button type="reset" className="">
              Reset
            </button>
            <button type="submit" className="">
              Añadir
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const FilaProducto = ({ ft, index, modificarProducto, quitarProducto }) => {
  const [producto, setProducto] = useState(ft);

  return (
    <tr>
      <td className="texto">{`${producto.nombre} - ${producto.tamano}cm`}</td>
      <td className="numero">
        {producto.valorUnitario.toLocaleString("es-CO")}
      </td>
      <td className="numero">
        <label htmlFor={`cantidad_${index}`}>
          <input
            className="cantidad_input"
            type="number"
            name={`cantidad_${index}`}
            value={producto.cantidad}
            min="1"
            max="50"
            onChange={(e) => {
              modificarProducto(
                producto,
                parseFloat(e.target.value === "" ? "0" : e.target.value)
              );
              setProducto({
                ...producto,
                cantidad: e.target.value,
                total:
                  producto.valorUnitario * e.target.value === ""
                    ? "0"
                    : e.target.value,
              });
            }}
          />
        </label>
      </td>
      <td className="numero">
        {parseFloat(producto.total ?? 0).toLocaleString("es-CO")}
      </td>
      <td className="acciones">
        <button
          onClick={() => {
            quitarProducto(producto);
          }}
          className="delete_btn"
        >
          <span className="material-icons delete">remove_circle_outline</span>
        </button>
      </td>
      <td className="hidden">
        <input hidden defaultValue={producto._id} name={`producto_${index}`} />
      </td>
    </tr>
  );
};

export default RegistroVentas;
