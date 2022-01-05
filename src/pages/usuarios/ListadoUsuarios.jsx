import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { obtenerUsuarios } from "utils/api";

const ListadoUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            await obtenerUsuarios(
                (response) => { setUsuarios(response.data) },
                (error) => { console.error(error) }
            );
            fetchUsuarios();
        }
    }, []);

    return (
        <>
            <div className="table_container">
                <div className="table_header">
                    <h2 >Gestión de Usuarios</h2>
                    {/* <div className="search_input">
                        <input value={busqueda} onChange={(e) => { setBusqueda(e.target.value) }} className="search_text" type="search" placeholder="Buscar..." />
                        <select name="" id="">
                            <option value="Criterio">- Criterio -</option>
                            <option value="ID">ID Venta</option>
                            <option value="Documento">Documento</option>
                            <option value="Cliente">Cliente</option>
                        </select>
                        <button className="search_btn"><span className="material-icons-round search_icon">search</span></button>
                    </div> */}
                </div>
                <div className="table_canvas">
                    <table className="table">
                        <thead>
                            <tr className="table_row">
                                <th className="texto">Nombre</th>
                                <th className="texto">E-mail</th>
                                <th className="texto">Rol</th>
                                <th className="texto">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((u) => {
                                return (
                                    <tr key={nanoid()}>
                                        <td>{u.nombre}</td>
                                        <td>{u.nombre}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}

export default ListadoUsuarios;