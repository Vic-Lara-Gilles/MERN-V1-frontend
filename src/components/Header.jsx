import { useLocation } from 'react-router-dom';

const Header = ({
    icon,
    title,
    subtitle,
    actions,
    className = '',
}) => {
    return (
        <div className={`p-6 space-y-6 ${className}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        {icon}
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-muted-foreground dark:text-slate-300 mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>
                {actions && (
                    <div>{actions}</div>
                )}
            </div>
        </div>
    );
};

export default Header;
