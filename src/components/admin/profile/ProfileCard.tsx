import Button from '../../common/Button';

interface ProfileCardProps {
  userName?: string;
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onRegister?: () => void;
  onPasswordChange?: () => void;
  onSettings?: () => void;
}

function ProfileCard({
  userName = "김갑동",
  isLoggedIn = false,
  onLogin,
  onRegister,
  onPasswordChange,
  onSettings
}: ProfileCardProps) {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-6 text-white">
      {isLoggedIn ? (
        <>
          <h2 className="text-xl font-bold mb-1">{userName}님</h2>
          <p className="text-sm mb-6">환영합니다.</p>
          <div className="flex justify-end gap-2">
            <Button
              variant="white"
              size="small"
              onClick={onPasswordChange}
            >
              비밀번호 변경
            </Button>
            <Button
              variant="white"
              size="small"
              onClick={onSettings}
            >
              설정
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-lg font-bold mb-1">관리자 인증이 필요합니다.</h2>
          <p className="text-sm mb-6">로그인하여 서비스를 이용하세요.</p>
          <div className="flex justify-end gap-2">
            <Button
              variant="white"
              size="small"
              onClick={onLogin}
            >
              로그인
            </Button>
            <Button
              variant="white"
              size="small"
              onClick={onRegister}
            >
              회원가입
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileCard;
