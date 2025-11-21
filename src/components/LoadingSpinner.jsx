const LoadingSpinner = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent dark:border-lime-500 dark:border-r-transparent"></div>
                <p className="mt-4 text-slate-600 dark:text-slate-300">Cargando...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
