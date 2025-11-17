import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const ConsultasContext = createContext();

const ConsultasProvider = ({ children }) => {
  const [consultas, setConsultas] = useState([]);
  const [consulta, setConsulta] = useState({});
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState({});

  const { auth } = useAuth();

  useEffect(() => {
    const obtenerConsultasInicial = async () => {
      if (auth?._id) {
        await obtenerConsultas();
      }
    };
    obtenerConsultasInicial();
  }, [auth]);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const obtenerConsultas = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios('/consultas', config);
      setConsultas(data);
    } catch (error) {
      console.log(error);
      mostrarAlerta({
        msg: error.response?.data?.msg || 'Error al obtener consultas',
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const obtenerConsulta = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/consultas/${id}`, config);
      setConsulta(data);
      return data;
    } catch (error) {
      console.log(error);
      mostrarAlerta({
        msg: error.response?.data?.msg || 'Error al obtener consulta',
        error: true,
      });
      return null;
    } finally {
      setCargando(false);
    }
  };

  const obtenerConsultasPaciente = async (pacienteId) => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return [];

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/consultas/paciente/${pacienteId}`, config);
      return data;
    } catch (error) {
      console.log(error);
      mostrarAlerta({
        msg: error.response?.data?.msg || 'Error al obtener consultas del paciente',
        error: true,
      });
      return [];
    } finally {
      setCargando(false);
    }
  };

  const guardarConsulta = async (consultaData, id = null) => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      if (id) {
        // Editar consulta existente
        const { data } = await clienteAxios.put(`/consultas/${id}`, consultaData, config);
        
        // Actualizar en el state
        setConsultas(consultas.map((c) => (c._id === id ? data : c)));
        
        mostrarAlerta({
          msg: 'Consulta actualizada correctamente',
          error: false,
        });
      } else {
        // Crear nueva consulta
        const { data } = await clienteAxios.post('/consultas', consultaData, config);
        
        // Agregar al state
        setConsultas([data, ...consultas]);
        
        mostrarAlerta({
          msg: 'Consulta registrada correctamente',
          error: false,
        });
      }

      return true;
    } catch (error) {
      console.log(error);
      mostrarAlerta({
        msg: error.response?.data?.msg || 'Error al guardar consulta',
        error: true,
      });
      return false;
    } finally {
      setCargando(false);
    }
  };

  const eliminarConsulta = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta consulta? Esta acción no se puede deshacer.')) {
      return false;
    }

    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.delete(`/consultas/${id}`, config);

      // Actualizar el state
      setConsultas(consultas.filter((c) => c._id !== id));

      mostrarAlerta({
        msg: 'Consulta eliminada correctamente',
        error: false,
      });

      return true;
    } catch (error) {
      console.log(error);
      mostrarAlerta({
        msg: error.response?.data?.msg || 'Error al eliminar consulta',
        error: true,
      });
      return false;
    } finally {
      setCargando(false);
    }
  };

  const obtenerConsultasPorFecha = (fecha) => {
    return consultas.filter((consulta) => {
      const fechaConsulta = new Date(consulta.fecha).toISOString().split('T')[0];
      return fechaConsulta === fecha;
    });
  };

  const obtenerConsultasVeterinario = (veterinarioId) => {
    return consultas.filter(
      (consulta) => consulta.veterinario?._id === veterinarioId
    );
  };

  const obtenerEstadisticas = () => {
    const total = consultas.length;
    const enTratamiento = consultas.filter((c) => c.estado === 'en-tratamiento').length;
    const completadas = consultas.filter((c) => c.estado === 'completada').length;
    const hoy = consultas.filter((c) => {
      const fechaConsulta = new Date(c.fecha).toISOString().split('T')[0];
      const fechaHoy = new Date().toISOString().split('T')[0];
      return fechaConsulta === fechaHoy;
    }).length;

    return {
      total,
      enTratamiento,
      completadas,
      hoy,
    };
  };

  return (
    <ConsultasContext.Provider
      value={{
        consultas,
        consulta,
        cargando,
        alerta,
        obtenerConsultas,
        obtenerConsulta,
        obtenerConsultasPaciente,
        guardarConsulta,
        eliminarConsulta,
        obtenerConsultasPorFecha,
        obtenerConsultasVeterinario,
        obtenerEstadisticas,
        setConsulta,
      }}
    >
      {children}
    </ConsultasContext.Provider>
  );
};

export { ConsultasProvider };

export default ConsultasContext;
