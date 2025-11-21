
import React, { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EstadisticaCard = memo(function EstadisticaCard({ titulo, valor, descripcion, Icon, colorClasses }) {
    return (
        <Card className="hover:shadow-lg transition-shadow border-slate-200 dark:border-gray-700 dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground dark:text-slate-300">
                    {titulo}
                </CardTitle>
                <div className={`h-10 w-10 rounded-lg ${colorClasses.iconBg} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${colorClasses.icon}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold dark:text-white">{valor}</div>
                <p className="text-xs text-muted-foreground dark:text-slate-300 mt-1">
                    {descripcion}
                </p>
            </CardContent>
        </Card>
    );
});
// NOTA: Si usas 'bg-gradient-to-br' en colorClasses.iconBg, cámbialo por 'bg-linear-to-br' para evitar advertencias de linter.

export default EstadisticaCard;
