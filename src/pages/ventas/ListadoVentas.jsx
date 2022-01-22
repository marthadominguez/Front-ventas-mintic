import React, { useEffect, useState } from "react";
import { eliminarVenta, obtenerVentas, editarVenta } from "../../utils/api";
import { toast } from "react-toastify";
import { Dialog } from "@mui/material";
import { nanoid } from "nanoid";

const ListadoVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [ventasFiltradas, setVentasFiltradas] = useState(ventas);

  useEffect(() => {
    const fetchVentas = async () => {
      await obtenerVentas(
        (response) => {
          console.log("ventas:", response);
          setVentas(response.data);
          setRefetch(false);
        },
        (error) => {
          console.error("Salió un error y es:", error);
        }
      );
    };
    if (refetch) {
      fetchVentas();
    }
  }, [refetch]);

  useEffect(() => {
    setVentasFiltradas(
      ventas.filter((elemento) => {
        return JSON.stringify(elemento)
          .toLowerCase()
          .includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, ventas]);

  return (
        <>
          <div className="table_container">
            <div className="table_header">
              <h2>Gestión de Ventas</h2>
              <div className="search_input">
                <input
                  value={busqueda}
                  onChange={(e) => {
                    setBusqueda(e.target.value);
                  }}
                  className="search_text"
                  type="search"
                  placeholder="Buscar..."
                />
                <span className="material-icons-round search_icon">search</span>
              </div>
            </div>
            <div className="table_canvas">
              <table className="table">
                <thead>
                  <tr className="table_row">
                    <th className="texto tl">ID</th>
                    <th className="texto">Nombre Cliente</th>
                    <th className="texto">Medio de Pago</th>
                    <th className="texto">Contacto</th>
                    <th className="texto">Fecha</th>
                    <th className="texto">Vendedor</th>
                    <th className="texto">Producto</th>
                    <th>Cant.</th>
                    <th className="numero">Vr. Total ($)</th>
                    <th className="numero">Costo Envío ($)</th>
                    <th className="texto">Estado</th>
                    <th className="tr"></th>
                  </tr>
                </thead>
                <tbody>
                  {ventasFiltradas.map((venta) => {
                    return (
                      <FilasVentas
                        venta={venta}
                        key={nanoid()}
                        setRefetch={setRefetch}
                      ></FilasVentas>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
  );
};

const FilasVentas = ({ venta, setRefetch }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const eliminacionVenta = async () => {
    await eliminarVenta(
      venta._id,
      (response) => {
        console.log(response.data);
        toast.success("venta eliminada con éxito");
        setRefetch(true);
      },
      (error) => {
        console.error(error);
        toast.error("Error eliminando la venta");
      }
    );
    setOpenDialog(false);
  };

  return (
    <tr>
      <td className="texto tl">{venta._id.slice(18)}</td>
      <td className="texto">{venta.cliente}</td>
      <td className="texto">{venta.medioPago}</td>
      <td className="texto">{venta.puntoVenta}</td>
      <td className="texto">{venta.fecha}</td>
      <td className="texto">{venta.vendedor.email}</td>
      <td>
        <table className="data_nested--left">
          {venta.productos.map((p) => {
            return (
              <tr key={p._id}>
                <td>{p.nombre}</td>
              </tr>
            );
          })}
        </table>
      </td>
      <td>
        <table className="data_nested--center">
          <tbody>
            {venta.productos.map((p) => {
              return (
                <tr key={p._id}>
                  <td className="q_nested">{p.cantidad}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </td>
      <td className="numero">{venta.total.toLocaleString("es-CO")}</td>
      <td className="numero">{venta.costoEnvio.toLocaleString("es-CO")}</td>
      <td className="texto">
        <EstadoVentas venta={venta}></EstadoVentas>
      </td>
      <td>
        <button
          onClick={() => {
            setOpenDialog(true);
          }}
          className="delete_btn"
        >
          <span className="material-icons delete">delete</span>
        </button>
      </td>
      <Dialog open={openDialog}>
        <div className="dialog_eliminar_prod">
          <h1>¿Está seguro que quiere eliminar la venta?</h1>
          <button
            className="yes"
            title="Editar"
            onClick={() => eliminacionVenta()}
          >
            SI
          </button>
          <button
            className="no"
            title="Eliminar"
            onClick={() => setOpenDialog(false)}
          >
            NO
          </button>
        </div>
      </Dialog>
    </tr>
  );
};

const EstadoVentas = ({ venta }) => {
  const [estado, setEstado] = useState(venta.estado);

  useEffect(() => {
    const EditEstadoVenta = async () => {
      await editarVenta(
        venta._id,
        { estado },
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    if (venta.estado !== estado) {
      EditEstadoVenta();
    }
  }, [estado, venta]);
  return (
    <select
      className="custom_input_ventas"
      value={estado}
      onChange={(e) => setEstado(e.target.value)}
    >
      <option value="" disabled>
        Seleccione
      </option>
      <option value="Proceso">Proceso</option>
      <option value="Entregada">Entregada</option>
      <option value="Cancelada">Cancelada</option>
    </select>
  );
};

export default ListadoVentas;
