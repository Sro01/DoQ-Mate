import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Chatbot } from '../../../types/admin/chatbot';
import Button from '../../../components/common/Button';
import ChatbotTable from '../../../components/admin/chatbot/ChatbotList/ChatbotTable';

function ChatbotListPage() {
  const navigate = useNavigate();

  // 임시 데이터 (나중에 API 호출로 대체)
  const [chatbots] = useState<Chatbot[]>([
    {
      chatbot_id: 'bot_0001',
      name: '소비자 메뉴얼 챗봇',
      description: '',
      is_public: true
    },
    {
      chatbot_id: 'bot_0002',
      name: '농가 메뉴얼 챗봇',
      description: '테스트 바로가기',
      is_public: false
    }
  ]);

  const handleCreateChatbot = () => {
    navigate('/chatbot/create');
  };

  const handleAddManual = (chatbotId: string) => {
    console.log('메뉴얼 추가:', chatbotId);
    // TODO: 메뉴얼 추가 로직
  };

  const handleEditManual = (chatbotId: string) => {
    console.log('메뉴얼 수정:', chatbotId);
    // TODO: 메뉴얼 수정 로직
  };

  const handleDeleteManual = (chatbotId: string) => {
    console.log('메뉴얼 삭제:', chatbotId);
    // TODO: 메뉴얼 삭제 확인 모달 + 삭제 로직
  };

  return (
    <>
      <main className="flex-1 p-8">
        <div className="flex justify-end mb-4">
          <Button variant="secondary" onClick={handleCreateChatbot}>
            챗봇 생성
          </Button>
        </div>

        <ChatbotTable
          chatbots={chatbots}
          onAddManual={handleAddManual}
          onEditManual={handleEditManual}
          onDeleteManual={handleDeleteManual}
        />
      </main>
    </>
  );
}

export default ChatbotListPage;
