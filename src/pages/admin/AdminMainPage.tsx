import { useNavigate } from 'react-router-dom';
import WelcomeTitle from '../../components/common/WelcomeTitle';
import Button from '../../components/common/Button';
import { ROUTES } from '../../constants/routes';

function AdminMainPage() {
  // TODO: 실제 사용자 이름은 Context나 전역 상태에서 가져오기
  const username = '김길동';
  const navigate = useNavigate();

  return (
    <main className="flex-1 h-full flex flex-col items-center justify-center gap-6">
      <WelcomeTitle>
        {username}님 환영합니다.
      </WelcomeTitle>
      <div className="flex flex-row gap-4">
        <Button className="rounded-full" onClick={() => navigate(ROUTES.ADMIN.CHATBOT_LIST)}>
          챗봇 리스트
        </Button>
        <Button className="rounded-full" onClick={() => navigate(ROUTES.ADMIN.SIGNUP_MANAGEMENT)}>
          가입 신청 관리
        </Button>
        <Button className="rounded-full" onClick={() => navigate(ROUTES.ADMIN.ADMIN_LIST)}>
          관리자 목록
        </Button>
        <Button className="rounded-full" onClick={() => navigate(ROUTES.ADMIN.SETTINGS)}>
          프로필 설정
        </Button>
      </div>
    </main>
  );
}

export default AdminMainPage;
