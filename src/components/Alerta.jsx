import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { createPortal } from "react-dom";

const overlayStyle = {
    position: "fixed",
    top: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    minWidth: "360px",
    maxWidth: "600px",
    pointerEvents: "none",
    animation: "slideDown 0.3s ease-out"
};

const Alerta = ({ alerta }) => {
    if (!alerta?.msg) return null;
    return createPortal(
        <>
            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -20px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }
            `}</style>
            <div style={overlayStyle}>
                <Alert
                    variant={alerta.error ? "destructive" : "default"}
                    className="shadow-2xl border-2 rounded-lg backdrop-blur-sm"
                    style={{ pointerEvents: "auto" }}
                >
                    <div className="flex items-center gap-3">
                        {alerta.error ? (
                            <AlertCircle className="h-5 w-5 shrink-0" />
                        ) : (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                        )}
                        <AlertDescription className="font-semibold text-base">
                            {alerta.msg}
                        </AlertDescription>
                    </div>
                </Alert>
            </div>
        </>,
        document.body
    );
};

export default Alerta;

