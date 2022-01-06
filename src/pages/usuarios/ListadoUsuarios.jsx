import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { obtenerUsuarios, editarUsuario } from "utils/api";

const ListadoUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [usuariosFiltrados, setUsuariosFiltrados] = useState(usuarios)

    useEffect(() => {
        const fetchUsuarios = async () => {
            await obtenerUsuarios(
                (response) => { setUsuarios(response.data) },
                (error) => { console.error(error) }
            );

        };
        fetchUsuarios();
    }, []);

    useEffect(() => {
        setUsuariosFiltrados(
            usuarios.filter((elemento) => {
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
            })
        )
    }, [busqueda, usuarios])

    return (
        <>
            <div className="table_container">
                <div className="table_header">
                    <h2 >Gestión de Usuarios</h2>
                    <div className="search_input">
                        <input value={busqueda} onChange={(e) => { setBusqueda(e.target.value) }} className="search_text" type="search" placeholder="Buscar..." />
                        <span className="material-icons-round search_icon">search</span>
                    </div>
                </div>
                <div className="table_canvas">
                    <table className="table">
                        <thead>
                            <tr className="table_row">
                                <th className="texto">Nombre</th>
                                <th className="texto">E-mail</th>
                                <th className="texto">Usuario</th>
                                <th className="acciones">Rol</th>
                                <th className="acciones">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.map((u) => {
                                return (
                                    <tr key={nanoid()}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.nickname}</td>
                                        <td className="acciones"><RolesUsuario user={u}></RolesUsuario></td>
                                        <td className="acciones"><EstadoUsuario user={u}></EstadoUsuario></td>
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

const RolesUsuario = ({ user }) => {
    const [rol, setRol] = useState(user.rol)
    useEffect(() => {
        const EditUsuario = async () => {
            await editarUsuario(user._id, { rol }, (response) => { console.log(response.data) }, (error) => { console.error(error) })
        }
        if (user.rol !== rol) {
            EditUsuario()
        }
    }
        , [rol])
    return (
        <select className="custom_input_users" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="" disabled>
                Seleccione un rol
            </option>
            <option value='admin'>Admin</option>
            <option value='vendedor'>Vendedor</option>
            <option value='sin rol'>No asignado</option>
        </select>
    )
}

const EstadoUsuario = ({ user }) => {
    const [estado, setEstado] = useState(user.estado)
    useEffect(() => {
        const EditUsuario = async () => {
            await editarUsuario(user._id, { estado }, (response) => { console.log(response.data) }, (error) => { console.error(error) })
        }
        if (user.estado !== estado) {
            EditUsuario()
        }
    }
        , [estado])
    return (
        <select className="custom_input_users" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="" disabled>
                Seleccione un estado
            </option>
            <option value='Pendiente'>Pendiente</option>
            <option value='Autorizado'>Autorizado</option>
            <option value='No autorizado'>No autorizado</option>
        </select>
    )
}

export default ListadoUsuarios;