import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import useConsultas from '../hooks/useConsultas';

const ImprimirReceta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerConsulta, cargando } = useConsultas();
  const [consulta, setConsulta] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    const cargarConsulta = async () => {
      const data = await obtenerConsulta(id);
      setConsulta(data);
    };
    if (id) {
      cargarConsulta();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 'N/A';
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad > 0 ? `${edad} año${edad !== 1 ? 's' : ''}` : 'Menos de 1 año';
  };

  const handleImprimir = () => {
    window.print();
  };

  if (cargando || !consulta) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Controles (no se imprimen) */}
      <div className="print:hidden bg-white shadow-md border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(`/admin/consultas/${id}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleImprimir}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              <Printer className="w-5 h-5" />
              Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Contenido imprimible */}
      <div ref={printRef} className="max-w-4xl mx-auto p-8 bg-white">
        {/* Header / Membrete */}
        <div className="border-b-4 border-blue-600 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Clínica Veterinaria</h1>
              <p className="text-gray-600 mt-1">Sistema de Atención Médica</p>
              <div className="mt-3 text-sm text-gray-600">
                <p>📍 Dirección de la clínica</p>
                <p>📞 Teléfono: +56 9 XXXX XXXX</p>
                <p>📧 Email: contacto@clinica.com</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-blue-100 px-4 py-2 rounded-lg inline-block">
                <p className="text-sm text-gray-900 font-semibold">RECETA MÉDICA VETERINARIA</p>
              </div>
              <p className="text-sm text-gray-600 mt-2">Fecha: {formatearFecha(consulta.fecha)}</p>
            </div>
          </div>
        </div>

        {/* Información del Veterinario */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Veterinario Tratante</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Nombre:</p>
              <p className="font-semibold">Dr(a). {consulta.veterinario?.nombre}</p>
            </div>
            {consulta.veterinario?.especialidad && (
              <div>
                <p className="text-gray-600">Especialidad:</p>
                <p className="font-semibold">{consulta.veterinario.especialidad}</p>
              </div>
            )}
            {consulta.veterinario?.licenciaProfesional && (
              <div>
                <p className="text-gray-600">Licencia Profesional:</p>
                <p className="font-semibold">{consulta.veterinario.licenciaProfesional}</p>
              </div>
            )}
          </div>
        </div>

        {/* Información del Paciente */}
        <div className="mb-6 border border-gray-300 p-4 rounded-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Datos del Paciente</h2>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-600">Nombre del Paciente:</p>
              <p className="font-semibold text-lg">{consulta.paciente?.nombre}</p>
            </div>
            <div>
              <p className="text-gray-600">Especie/Raza:</p>
              <p className="font-semibold">{consulta.paciente?.especie} - {consulta.paciente?.raza || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600">Edad:</p>
              <p className="font-semibold">{calcularEdad(consulta.paciente?.fechaNacimiento)}</p>
            </div>
            <div>
              <p className="text-gray-600">Sexo:</p>
              <p className="font-semibold">{consulta.paciente?.sexo || 'N/A'}</p>
            </div>
            {consulta.peso && (
              <div>
                <p className="text-gray-600">Peso actual:</p>
                <p className="font-semibold">{consulta.peso} kg</p>
              </div>
            )}
          </div>

          <div className="border-t pt-3">
            <h3 className="font-semibold text-gray-900 mb-2">Propietario</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Nombre:</p>
                <p className="font-semibold">{consulta.cliente?.nombre} {consulta.cliente?.apellido}</p>
              </div>
              <div>
                <p className="text-gray-600">Teléfono:</p>
                <p className="font-semibold">{consulta.cliente?.telefono}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnóstico */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 bg-green-100 px-3 py-2 rounded">
            📋 DIAGNÓSTICO
          </h2>
          <div className="border border-green-300 p-4 rounded">
            <p className="text-gray-800 whitespace-pre-wrap">{consulta.diagnostico}</p>
          </div>
        </div>

        {/* Prescripción de Medicamentos */}
        {consulta.medicamentos && consulta.medicamentos.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 bg-blue-100 px-3 py-2 rounded">
              💊 PRESCRIPCIÓN MÉDICA
            </h2>
            <div className="border-2 border-blue-600 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-900 mb-3">Rp/</p>
              <div className="space-y-4">
                {consulta.medicamentos.map((med, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <p className="font-bold text-gray-900 text-base mb-1">
                      {index + 1}. {med.nombre}
                    </p>
                    <div className="ml-4 text-sm space-y-1">
                      <p className="text-gray-700">
                        <span className="font-semibold">Dosis:</span> {med.dosis}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Administrar:</span> {med.frecuencia}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Duración del tratamiento:</span> {med.duracion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Indicaciones de Tratamiento */}
        {consulta.tratamiento && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 bg-yellow-100 px-3 py-2 rounded">
              ⚕️ INDICACIONES DE TRATAMIENTO
            </h2>
            <div className="border border-yellow-300 p-4 rounded">
              <p className="text-gray-800 whitespace-pre-wrap">{consulta.tratamiento}</p>
            </div>
          </div>
        )}

        {/* Observaciones */}
        {consulta.observaciones && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Observaciones Adicionales</h2>
            <div className="border border-gray-300 p-4 rounded bg-gray-50">
              <p className="text-gray-700 whitespace-pre-wrap text-sm">{consulta.observaciones}</p>
            </div>
          </div>
        )}

        {/* Próxima revisión */}
        {consulta.proximaRevision && (
          <div className="mb-6 bg-orange-50 border border-orange-300 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-orange-900 mb-1">⏰ Próxima Revisión</h2>
            <p className="text-orange-800 font-semibold text-lg">
              {formatearFecha(consulta.proximaRevision)}
            </p>
          </div>
        )}

        {/* Footer con firma */}
        <div className="mt-12 pt-6 border-t-2">
          <div className="flex justify-between items-end">
            <div className="text-sm text-gray-600">
              <p>Documento generado el {new Date().toLocaleDateString('es-CL')}</p>
              <p className="mt-1 text-xs">Este documento es válido solo con firma del veterinario</p>
            </div>
            <div className="text-center">
              <div className="border-t-2 border-gray-900 w-64 mb-2 mt-16"></div>
              <p className="font-semibold text-gray-900">Dr(a). {consulta.veterinario?.nombre}</p>
              {consulta.veterinario?.licenciaProfesional && (
                <p className="text-sm text-gray-600">Lic. Prof. {consulta.veterinario.licenciaProfesional}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Firma y Timbre</p>
            </div>
          </div>
        </div>

        {/* Advertencia legal */}
        <div className="mt-6 p-3 bg-gray-100 rounded text-xs text-gray-600 text-center">
          <p>⚠️ Esta receta es válida por 30 días desde la fecha de emisión.</p>
          <p>La venta de medicamentos controlados requiere presentación del original de esta receta.</p>
        </div>
      </div>

      {/* Estilos para impresión */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          @page {
            margin: 1.5cm;
            size: letter;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default ImprimirReceta;
