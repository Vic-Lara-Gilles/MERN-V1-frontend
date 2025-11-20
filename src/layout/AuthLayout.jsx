import { Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const AuthLayout = () => {
    return (
        <>
            <div className="min-h-screen w-full relative overflow-hidden">
                {/* Theme Toggle - Posición absoluta superior derecha */}
                <div className="absolute top-4 right-4 z-20">
                    <ThemeToggle />
                </div>

                {/* Gradient blobs background */}
                <div className="fixed inset-0 -z-10 overflow-hidden dark:hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 transition-colors duration-500 bg-slate-400"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 transition-colors duration-500 bg-slate-300"></div>
                </div>

                <div className="fixed inset-0 -z-10 overflow-hidden hidden dark:block">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-5 transition-colors duration-500 bg-slate-600"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-5 transition-colors duration-500 bg-slate-500"></div>
                </div>

                <main className="container mx-auto md:grid md:grid-cols-2 min-h-screen gap-12 p-6 md:p-10 items-center">
                    <Outlet />
                </main>
            </div>
        </>
    )
};

export default AuthLayout;
