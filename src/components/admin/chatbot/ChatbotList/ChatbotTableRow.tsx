import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Chatbot } from '../../../../types/admin/chatbot';
import ToggleSwitch from '../../../common/ToggleSwitch';
import Modal from '../../../common/Modal';
import { useChatbotListContext } from '../../../../contexts/ChatbotListContext';

interface ChatbotTableRowProps {
  chatbot: Chatbot;
  index: number;
}

function ChatbotTableRow({
  chatbot,
  index
}: ChatbotTableRowProps) {
  const { onTogglePublic, isUpdating } = useChatbotListContext();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingPublicState, setPendingPublicState] = useState(false);

  const handleToggleClick = (newState: boolean) => {
    setPendingPublicState(newState);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    onTogglePublic(chatbot.chatbot_id, chatbot.is_public);
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const handleRowClick = () => {
    navigate(`/admin/chatbot/${chatbot.chatbot_id}/manual`);
  };

  return (
    <>
      <tr
        className="border-b border-gray-100 hover:bg-blue-50/30 transition-all duration-200 hover:cursor-pointer"
        onClick={handleRowClick}
      >
        <td className="px-6 py-5 text-center text-gray-600 font-medium whitespace-nowrap">{index + 1}</td>
        <td className="px-6 py-5 text-center text-gray-800 font-semibold max-w-[150px] truncate" title={chatbot.name}>
          {chatbot.name}
        </td>
        <td className="px-6 py-5 text-center text-gray-600 max-w-[100px] truncate" title={chatbot.tag || ''}>
          {chatbot.tag || <span className="text-gray-400">-</span>}
        </td>
        <td className="px-6 py-5 text-center text-gray-600 max-w-[200px] truncate" title={chatbot.description || ''}>
          {chatbot.description || <span className="text-gray-400">-</span>}
        </td>
        <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-center gap-2">
            <ToggleSwitch
              checked={chatbot.is_public}
              onChange={handleToggleClick}
              disabled={isUpdating}
            />
            <span className={`w-12 text-left ${chatbot.is_public ? 'text-green-600' : 'text-gray-500'} ${isUpdating ? 'opacity-50' : ''}`}>
              {isUpdating ? '처리중...' : (chatbot.is_public ? '공개' : '비공개')}
            </span>
          </div>
        </td>
      </tr>

      <Modal
        isOpen={showConfirmModal}
        title="공개 상태 변경"
        message={`해당 챗봇을 ${pendingPublicState ? '공개' : '비공개'}로 전환합니다.`}
        confirmText="확인"
        cancelText="취소"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}

export default ChatbotTableRow;
