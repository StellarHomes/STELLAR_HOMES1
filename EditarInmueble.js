import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const EditarInmueble = () => {
  const location = useLocation();
  const inmueble = location.state?.inmueble;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idInmueble: '',
    Nombre: '',
    Descripcion: '',
    localidad: '',
    precio: '',
    FechaPubli: '',
    ImagenUrl: '',
    estado_id_estado: '',
    tipo_idtipo: '',
    transaccion_idtransaccion: '',
    imagen: null,
    imagenActual: '', 
  });

  const [estados, setEstados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    if (inmueble) {
      setFormData({
        idInmueble: inmueble.idInmueble,
        Nombre: inmueble.Nombre || '',
        Descripcion: inmueble.Descripcion || '',
        localidad: inmueble.localidad || '',
        precio: inmueble.precio || '',
        FechaPubli: inmueble.FechaPubli || '',
        ImagenUrl: inmueble.ImagenUrl || '',
        estado_id_estado: inmueble.estado_id_estado || '',
        tipo_idtipo: inmueble.tipo_idtipo || '',
        transaccion_idtransaccion: inmueble.transaccion_idtransaccion || '',
        imagenActual: inmueble.ImagenUrl || '', 
      });
    }
  }, [inmueble]);

  useEffect(() => {
    fetch('http://localhost/API/estados.php')
      .then((response) => response.json())
      .then((data) => setEstados(data))
      .catch((error) => console.error('Error al cargar los estados de los inmuebles:', error));

    fetch('http://localhost/API/tipos.php')
      .then((response) => response.json())
      .then((data) => setTipos(data))
      .catch((error) => console.error('Error al cargar los tipos de inmuebles:', error));

    fetch('http://localhost/API/Variantes.php')
      .then((response) => response.json())
      .then((data) => setTransacciones(data))
      .catch((error) => console.error('Error al cargar las transacciones de los inmuebles:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      imagen: e.target.files[0], // Asigna la nueva imagen
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.Nombre || !formData.Descripcion || !formData.localidad || !formData.precio || !formData.FechaPubli) {
      Swal.fire('Error', 'Por favor completa todos los campos.', 'error');
      return;
    }

    try {
      const updatedData = new FormData();
      Object.keys(formData).forEach((key) => {
        updatedData.append(key, formData[key]); // Agregar todos los datos al FormData
      });

      // Si no se ha seleccionado una nueva imagen, enviamos la imagen actual
      if (!formData.imagen) {
        updatedData.append('imagenActual', formData.imagenActual); // Pasamos la imagen actual
      }

      const response = await axios.post('http://localhost/API/updateInmueble.php', updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        Swal.fire('Éxito', 'El inmueble ha sido actualizado correctamente.', 'success');
        navigate('/inmuebles');
      } else {
        Swal.fire('Error', 'Hubo un problema al actualizar el inmueble.', 'error');
      }
    } catch (error) {
      console.error('Error al actualizar el inmueble:', error);
      Swal.fire('Error', 'Ocurrió un error al intentar actualizar el inmueble.', 'error');
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <h1 className="title">Editar Inmueble</h1>
        <button onClick={() => navigate('/inmuebles')} className="button">Volver</button>
      </header>

      {/* Formulario */}
      <div className="containerpub">
        <div className="form-container">
          <h2 className="title is-4">Editar Inmueble</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Nombre">Nombre del Inmueble:</label>
              <input
                type="text"
                id="Nombre"
                name="Nombre"
                className="input"
                value={formData.Nombre}
                onChange={handleChange}
                placeholder="Ingrese el Nombre del Inmueble"
              />
            </div>

            {/* Imagen actual */}
            <div className="form-group">
              <label htmlFor="imagen">Imagen Actual:</label>
              <div className="control">
                {formData.ImagenUrl ? (
                  <img
                    src={formData.ImagenUrl} // Usamos la URL que viene del backend
                    alt="Imagen del Inmueble"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                ) : (
                  <p>No hay imagen disponible.</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="imagen">Actualizar Imagen:</label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                className="input"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Descripcion">Descripción del Inmueble:</label>
              <input
                type="text"
                id="Descripcion"
                name="Descripcion"
                className="input"
                value={formData.Descripcion}
                onChange={handleChange}
                placeholder="Descripción del inmueble"
              />
            </div>

            <div className="form-group">
              <label htmlFor="localidad">Localidad:</label>
              <input
                type="text"
                id="localidad"
                name="localidad"
                className="input"
                value={formData.localidad}
                onChange={handleChange}
                placeholder="Ingrese la localidad"
              />
            </div>

            <div className="form-group">
              <label htmlFor="precio">Precio:</label>
              <input
                type="number"
                id="precio"
                name="precio"
                className="input"
                value={formData.precio}
                onChange={handleChange}
                placeholder="Ingrese el precio"
              />
            </div>

            <div className="form-group">
              <label htmlFor="FechaPubli">Fecha de Publicación:</label>
              <input
                type="date"
                id="FechaPubli"
                name="FechaPubli"
                className="input"
                value={formData.FechaPubli}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="transaccion_idtransaccion">Transacción:</label>
              <div className="select">
                <select
                  id="transaccion_idtransaccion"
                  name="transaccion_idtransaccion"
                  value={formData.transaccion_idtransaccion}
                  onChange={handleChange}
                >
                  <option value="">Seleccione una transacción</option>
                  {transacciones.map((transaccion) => (
                    <option key={transaccion.idtransaccion} value={transaccion.idtransaccion}>
                      {transaccion.descripcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tipo_idtipo">Tipo de Inmueble:</label>
              <div className="select">
                <select
                  id="tipo_idtipo"
                  name="tipo_idtipo"
                  value={formData.tipo_idtipo}
                  onChange={handleChange}
                >
                  <option value="">Seleccione el tipo de inmueble</option>
                  {tipos.map((tipo) => (
                    <option key={tipo.idtipo} value={tipo.idtipo}>
                      {tipo.descripcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="estado_id_estado">Estado del Inmueble:</label>
              <div className="select">
                <select
                  id="estado_id_estado"
                  name="estado_id_estado"
                  value={formData.estado_id_estado}
                  onChange={handleChange}
                >
                  <option value="">Seleccione el estado</option>
                  {estados.map((estado) => (
                    <option key={estado.id_estado} value={estado.id_estado}>
                      {estado.descripcion}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="button is-primary">Actualizar Inmueble</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarInmueble;
