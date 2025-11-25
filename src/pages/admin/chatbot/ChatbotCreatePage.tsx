import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Textarea from '../../../components/common/Textarea';
import ToggleSwitch from '../../../components/common/ToggleSwitch';
import Button from '../../../components/common/Button';
import PageHeader from '../../../components/common/PageHeader';
import { ROUTES } from '../../../constants/routes';
import { apiClient } from '../../../api/client';
import type { CreateChatbotRequest, Chatbot } from '../../../types/admin/chatbot';
import type { ApiResponse } from '../../../types/api';

function ChatbotCreatePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateChatbotRequest>({
    name: '',
    description: '',
    is_public: true,
    tag: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleToggleChange = (value: boolean) => {
    setFormData((prev) => ({ ...prev, is_public: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = '챗봇 이름을 입력해주세요.';
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
      const response = await apiClient.post<ApiResponse<Chatbot>>(
        '/api/set/chatbots',
        formData
      );

      if (response.data.success && response.data.data) {
        alert('챗봇이 생성되었습니다.');
        navigate(ROUTES.ADMIN.CHATBOT_LIST);
      } else {
        throw new Error('챗봇 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('챗봇 생성 에러:', error);
      alert('챗봇 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.ADMIN.CHATBOT_LIST);
  };

  return (
    <main className="flex-1 p-8">
      <PageHeader title="챗봇 생성" />

      <div className="max-w-3xl mx-auto">
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <h2 className="text-lg font-semibold text-gray-900">기본 정보</h2>
              </div>

              <Input
                label="챗봇 이름"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                placeholder="예: 사내 매뉴얼 챗봇"
                required
              />

              <Textarea
                label="설명"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="챗봇에 대한 설명을 입력하세요"
                rows={1}
              />
            </div>

            {/* Settings Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <h2 className="text-lg font-semibold text-gray-900">설정</h2>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-900 block mb-1">
                      공개 여부
                    </label>
                    <p className="text-xs text-gray-500">
                      {formData.is_public
                        ? '모든 사용자가 이 챗봇을 사용할 수 있습니다'
                        : '관리자만 이 챗봇을 사용할 수 있습니다'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span
                      className={`text-sm font-medium ${
                        formData.is_public ? 'text-blue-600' : 'text-gray-500'
                      }`}
                    >
                      {formData.is_public ? '공개' : '비공개'}
                    </span>
                    <ToggleSwitch
                      checked={formData.is_public ?? true}
                      onChange={handleToggleChange}
                    />
                  </div>
                </div>
              </div>

              <Input
                label="태그"
                name="tag"
                type="text"
                value={formData.tag || ''}
                onChange={handleInputChange}
                placeholder="예: 고객지원, 사내용"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? '생성 중...' : '챗봇 생성'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ChatbotCreatePage;
