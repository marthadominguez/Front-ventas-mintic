// url: url del servidor donde está la api. 
import axios from "axios";

const baseURL = "http://localhost:5000"

export const obtenerProductos = async (successCallback, errorCallback) => {
    // const options = { method: 'GET', url: `${baseURL}/productos/` };
    const options = {
        method: 'GET',
        url: `${baseURL}/productos/`,
        params: {'': ''},
        headers: {'Content-Type': 'application/json'}
      };
    await axios.request(options).then(successCallback).catch(errorCallback);
    // await axios.request(options).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });
}

export const crearProducto = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: `${baseURL}/productos/`,
    headers: {'Content-Type': 'application/json'},
    data
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
}

// export const editarProducto = async (successCallback, errorCallback) => {
// }

// export const eliminarProducto = async(successCallback, errorCallback) => {
// }
