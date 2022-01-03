

const RegistroVentas = () => {
    return (
        <div className="custom_record">
            <h2 id="registro_venta">Nuevo registro de Venta</h2>
            <form className="sales_form">        
                <label htmlFor="identificacion">ID</label>
                <input className="custom_input" type="text" placeholder="Identificación de venta" name="identificacion" id="identificacion" required />  
                
                <label htmlFor="valor">Vr. Total</label>
                <input className="custom_input" type="number" placeholder="Valor total en pesos" name="valor" id="valor" required />
                
                <label htmlFor="identificacion">ID Producto</label>
                <input className="custom_input" type="text" placeholder="Identificación producto" name="identificacion" id="identificacion" required />  
                
                <label htmlFor="cantidad">Cantidad</label>
                <input className="custom_input" type="number" placeholder="Cantidad" name="cantidad" id="cantidad" required />
                
                <label htmlFor="precio">Precio Unit.</label>
                <input className="custom_input" type="number" placeholder="Precio unitario" name="precio" id="precio" required /> 
                
                <label htmlFor="fecha">Fecha</label>
                <input className="custom_input" type="date" placeholder="Fecha (dd/mm/aaaa)" name="fecha" id="fecha" required />
                
                <label htmlFor="documento">Documento</label>
                <input className="custom_input" type="text" placeholder="Documento de identidad" name="documento" id="documento" required />  
            
                <label htmlFor="cliente">Nombre Cliente</label>
                <input className="custom_input" type="text" placeholder="Nombre completo" name="cliente" id="cliente" required />
                
                <label htmlFor="vendedor">Vendedor</label>
                <input className="custom_input" type="text" placeholder="Responsable" name="vendedor" id="vendedor" required />
                
                <label htmlFor="estado">Estado</label> 
                <select name="estado" id="estado" className="custom_input">
                    <option value="Estado">- Estado -</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Entregada">Entregada</option>
                    <option value="Cancelada">Cancelada</option>
                </select>
                <div className="register_btn">
                    <button type="reset" className="">Reset</button>
                    <button type="submit" className="">Añadir</button>
                </div>
            </form>
        </div>    
    )
}

export default RegistroVentas