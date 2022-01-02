
const RegistroProductos = () => {
    return (
        <div>
            <div className="sales_record">
                <h2 id="registro_producto">Nuevo registro de Producto</h2>
                <form className="sales_form">
                    <label htmlFor="">ID Producto</label>
                    <input className="sales_input" type="text" placeholder="Identificación del producto" name="" id="" required />  
                    
                    <label htmlFor="">Descripción</label>
                    <textarea className="sales_input" name="" id="" required></textarea>
                    
                    <label htmlFor="">Valor Unitario</label>
                    <input className="sales_input" type="number" placeholder="Valor unitario" name="" id="" required />  
                    
                    <label htmlFor="estado">Estado</label>
                    <select name="estado" id="estado" className="sales_input">
                        <option value="Estado">- Estado -</option>
                        <option value="En proceso">Disponible</option>
                        <option value="Entregada">No disponible</option>
                    </select> 
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
