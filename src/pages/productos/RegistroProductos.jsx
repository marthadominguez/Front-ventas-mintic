import React, { useRef } from "react"
import { toast } from 'react-toastify';
import { crearProducto } from "utils/api";

const RegistroProductos = () => {

    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        const nuevoProducto = {};
        fd.forEach((value, key) => {
            nuevoProducto[key] = value;
        });

        await crearProducto(
            {
                nombre: nuevoProducto.nombre,
                descripcion: nuevoProducto.descripcion,
                estado: nuevoProducto.estado,
                tamano: nuevoProducto.tamano,
                valorUnitario: nuevoProducto.valorUnitario,
            },
            (response) => {
                console.log(response.data);
                toast.success("Producto registrado con éxito")
            },
            (error) => {
                console.error(error);
                toast.error("Error registrando el producto")
            }
        )
        e.target.reset();
    }

    return (
        <div>
            <div className="custom_record">
                <h2 id="registro_producto">Nuevo registro de Producto</h2>

                <form className="custom_form" ref={form} onSubmit={submitForm}>
                    <label htmlFor="nombre">Nombre</label>
                    <input className="custom_input" type="text" placeholder="Nombre del producto" name="nombre" id="nombre" required />

                    <label htmlFor="descripcion">Descripción</label>
                    <textarea className="custom_input textarea" name="descripcion" id="descripcion" required></textarea>

                    <label htmlFor="estado">Estado</label>
                    <select name="estado" className="custom_input" required defaultValue={0}>
                        <option disabled value={0}>Selecciona un estado</option>
                        <option >Disponible</option>
                        <option >No disponible</option>
                    </select>

                    <label htmlFor="tamano">Tamaño (cm)</label>
                    <input className="custom_input" type="number" placeholder="Ingresa el tamaño en cm" name="tamano" id="tamano" required />

                    <label htmlFor="valorUnitario">Vr. Unitario ($)</label>
                    <input className="custom_input" type="number" placeholder="Ingresa el valor en pesos" name="valorUnitario" id="valorUnitario" required />

                    <div className="register_btn">
                        <button type="reset" className="">Reset</button>
                        <button type="submit" className="">Añadir</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default RegistroProductos
