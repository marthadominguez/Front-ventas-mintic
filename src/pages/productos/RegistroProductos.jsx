
const RegistroProductos = () => {
    return (
        <div>
            <div class="sales_record">
                <h2 id="registro_producto">Nuevo registro de Producto</h2>
                <form class="sales_form">
                    <label for="">ID Producto</label>
                    <input class="sales_input" type="text" placeholder="Identificación del producto" name="" id="" required />  
                    
                    <label for="">Descripción</label>
                    <textarea class="sales_input" name="" id="" required></textarea>
                    
                    <label for="">Valor Unitario</label>
                    <input class="sales_input" type="number" placeholder="Valor unitario" name="" id="" required />  
                    
                    <label for="estado">Estado</label>
                    <select name="estado" id="estado" class="sales_input">
                        <option value="Estado">- Estado -</option>
                        <option value="En proceso">Disponible</option>
                        <option value="Entregada">No disponible</option>
                    </select> 
                    <div class="register_btn">
                    <button type="reset" class="">Reset</button>
                    <button type="submit" class="">Añadir</button>
                </div>
                </form>        
            </div>        
        </div>
    )
}

export default RegistroProductos
