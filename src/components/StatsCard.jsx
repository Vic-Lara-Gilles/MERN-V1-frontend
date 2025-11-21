const StatsCard = ({ 
    title, 
    value, 
    icon: Icon, 
    gradient = 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    borderColor = 'border-blue-200 dark:border-blue-700',
    textColor = 'text-blue-600 dark:text-blue-400',
    valueBgColor,
    children
}) => {
    return (
        <div className={`bg-linear-to-br ${gradient} rounded-lg p-6 border ${borderColor}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm font-medium ${textColor}`}>{title}</p>
                    <p className={`text-3xl font-bold mt-2 ${textColor.replace('text-', 'text-').replace('600', '900').replace('400', '100')}`}>
                        {value}
                    </p>
                </div>
                {children ? (
                    children
                ) : Icon ? (
                    <Icon className={`h-12 w-12 ${textColor} opacity-50`} />
                ) : null}
            </div>
        </div>
    )
}

export default StatsCard
