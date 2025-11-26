import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Chatbot } from '../../../types/admin/chatbot';
import Button from '../../../components/common/Button';
import PageHeader from '../../../components/common/PageHeader';
import ChatbotTable from '../../../components/admin/chatbot/ChatbotList/ChatbotTable';
import { ROUTES } from '../../../constants/routes';
import { useGetChatbots, useUpdateChatbot } from '../../../hooks/chatbot/useChatbot';
import { ChatbotListProvider } from '../../../contexts/ChatbotListContext';

function ChatbotListPage() {
  const navigate = useNavigate();
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);

  const { getChatbots, isLoading: isLoadingList } = useGetChatbots();
  const { updateChatbot, isLoading: isUpdating } = useUpdateChatbot();

  useEffect(() => {
    loadChatbots();
  }, []);

  const loadChatbots = async () => {
    const data = await getChatbots();
    if (data && data.chatbots) {
      setChatbots(data.chatbots);
    } else {
      setChatbots([]);
    }
  };

  const handleCreateChatbot = () => {
    navigate(ROUTES.ADMIN.CHATBOT_CREATE);
  };

  const handleTogglePublic = async (chatbotId: string, isPublic: boolean) => {
    const updatedChatbot = await updateChatbot(chatbotId, { is_public: !isPublic });

    if (updatedChatbot) {
      await loadChatbots();
    } else {
      alert('공개 상태 변경에 실패했습니다.');
    }
  };

  return (
    <>
      <main className="flex-1 p-8">
        <div className="flex justify-between items-start mb-6">
          <PageHeader title="챗봇 리스트" />
          <Button variant="outline" onClick={handleCreateChatbot}>
            챗봇 생성
          </Button>
        </div>

        {isLoadingList ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        ) : (
          <ChatbotListProvider
            onTogglePublic={handleTogglePublic}
            isUpdating={isUpdating}
          >
            <ChatbotTable chatbots={chatbots} />
          </ChatbotListProvider>
        )}
      </main>
    </>
  );
}

export default ChatbotListPage;
