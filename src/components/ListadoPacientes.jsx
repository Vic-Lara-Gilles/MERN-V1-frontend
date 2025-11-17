import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ListadoPacientes = () => {

    const { pacientes } = usePacientes()

    return (
        <div className="space-y-4">
            { pacientes.length ? 
            (
                <>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Pacientes Registrados</h2>
                            <p className="text-muted-foreground mt-1">
                                Gestiona la información de tus pacientes
                            </p>
                        </div>
                        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
                            <span className="text-sm font-medium">{pacientes.length} {pacientes.length === 1 ? 'Paciente' : 'Pacientes'}</span>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {pacientes.map( paciente  => (
                            <Paciente
                                key={paciente._id}
                                paciente={paciente}
                                run={paciente.run}
                            />
                        ))}
                    </div>
                </>
            ):(
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="rounded-full bg-muted p-4 mb-4">
                            <svg
                                className="h-10 w-10 text-muted-foreground"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No hay pacientes registrados</h3>
                        <p className="text-muted-foreground text-center max-w-sm">
                            Comienza agregando tu primer paciente usando el formulario
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default ListadoPacientes