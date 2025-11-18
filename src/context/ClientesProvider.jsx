import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(false);
    const [alerta, setAlerta] = useState({});

    const obtenerClientes = async () => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios('/clientes', config);
            setClientes(data);
        } catch (error) {
            console.log(error);
        }
        setCargando(false);
    };

    useEffect(() => {
        obtenerClientes();
    }, []);

    const guardarCliente = async (clienteData, id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        if (id) {
            try {
                const { data } = await clienteAxios.put(`/clientes/${id}`, clienteData, config);
                
                const clientesActualizado = clientes.map(clienteState => 
                    clienteState._id === data._id ? data : clienteState
                );
                setClientes(clientesActualizado);

                setAlerta({
                    msg: 'Cliente actualizado correctamente',
                    error: false
                });
                
                setTimeout(() => {
                    setAlerta({});
                }, 3000);

                return true;
            } catch (error) {
                setAlerta({
                    msg: error.response?.data?.msg || error.message,
                    error: true
                });
                return false;
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/clientes', clienteData, config);
                
                const { createdAt, updatedAt, __v, ...clienteAlmacenado } = data;
                setClientes([clienteAlmacenado, ...clientes]);

                setAlerta({
                    msg: 'Cliente registrado correctamente',
                    error: false
                });
                
                setTimeout(() => {
                    setAlerta({});
                }, 3000);

                return true;
            } catch (error) {
                setAlerta({
                    msg: error.response?.data?.msg || error.message,
                    error: true
                });
                return false;
            }
        }
    };

    const setEdicion = (cliente) => {
        setCliente(cliente);
    };

    const eliminarCliente = async (id) => {
        const confirmar = confirm('¿Confirmas que deseas eliminar este cliente?');
        
        if (confirmar) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };

                await clienteAxios.delete(`/clientes/${id}`, config);

                const clientesActualizado = clientes.filter(clienteState => clienteState._id !== id);
                setClientes(clientesActualizado);

                return {
                    msg: 'Cliente eliminado correctamente',
                    error: false
                };
            } catch (error) {
                return {
                    msg: error.response?.data?.msg || error.message,
                    error: true
                };
            }
        }
    };

    const obtenerClientePorId = async (id) => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await clienteAxios(`/clientes/${id}`, config);
            setCliente(data);
            return data;
        } catch (error) {
            console.log(error);
            setCliente({});
        } finally {
            setCargando(false);
        }
    };

    return (
        <ClientesContext.Provider
            value={{
                clientes,
                cliente,
                cargando,
                alerta,
                obtenerClientes,
                guardarCliente,
                setEdicion,
                eliminarCliente,
                obtenerClientePorId
            }}
        >
            {children}
        </ClientesContext.Provider>
    );
};

export default ClientesContext;
