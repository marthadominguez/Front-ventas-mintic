// url: url del servidor donde está la api. 
import axios from "axios";

const baseURL = "http://localhost:5000"

// guardar el token en el localstorage. En todos los headers debemos poner la autorización
const getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
};

// CRUD DE PRODUCTOS
export const obtenerProductos = async (successCallback, errorCallback) => {
    const options = {
        method: 'GET',
        url: `${baseURL}/productos/`,
        params: {'': ''},
        headers: {'Content-Type': 'application/json', 'Authorization': getToken()}
      };
    await axios.request(options).then(successCallback).catch(errorCallback);
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

export const editarProducto = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: `${baseURL}/productos/${id}`,
    headers: {'Content-Type': 'application/json'},
    data
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
}

export const eliminarProducto = async (id, successCallback, errorCallback) => {
  const options = {method: 'DELETE', url: `${baseURL}/productos/${id}`};
  await axios.request(options).then(successCallback).catch(errorCallback);
}

// CRUD DE VENTAS
export const crearVenta = async (data, successCallback, errorCallback) => {
  const options = {method: 'POST', url: `${baseURL}/ventas`, data};
  await axios.request(options).then(successCallback).catch(errorCallback);
}

// CRUD DE USUARIOS
export const obtenerUsuarios = async (successCallback, errorCallback) => {
  const options = {method: 'GET', url: `${baseURL}/usuarios/`};
  await axios.request(options).then(successCallback).catch(errorCallback);
}

// Usado para guardar la info de auth0
export const obtenerDatosUsuario = async (successCallback, errorCallback) => {
 const options = {
    method: 'GET',
    url: `${baseURL}/usuarios/self/`,
    headers: {
      Authorization: getToken(), // 3. Aquí le enviamos el token al back
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
}; 

export const editarUsuario = async () => {
  
}
