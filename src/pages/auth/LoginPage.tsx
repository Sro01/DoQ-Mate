import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import PasswordInput from '../../components/common/PasswordInput';
import TextLink from '../../components/common/TextLink';
import AuthPageLayout from '../../layouts/AuthPageLayout';
import { ROUTES } from '../../constants/routes';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username) {
      newErrors.username = '아이디를 입력해주세요';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: API 호출 (POST /api/auth/login)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: 로그인 성공 시 토큰 저장 및 페이지 이동
      navigate(ROUTES.ADMIN.CHATBOT_LIST);
    } catch (error) {
      setErrors({ username: '아이디 또는 비밀번호가 올바르지 않습니다' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageLayout
      title="로그인"
      subtitle="DoQ-Mate 관리자 시스템"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 아이디 */}
        <Input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          label="아이디"
          error={errors.username}
          placeholder="아이디 입력"
          required
        />

        {/* 비밀번호 */}
        <PasswordInput
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          label="비밀번호"
          error={errors.password}
          placeholder="비밀번호 입력"
          required
        />

        {/* 로그인 버튼 */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </Button>
        </div>

        {/* 회원가입 안내 */}
        <div className="text-center text-sm text-gray-600 pt-2">
          계정이 없으신가요?{' '}
          <TextLink color="blue" onClick={() => navigate(ROUTES.AUTH.SIGNUP)}>
            회원가입 하기
          </TextLink>
        </div>

        {/* 아이디/비밀번호 찾기 */}
        <div className="flex justify-center gap-3 text-sm text-gray-600 pt-2">
          <TextLink onClick={() => navigate(ROUTES.AUTH.FIND_USERNAME)}>
            아이디 찾기
          </TextLink>
          <span className="text-gray-400">|</span>
          <TextLink onClick={() => navigate(ROUTES.AUTH.RESET_PASSWORD)}>
            비밀번호 찾기
          </TextLink>
        </div>
      </form>
    </AuthPageLayout>
  );
}

export default LoginPage;
