import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
                <main className="container mx-auto md:grid md:grid-cols-2 min-h-screen gap-12 p-6 md:p-10 items-center">
                    <Outlet />
                </main>
            </div>
        </>
    )
};

export default AuthLayout;
