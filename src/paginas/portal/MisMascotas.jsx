import LoadingSpinner from '../../components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Calendar } from 'lucide-react';
import useClienteAuth from '../../hooks/useClienteAuth';
import clienteAxios from '../../config/axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageContainer, PageContent } from '@/components/ui/page-container';
import Header from '@/components/Header';

const MisMascotas = () => {
    const { cliente } = useClienteAuth();
    const [pacientes, setPacientes] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token_cliente');
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };
                const { data } = await clienteAxios(`/pacientes/portal/mis-pacientes`, config);
                setPacientes(data);
            } catch (error) {
                console.log(error);
            }
            setCargando(false);
        };
        if (cliente._id) obtenerPacientes();
    }, [cliente]);

    const calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return 'N/A';
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
        return edad > 0 ? `${edad} año${edad !== 1 ? 's' : ''}` : 'Menos de 1 año';
    };

    return (
        <PageContainer>
            <Header
                icon={<PawPrint className="h-8 w-8 text-slate-900 dark:text-lime-500" />}
                title="Mis Mascotas"
                subtitle="Información de tus mascotas registradas"
            />

            <PageContent>
                {cargando ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-lime-500"></div>
                    </div>
                ) : pacientes.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 p-12 text-center">
                        <PawPrint className="w-16 h-16 text-muted-foreground dark:text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No tienes mascotas registradas</h3>
                        <p className="text-muted-foreground dark:text-slate-300">Contacta con recepción para registrar a tu mascota</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pacientes.map((paciente) => (
                            <div key={paciente._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="bg-linear-to-r from-slate-800 to-slate-900 dark:from-lime-600 dark:to-lime-700 p-6">
                                    <h3 className="text-xl font-bold text-white">{paciente.nombre}</h3>
                                    <p className="text-slate-200 dark:text-lime-100 text-sm mt-1">{paciente.numeroHistoriaClinica}</p>
                                </div>
                                <div className="p-6 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground dark:text-gray-400">Especie:</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{paciente.especie}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground dark:text-gray-400">Raza:</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{paciente.raza || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground dark:text-gray-400">Edad:</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{calcularEdad(paciente.fechaNacimiento)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground dark:text-gray-400">Sexo:</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{paciente.sexo}</span>
                                    </div>
                                    {paciente.peso && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground dark:text-gray-400">Peso:</span>
                                            <span className="font-semibold text-slate-900 dark:text-white">{paciente.peso} kg</span>
                                        </div>
                                    )}
                                    {paciente.esterilizado !== undefined && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground dark:text-gray-400">Esterilizado:</span>
                                            <span className={`font-semibold ${paciente.esterilizado ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-gray-400'}`}>
                                                {paciente.esterilizado ? 'Sí' : 'No'}
                                            </span>
                                        </div>
                                    )}
                                    <Button className="mt-4 w-full bg-slate-900 dark:bg-lime-600 hover:bg-slate-800 dark:hover:bg-lime-700" asChild>
                                        <Link to="/portal/solicitar-cita" state={{ pacienteId: paciente._id }}>
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Solicitar Cita
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </PageContent>
        </PageContainer>
    );
};

export default MisMascotas;
