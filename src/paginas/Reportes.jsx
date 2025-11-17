import { useEffect, useState } from 'react';
import { Calendar, TrendingUp, Users, PawPrint, FileText, Download, Filter } from 'lucide-react';
import useConsultas from '../hooks/useConsultas';
import usePacientes from '../hooks/usePacientes';
import useClientes from '../hooks/useClientes';
import useAuth from '../hooks/useAuth';

const Reportes = () => {
  const { consultas, obtenerConsultas } = useConsultas();
  const { pacientes, obtenerPacientes } = usePacientes();
  const { clientes, obtenerClientes } = useClientes();
  const { auth } = useAuth();

  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [filtroVeterinario, setFiltroVeterinario] = useState('');

  useEffect(() => {
    obtenerConsultas();
    obtenerPacientes();
    obtenerClientes();

    // Establecer fecha de inicio: hace 30 días
    const hoy = new Date();
    const hace30Dias = new Date(hoy);
    hace30Dias.setDate(hoy.getDate() - 30);
    setFechaInicio(hace30Dias.toISOString().split('T')[0]);
    setFechaFin(hoy.toISOString().split('T')[0]);
  }, []);

  // Filtrar consultas por rango de fechas
  const consultasFiltradas = consultas.filter((consulta) => {
    const fechaConsulta = new Date(consulta.fecha).toISOString().split('T')[0];
    const cumpleFecha =
      (!fechaInicio || fechaConsulta >= fechaInicio) &&
      (!fechaFin || fechaConsulta <= fechaFin);
    const cumpleVet = !filtroVeterinario || consulta.veterinario?._id === filtroVeterinario;
    return cumpleFecha && cumpleVet;
  });

  // Estadísticas generales
  const totalConsultas = consultasFiltradas.length;
  const consultasCompletadas = consultasFiltradas.filter(c => c.estado === 'completada').length;
  const consultasEnTratamiento = consultasFiltradas.filter(c => c.estado === 'en-tratamiento').length;

  // Top diagnósticos
  const diagnosticosMap = {};
  consultasFiltradas.forEach((c) => {
    if (c.diagnostico) {
      const diag = c.diagnostico.toLowerCase().trim();
      diagnosticosMap[diag] = (diagnosticosMap[diag] || 0) + 1;
    }
  });
  const topDiagnosticos = Object.entries(diagnosticosMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Top medicamentos prescritos
  const medicamentosMap = {};
  consultasFiltradas.forEach((c) => {
    if (c.medicamentos) {
      c.medicamentos.forEach((med) => {
        const nombre = med.nombre.toLowerCase().trim();
        medicamentosMap[nombre] = (medicamentosMap[nombre] || 0) + 1;
      });
    }
  });
  const topMedicamentos = Object.entries(medicamentosMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Consultas por veterinario
  const veterinariosMap = {};
  consultasFiltradas.forEach((c) => {
    if (c.veterinario) {
      const nombre = c.veterinario.nombre;
      veterinariosMap[nombre] = (veterinariosMap[nombre] || 0) + 1;
    }
  });
  const consultasPorVet = Object.entries(veterinariosMap).sort((a, b) => b[1] - a[1]);

  // Consultas por especie
  const especiesMap = {};
  consultasFiltradas.forEach((c) => {
    if (c.paciente?.especie) {
      const especie = c.paciente.especie;
      especiesMap[especie] = (especiesMap[especie] || 0) + 1;
    }
  });
  const consultasPorEspecie = Object.entries(especiesMap).sort((a, b) => b[1] - a[1]);

  // Consultas por mes (últimos 6 meses)
  const consultasPorMes = {};
  consultasFiltradas.forEach((c) => {
    const fecha = new Date(c.fecha);
    const mes = fecha.toLocaleDateString('es-CL', { year: 'numeric', month: 'short' });
    consultasPorMes[mes] = (consultasPorMes[mes] || 0) + 1;
  });

  // Lista de veterinarios únicos
  const veterinariosUnicos = Array.from(
    new Set(consultas.map((c) => c.veterinario).filter(Boolean))
  );

  const handleExportar = () => {
    // Preparar CSV básico
    let csv = 'Fecha,Paciente,Cliente,Veterinario,Diagnóstico,Estado\n';
    consultasFiltradas.forEach((c) => {
      csv += `${new Date(c.fecha).toLocaleDateString('es-CL')},`;
      csv += `${c.paciente?.nombre || 'N/A'},`;
      csv += `${c.cliente?.nombre || 'N/A'} ${c.cliente?.apellido || ''},`;
      csv += `${c.veterinario?.nombre || 'N/A'},`;
      csv += `"${c.diagnostico?.replace(/"/g, '""') || 'N/A'}",`;
      csv += `${c.estado}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reporte-consultas-${fechaInicio}-${fechaFin}.csv`;
    link.click();
  };

  const limpiarFiltros = () => {
    const hoy = new Date();
    const hace30Dias = new Date(hoy);
    hace30Dias.setDate(hoy.getDate() - 30);
    setFechaInicio(hace30Dias.toISOString().split('T')[0]);
    setFechaFin(hoy.toISOString().split('T')[0]);
    setFiltroVeterinario('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reportes y Estadísticas</h1>
        <p className="text-gray-600">Análisis de consultas médicas y actividad clínica</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Inicio
            </label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Fin
            </label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Veterinario
            </label>
            <select
              value={filtroVeterinario}
              onChange={(e) => setFiltroVeterinario(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              {veterinariosUnicos.map((vet) => (
                <option key={vet._id} value={vet._id}>
                  {vet.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={limpiarFiltros}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
            >
              Limpiar
            </button>
            <button
              onClick={handleExportar}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Consultas</p>
              <p className="text-3xl font-bold">{totalConsultas}</p>
            </div>
            <FileText className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Completadas</p>
              <p className="text-3xl font-bold">{consultasCompletadas}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium mb-1">En Tratamiento</p>
              <p className="text-3xl font-bold">{consultasEnTratamiento}</p>
            </div>
            <Calendar className="w-12 h-12 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Tasa Completado</p>
              <p className="text-3xl font-bold">
                {totalConsultas > 0 ? Math.round((consultasCompletadas / totalConsultas) * 100) : 0}%
              </p>
            </div>
            <Users className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Top Diagnósticos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            🏥 Top 10 Diagnósticos Más Frecuentes
          </h3>
          {topDiagnosticos.length > 0 ? (
            <div className="space-y-3">
              {topDiagnosticos.map(([diagnostico, cantidad], index) => {
                const porcentaje = Math.round((cantidad / totalConsultas) * 100);
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-900 capitalize truncate">
                        {index + 1}. {diagnostico.substring(0, 40)}...
                      </span>
                      <span className="text-gray-600">
                        {cantidad} ({porcentaje}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No hay datos disponibles</p>
          )}
        </div>

        {/* Top Medicamentos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            💊 Top 10 Medicamentos Más Prescritos
          </h3>
          {topMedicamentos.length > 0 ? (
            <div className="space-y-3">
              {topMedicamentos.map(([medicamento, cantidad], index) => {
                const max = topMedicamentos[0][1];
                const porcentaje = Math.round((cantidad / max) * 100);
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-900 capitalize">
                        {index + 1}. {medicamento}
                      </span>
                      <span className="text-gray-600">{cantidad} veces</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No hay datos disponibles</p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Consultas por Veterinario */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            👨‍⚕️ Consultas por Veterinario
          </h3>
          {consultasPorVet.length > 0 ? (
            <div className="space-y-3">
              {consultasPorVet.map(([nombre, cantidad], index) => {
                const porcentaje = Math.round((cantidad / totalConsultas) * 100);
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-900">Dr(a). {nombre}</span>
                      <span className="text-gray-600">
                        {cantidad} ({porcentaje}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No hay datos disponibles</p>
          )}
        </div>

        {/* Consultas por Especie */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <PawPrint className="w-5 h-5 text-blue-600" />
            Consultas por Especie
          </h3>
          {consultasPorEspecie.length > 0 ? (
            <div className="space-y-3">
              {consultasPorEspecie.map(([especie, cantidad], index) => {
                const porcentaje = Math.round((cantidad / totalConsultas) * 100);
                const colors = ['bg-blue-600', 'bg-green-600', 'bg-yellow-600', 'bg-red-600', 'bg-purple-600'];
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-900">{especie}</span>
                      <span className="text-gray-600">
                        {cantidad} ({porcentaje}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${colors[index % colors.length]} h-2 rounded-full`}
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No hay datos disponibles</p>
          )}
        </div>
      </div>

      {/* Resumen del período */}
      <div className="mt-6 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">📊 Resumen del Período</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <p className="text-gray-500">Período analizado:</p>
            <p className="font-semibold">
              {new Date(fechaInicio).toLocaleDateString('es-CL')} -{' '}
              {new Date(fechaFin).toLocaleDateString('es-CL')}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total de pacientes:</p>
            <p className="font-semibold">{pacientes.length}</p>
          </div>
          <div>
            <p className="text-gray-500">Total de clientes:</p>
            <p className="font-semibold">{clientes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
