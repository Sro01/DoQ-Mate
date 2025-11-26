import { useState, useEffect } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import Button from '../../../components/common/Button';
import PasswordInput from '../../../components/common/PasswordInput';
import { useGetMe, useChangePassword } from '../../../hooks/auth/useAuth';

function ProfileSettingsPage() {
  const [profileData, setProfileData] = useState({
    admin_id: '',
    username: '',
    name: '',
    created_at: '',
    last_login_at: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState<{ [key: string]: string }>({});

  const { getMe } = useGetMe();
  const { changePassword, isLoading: isPasswordLoading } = useChangePassword();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    const data = await getMe();
    if (data) {
      setProfileData({
        admin_id: data.admin_id,
        username: data.username,
        name: data.name,
        created_at: data.created_at || '',
        last_login_at: data.last_login_at || '',
      });
    }
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePasswordChangeClick = () => {
    setIsChangingPassword(true);
    setPasswordData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordErrors({});
  };

  const handlePasswordCancel = () => {
    setIsChangingPassword(false);
    setPasswordData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordErrors({});
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordSubmit = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!passwordData.oldPassword) {
      newErrors.oldPassword = '현재 비밀번호를 입력해주세요';
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요';
    } else if (passwordData.newPassword.length < 4) {
      newErrors.newPassword = '비밀번호는 4자 이상이어야 합니다';
    }
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = '새 비밀번호 확인을 입력해주세요';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }

    if (Object.keys(newErrors).length > 0) {
      setPasswordErrors(newErrors);
      return;
    }

    const success = await changePassword(passwordData.oldPassword, passwordData.newPassword);

    if (success) {
      alert('비밀번호가 성공적으로 변경되었습니다.');
      handlePasswordCancel();
    } else {
      setPasswordErrors({ oldPassword: '비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.' });
    }
  };

  if (isLoading) {
    return (
      <main className="flex-1 p-8">
        <PageHeader title="프로필 설정" />
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8">
      <PageHeader title="프로필 설정" />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        <div className="space-y-6">
          {/* 관리자 ID */}
          {/* <div className="flex items-center">
            <label className="w-32 text-sm font-semibold text-gray-700">관리자 ID</label>
            <div className="flex-1">
              <p className="text-gray-900">{profileData.admin_id}</p>
            </div>
          </div> */}

          {/* 아이디 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-semibold text-gray-700">아이디</label>
            <div className="flex-1">
              <p className="text-gray-900">{profileData.username}</p>
            </div>
          </div>

          {/* 이름 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-semibold text-gray-700">이름</label>
            <div className="flex-1">
              <p className="text-gray-900">{profileData.name}</p>
            </div>
          </div>

          {/* 비밀번호 */}
          {!isChangingPassword ? (
            <div className="flex items-center">
              <label className="w-32 text-sm font-semibold text-gray-700">비밀번호</label>
              <div className="flex-1 flex items-center gap-3">
                <p className="text-gray-900">••••••••</p>
                <Button size="small" variant="outline" onClick={handlePasswordChangeClick}>
                  비밀번호 변경
                </Button>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">비밀번호 변경</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  현재 비밀번호
                </label>
                <PasswordInput
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordInputChange}
                  error={passwordErrors.oldPassword}
                  placeholder="현재 비밀번호를 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  새 비밀번호
                </label>
                <PasswordInput
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInputChange}
                  error={passwordErrors.newPassword}
                  placeholder="새 비밀번호를 입력하세요 (4자 이상)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  새 비밀번호 확인
                </label>
                <PasswordInput
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordInputChange}
                  error={passwordErrors.confirmPassword}
                  placeholder="새 비밀번호를 다시 입력하세요"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="primary"
                  onClick={handlePasswordSubmit}
                  disabled={isPasswordLoading}
                >
                  {isPasswordLoading ? '변경 중...' : '변경하기'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handlePasswordCancel}
                  disabled={isPasswordLoading}
                >
                  취소
                </Button>
              </div>
            </div>
          )}

          {/* 가입 일시 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-semibold text-gray-700">가입 일시</label>
            <div className="flex-1">
              <p className="text-gray-900">{formatDate(profileData.created_at)}</p>
            </div>
          </div>

          {/* 마지막 로그인 */}
          <div className="flex items-center">
            <label className="w-32 text-sm font-semibold text-gray-700">마지막 로그인</label>
            <div className="flex-1">
              <p className="text-gray-900">{formatDate(profileData.last_login_at)}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfileSettingsPage;
