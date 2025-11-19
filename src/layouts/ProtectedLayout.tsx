import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

interface ProtectedLayoutProps {
  isAuthenticated?: boolean;
}

function ProtectedLayout({ isAuthenticated = true }: ProtectedLayoutProps) {
  // x�� J@ �� \�x �t�\ ��t	�
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default ProtectedLayout;
