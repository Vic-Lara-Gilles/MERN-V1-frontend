import LoadingSpinner from '../../components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { PawPrint } from 'lucide-react';
import useClienteAuth from '../../hooks/useClienteAuth';
import clienteAxios from '../../config/axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Mis Mascotas</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Información de tus mascotas registradas</p>
                </div>

                {cargando ? (
                    <LoadingSpinner />
                ) : pacientes.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <PawPrint className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No tienes mascotas registradas</h3>
                            <p className="text-gray-600 dark:text-gray-400">Contacta con recepción para registrar a tu mascota</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pacientes.map((paciente) => (
                            <Card key={paciente._id} className="hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                <CardHeader className="bg-linear-to-r from-lime-500 to-lime-600 dark:from-lime-600 dark:to-lime-700 text-white">
                                    <CardTitle className="text-white">{paciente.nombre}</CardTitle>
                                    <CardDescription className="text-lime-100 dark:text-lime-200">{paciente.numeroHistoriaClinica}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Especie:</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{paciente.especie}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Raza:</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{paciente.raza || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Edad:</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{calcularEdad(paciente.fechaNacimiento)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Sexo:</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{paciente.sexo}</span>
                                    </div>
                                    {paciente.peso && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 dark:text-gray-400">Peso:</span>
                                            <span className="font-semibold text-slate-900 dark:text-white">{paciente.peso} kg</span>
                                        </div>
                                    )}
                                    {paciente.esterilizado !== undefined && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 dark:text-gray-400">Esterilizado:</span>
                                            <span className={`font-semibold ${paciente.esterilizado ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                                {paciente.esterilizado ? 'Sí' : 'No'}
                                            </span>
                                        </div>
                                    )}
                                    <Button className="mt-4 w-full bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700" asChild>
                                        <Link to="/portal/solicitar-cita" state={{ pacienteId: paciente._id }}>
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Solicitar Cita
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>© 2025 Clínica Veterinaria. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default MisMascotas;
