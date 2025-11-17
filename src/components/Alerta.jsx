import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

const Alerta = ({alerta}) => {
    return (
        <Alert variant={alerta.error ? "destructive" : "default"} className="mb-4">
            {alerta.error ? (
                <AlertCircle className="h-4 w-4" />
            ) : (
                <CheckCircle2 className="h-4 w-4" />
            )}
            <AlertDescription className="font-medium">
                {alerta.msg}
            </AlertDescription>
        </Alert>
    )
};

export default Alerta;

