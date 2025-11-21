import LoadingSpinner from '../../components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, PawPrint, FileText } from 'lucide-react';
import useClienteAuth from '../../hooks/useClienteAuth';
import clienteAxios from '../../config/axios';
import Alerta from '../../components/Alerta';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageContainer, PageContent } from '@/components/ui/page-container';
import { FormField } from '@/components/ui/form-field';
import Header from '@/components/Header';

const SolicitarCita = () => {
    const { cliente } = useClienteAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [pacientes, setPacientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});
    const [cita, setCita] = useState({
        paciente: location.state?.pacienteId || '',
        fecha: '',
        hora: '',
        tipoConsulta: 'consulta',
        motivo: '',
        notasAdicionales: '',
    });

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token_cliente');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await clienteAxios(`/pacientes/portal/mis-pacientes`, config);
                setPacientes(data);
            } catch (error) {
                console.log(error);
            }
            setCargando(false);
        };
        if (cliente._id) obtenerPacientes();
    }, [cliente]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cita.paciente || !cita.fecha || !cita.hora || !cita.motivo) {
            setAlerta({
                msg: 'Todos los campos marcados con * son obligatorios',
                error: true,
            });
            return;
        }

        const fechaHora = new Date(`${cita.fecha}T${cita.hora}`);
        if (fechaHora <= new Date()) {
            setAlerta({
                msg: 'La fecha y hora debe ser en el futuro',
                error: true,
            });
            return;
        }

        try {
            const token = localStorage.getItem('token_cliente');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await clienteAxios.post(
                '/citas',
                {
                    paciente: cita.paciente,
                    fecha: fechaHora,
                    motivo: cita.motivo,
                    notas: cita.notasAdicionales,
                    estado: 'pendiente',
                },
                config
            );

            setAlerta({
                msg: 'Cita solicitada correctamente. Recepción confirmará pronto.',
                error: false,
            });

            setTimeout(() => {
                navigate('/portal/dashboard');
            }, 2000);
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || 'Hubo un error al solicitar la cita',
                error: true,
            });
        }
    };

    const { msg } = alerta;

    if (cargando) {
        return <LoadingSpinner />;
    }
    return (
        <PageContainer>
            <Header
                icon={<Calendar className="h-8 w-8 text-slate-900 dark:text-lime-500" />}
                title="Solicitar Cita"
                subtitle="Completa el formulario para solicitar una cita"
            />

            <PageContent>
                {msg && <Alerta alerta={alerta} />}

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-6">
                    {cargando ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-lime-500"></div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                    <PawPrint className="w-4 h-4 inline mr-1" />
                                    Mascota *
                                </label>
                                <select
                                    value={cita.paciente}
                                    onChange={(e) => setCita({ ...cita, paciente: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                                    required
                                >
                                    <option value="">Selecciona una mascota</option>
                                    {pacientes.map((paciente) => (
                                        <option key={paciente._id} value={paciente._id}>
                                            {paciente.nombre} ({paciente.especie})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                        <Calendar className="w-4 h-4 inline mr-1" />
                                        Fecha *
                                    </label>
                                    <input
                                        type="date"
                                        value={cita.fecha}
                                        onChange={(e) => setCita({ ...cita, fecha: e.target.value })}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                        <Clock className="w-4 h-4 inline mr-1" />
                                        Hora Preferida *
                                    </label>
                                    <input
                                        type="time"
                                        value={cita.hora}
                                        onChange={(e) => setCita({ ...cita, hora: e.target.value })}
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                    <FileText className="w-4 h-4 inline mr-1" />
                                    Tipo de Consulta *
                                </label>
                                <select
                                    value={cita.tipoConsulta}
                                    onChange={(e) => setCita({ ...cita, tipoConsulta: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                                    required
                                >
                                    <option value="consulta">Consulta General</option>
                                    <option value="vacunacion">Vacunación</option>
                                    <option value="revision">Revisión / Control</option>
                                    <option value="emergencia">Emergencia</option>
                                    <option value="cirugia">Cirugía</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                    Motivo de la Consulta *
                                </label>
                                <textarea
                                    value={cita.motivo}
                                    onChange={(e) => setCita({ ...cita, motivo: e.target.value })}
                                    rows="4"
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-gray-400"
                                    placeholder="Describe brevemente el motivo de la consulta..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                    Notas Adicionales (Opcional)
                                </label>
                                <textarea
                                    value={cita.notasAdicionales}
                                    onChange={(e) => setCita({ ...cita, notasAdicionales: e.target.value })}
                                    rows="3"
                                    className="w-full px-4 py-3 border border-slate-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-900 dark:focus:ring-lime-500 focus:border-transparent bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-gray-400"
                                    placeholder="Información adicional que consideres importante..."
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" className="flex-1 bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700">
                                    Solicitar Cita
                                </Button>
                                <Button variant="outline" asChild className="border-slate-200 dark:border-gray-600 hover:bg-slate-100 dark:hover:bg-gray-700">
                                    <Link to="/portal/dashboard">
                                        Cancelar
                                    </Link>
                                </Button>
                            </div>
                        </form>
                        )}
                </div>
            </PageContent>
        </PageContainer>
    );
};

export default SolicitarCita;
