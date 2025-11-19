import { useState } from 'react';
import ProfileCard from '../admin/profile/ProfileCard';
import Dropdown from '../common/Dropdown';
import NavItem from './NavItem';

function Sidebar() {
  const [isLoggedIn] = useState(true);

  return (
    <aside className="w-64 h-screen bg-gray-50 p-4 flex flex-col">
      <ProfileCard
        userName="김길동"
        isLoggedIn={isLoggedIn}
        onLogin={() => console.log('로그인')}
        onRegister={() => console.log('회원가입')}
        onPasswordChange={() => console.log('비밀번호 변경')}
        onSettings={() => console.log('설정')}
      />

      <nav className="mt-4 flex-1">
        <Dropdown
          trigger={
            <NavItem
              icon="🤖"
              label="챗봇 리스트"
              hasDropdown={true}
            />
          }
        >
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
            챗봇 목록 보기
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
            챗봇 생성
          </button>
        </Dropdown>

        <Dropdown
          trigger={
            <NavItem
              icon="📊"
              label="챗봇 통계"
              hasDropdown={true}
            />
          }
        >
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
            통계 대시보드
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
            분석 리포트
          </button>
        </Dropdown>

        <Dropdown
          trigger={
            <NavItem
              icon="⚙️"
              label="설정"
              hasDropdown={true}
            />
          }
        >
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
            일반 설정
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
            알림 설정
          </button>
        </Dropdown>
      </nav>
    </aside>
  );
}

export default Sidebar;
