import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

interface ProtectedLayoutProps {
  isAuthenticated?: boolean;
}

function ProtectedLayout({ isAuthenticated = true }: ProtectedLayoutProps) {
  // xù¿ J@ Ω∞ \¯x òt¿\ ¨‰t	∏
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
