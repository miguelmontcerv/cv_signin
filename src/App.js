//Signin.js
import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/logo_sin_fondo.png';

function App() {
  const [formData, setFormData] = useState({
    tipoCultivo: '',
    tipoPlanta: '',
    tipoFruto: '',
    quimicos_abono: true,
    quimicos_fertilizante: true,
    extensionTerritorial: 0,
    zonaCultivo: '',
    humedadTierra: 0,
    temperaturaPromedio: 0,
    precipitacionZona: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // Si es un campo de tipo checkbox, convierte el valor a booleano
    const fieldValue = type === 'checkbox' ? checked : value;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realiza la petición a la API
    fetch('https://cloudvitals.azurewebsites.net/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la petición: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // La respuesta de la API estará en la variable "data"
      console.log(data);
      // Mostrar la notificación con el id_zona
      toast.success(`Registro exitoso. ID de zona: ${data.id_zona}`);
    })
    .catch(error => {
      console.error('Error en la petición:', error);
    });
  };
  

  return (
    <div className="App">
      <img src={logo} alt="Logo" className="logo" />
      <form onSubmit={handleSubmit}>
        <label>
          Tipo de Cultivo:
          <input
            type="text"
            name="tipoCultivo"
            value={formData.tipoCultivo}
            onChange={handleChange}
          />
        </label>
        <label>
          Tipo de Planta:
          <input
            type="text"
            name="tipoPlanta"
            value={formData.tipoPlanta}
            onChange={handleChange}
          />
        </label>
        <label>
          Tipo de Fruto:
          <input
            type="text"
            name="tipoFruto"
            value={formData.tipoFruto}
            onChange={handleChange}
          />
        </label>
        <label>
          Químicos de Abono:
          <input
            type="checkbox"
            name="quimicos_abono"
            checked={formData.quimicos_abono}
            onChange={handleChange}
          />
        </label>
        <label>
          Químicos de Fertilizante:
          <input
            type="checkbox"
            name="quimicos_fertilizante"
            checked={formData.quimicos_fertilizante}
            onChange={handleChange}
          />
        </label>
        <label>
          Extensión Territorial:
          <input
            type="number"
            name="extensionTerritorial"
            value={formData.extensionTerritorial}
            onChange={handleChange}
          />
        </label>
        <label>
          Zona de Cultivo:
          <input
            type="text"
            name="zonaCultivo"
            value={formData.zonaCultivo}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Registrar</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default App;