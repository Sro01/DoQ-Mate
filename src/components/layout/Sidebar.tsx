import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import ProfileCard from '../admin/profile/ProfileCard';
import Dropdown from '../common/Dropdown';
import NavItem from './NavItem';
import SubMenuItem from './SubMenuItem';

function Sidebar() {
  const [isLoggedIn] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside className={`h-screen bg-[#e9eef6] border-r border-gray-200 p-4 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex mb-6">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-300 rounded-full transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} className="text-gray-600" />
        </button>
      </div>

      {!isCollapsed && (
        <ProfileCard
          userName="김길동"
          isLoggedIn={isLoggedIn}
          onLogin={() => console.log('로그인')}
          onRegister={() => console.log('회원가입')}
          onPasswordChange={() => console.log('비밀번호 변경')}
          onSettings={() => console.log('설정')}
        />
      )}

      <nav className="mt-4 flex-1">
        <Dropdown
          isCollapsed={isCollapsed}
          trigger={
            <NavItem
              icon="🤖"
              label="챗봇 리스트"
              hasDropdown={true}
            />
          }
        >
          <SubMenuItem label="챗봇 목록 보기" onClick={() => navigate('/chatbotlist')} />
          <SubMenuItem label="챗봇 생성" onClick={() => navigate('/chatbot/create')} />
        </Dropdown>

        <Dropdown
          isCollapsed={isCollapsed}
          trigger={
            <NavItem
              icon="📊"
              label="챗봇 통계"
              hasDropdown={true}
            />
          }
        >
          <SubMenuItem label="통계 대시보드" />
          <SubMenuItem label="분석 리포트" />
        </Dropdown>

        <Dropdown
          isCollapsed={isCollapsed}
          trigger={
            <NavItem
              icon="⚙️"
              label="설정"
              hasDropdown={true}
            />
          }
        >
          <SubMenuItem label="일반 설정" />
          <SubMenuItem label="알림 설정" />
        </Dropdown>
      </nav>
    </aside>
  );
}

export default Sidebar;
