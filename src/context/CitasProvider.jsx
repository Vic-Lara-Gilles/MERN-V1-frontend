import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';

const CitasContext = createContext();

export const CitasProvider = ({ children }) => {
  const [citas, setCitas] = useState([]);
  const [cita, setCita] = useState({});
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    obtenerCitas();
  }, []);

  const obtenerCitas = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clienteAxios.get('/citas', config);
      setCitas(data);
    } catch (error) {
      console.log(error);
      setCitas([]);
    } finally {
      setCargando(false);
    }
  };

  const obtenerCita = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clienteAxios.get(`/citas/${id}`, config);
      setCita(data);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response?.data?.msg || 'Error al obtener la cita',
        error: true
      });
    } finally {
      setCargando(false);
    }
  };

  const guardarCita = async (citaData, id = null) => {
    console.log('=== DEBUG guardarCita ===');
    console.log('citaData recibida:', citaData);
    console.log('id:', id);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('ERROR: No hay token');
        return false;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      let response;
      if (id) {
        // Editar cita existente
        console.log('Editando cita:', id);
        response = await clienteAxios.put(`/citas/${id}`, citaData, config);
        console.log('Respuesta PUT:', response.data);
        setAlerta({
          msg: 'Cita actualizada correctamente',
          error: false
        });
      } else {
        // Crear nueva cita
        console.log('Creando nueva cita');
        console.log('URL:', clienteAxios.defaults.baseURL + '/citas');
        response = await clienteAxios.post('/citas', citaData, config);
        console.log('Respuesta POST:', response.data);
        setAlerta({
          msg: 'Cita agendada correctamente',
          error: false
        });
      }

      console.log('=== FIN DEBUG guardarCita ===');

      // Actualizar lista de citas
      await obtenerCitas();

      // Limpiar alerta después de 3 segundos
      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return true;
    } catch (error) {
      console.log('ERROR en guardarCita:', error);
      console.log('Error response:', error.response);
      console.log('Error data:', error.response?.data);
      console.log('=== FIN DEBUG guardarCita ===');
      
      setAlerta({
        msg: error.response?.data?.msg || error.response?.data?.error || 'Error al guardar la cita',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return false;
    }
  };

  const eliminarCita = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar esta cita?');
    if (!confirmar) return;

    try {
      const token = localStorage.getItem('apv_token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      await clienteAxios.delete(`/citas/${id}`, config);

      // Actualizar estado eliminando la cita
      const citasActualizadas = citas.filter(cita => cita._id !== id);
      setCitas(citasActualizadas);

      setAlerta({
        msg: 'Cita eliminada correctamente',
        error: false
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response?.data?.msg || 'Error al eliminar la cita',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  };

  const cambiarEstadoCita = async (id, nuevoEstado) => {
    try {
      const token = localStorage.getItem('apv_token');
      if (!token) return false;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      await clienteAxios.patch(`/citas/${id}/estado`, { estado: nuevoEstado }, config);

      // Actualizar estado local
      const citasActualizadas = citas.map(cita => 
        cita._id === id ? { ...cita, estado: nuevoEstado } : cita
      );
      setCitas(citasActualizadas);

      setAlerta({
        msg: 'Estado de la cita actualizado',
        error: false
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return true;
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response?.data?.msg || 'Error al cambiar el estado',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return false;
    }
  };

  const obtenerCitasPorFecha = (fecha) => {
    return citas.filter(cita => {
      const citaFecha = new Date(cita.fecha).toLocaleDateString('es-CL');
      const fechaBuscada = new Date(fecha).toLocaleDateString('es-CL');
      return citaFecha === fechaBuscada;
    });
  };

  const obtenerCitasVeterinario = (veterinarioId) => {
    return citas.filter(cita => cita.veterinario?._id === veterinarioId);
  };

  return (
    <CitasContext.Provider
      value={{
        citas,
        cita,
        cargando,
        alerta,
        obtenerCitas,
        obtenerCita,
        guardarCita,
        eliminarCita,
        cambiarEstadoCita,
        obtenerCitasPorFecha,
        obtenerCitasVeterinario,
        setCita
      }}
    >
      {children}
    </CitasContext.Provider>
  );
};

export default CitasContext;
