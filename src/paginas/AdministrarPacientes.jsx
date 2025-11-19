import { useState } from "react"
import FormularioPacienteLegacy from "../components/FormularioPacienteLegacy"
import ListadoPacientes from "../components/ListadoPacientes"
import DashboardAdmin from "../components/DashboardAdmin"
import DashboardVeterinario from "../components/DashboardVeterinario"
import DashboardRecepcion from "../components/DashboardRecepcion"
import useAuth from "../hooks/useAuth"
import { Button } from "@/components/ui/button"
import { PlusCircle, MinusCircle } from "lucide-react"

const AdministrarPacientes = () => {
    const { auth, esAdmin, esVeterinario, esRecepcion } = useAuth()
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    // Mostrar dashboard específico según el rol
    if (esAdmin()) {
        return (
            <div className="p-6">
                <DashboardAdmin />
            </div>
        )
    }

    if (esVeterinario()) {
        return (
            <div className="p-6">
                <DashboardVeterinario />
            </div>
        )
    }

    if (esRecepcion()) {
        return (
            <div className="p-6">
                <DashboardRecepcion />
            </div>
        )
    }

    // Fallback: vista original de pacientes (por si hay otros roles en el futuro)
    return (
        <div className="flex flex-col md:flex-row gap-6 p-6">
            <Button
                type="button"
                className="md:hidden mb-4 h-12 text-base font-semibold gap-2"
                variant={mostrarFormulario ? "outline" : "default"}
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >
                {mostrarFormulario ? (
                    <>
                        <MinusCircle className="h-5 w-5" />
                        Ocultar Formulario
                    </>
                ) : (
                    <>
                        <PlusCircle className="h-5 w-5" />
                        Nuevo Paciente
                    </>
                )}
            </Button>

            <div className={`${mostrarFormulario ? 'block':'hidden' } md:block md:w-1/2 lg:w-2/5`}>
                <FormularioPacienteLegacy />
            </div>

            <div className="md:w-1/2 lg:w-3/5">
                <ListadoPacientes />
            </div>
        </div>
    )
}

export default AdministrarPacientes