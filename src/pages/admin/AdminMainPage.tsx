import WelcomeTitle from '../../components/common/WelcomeTitle';

function AdminMainPage() {
  // TODO: 실제 사용자 이름은 Context나 전역 상태에서 가져오기
  const username = '김길동';

  return (
    <main className="flex-1 p-8">
      <WelcomeTitle>
        {username}님 환영합니다.
      </WelcomeTitle>
    </main>
  );
}

export default AdminMainPage;
