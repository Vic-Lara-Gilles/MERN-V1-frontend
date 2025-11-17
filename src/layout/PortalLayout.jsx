import { Outlet } from 'react-router-dom';

const PortalLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PortalLayout;
