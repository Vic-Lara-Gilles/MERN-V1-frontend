import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

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

const Alerta = ({ alerta, autoDismiss = true, dismissTime = 5000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);
        
        if (autoDismiss && !alerta.error) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, dismissTime);

            return () => clearTimeout(timer);
        }
    }, [alerta, autoDismiss, dismissTime]);

    if (!alerta?.msg || !visible) return null;

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
                    className="shadow-2xl"
                    style={{ pointerEvents: "auto" }}
                >
                    <div className="flex items-center gap-3 justify-between">
                        <div className="flex items-center gap-3">
                            {alerta.error ? (
                                <AlertCircle className="h-5 w-5 shrink-0" />
                            ) : (
                                <CheckCircle2 className="h-5 w-5 shrink-0" />
                            )}
                            <AlertDescription className="font-semibold text-base">
                                {alerta.msg}
                            </AlertDescription>
                        </div>
                        <button
                            onClick={() => setVisible(false)}
                            className="shrink-0 hover:opacity-70 transition-opacity"
                            aria-label="Cerrar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </Alert>
            </div>
        </>,
        document.body
    );
};

export default Alerta;

