import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import UserSidebarContent from '../components/layout/UserSidebarContent';
import Header from '../components/layout/Header';
import ChatPage from '../pages/chat/ChatPage';
import { ChatProvider } from '../contexts/ChatContext';

function PublicLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith('/auth');

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main>
          <Outlet />
        </main>
      </div>
    );
  }

  // 메인 페이지(/)인 경우 ChatPage를 렌더링
  const isMainPage = location.pathname === '/';

  return (
    <ChatProvider>
      <div className="min-h-screen bg-white">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
          <UserSidebarContent isCollapsed={isCollapsed} />
        </Sidebar>
        <div className={`flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Header />
          {isMainPage ? (
            <ChatPage />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </ChatProvider>
  );
}

export default PublicLayout;
