import type { Chatbot } from '../../../../types/admin/chatbot';
import ChatbotActions from './ChatbotActions';

interface ChatbotTableRowProps {
  chatbot: Chatbot;
  index: number;
  onAddManual?: (chatbotId: string) => void;
  onEditManual?: (chatbotId: string) => void;
  onDeleteManual?: (chatbotId: string) => void;
}

function ChatbotTableRow({
  chatbot,
  index,
  onAddManual,
  onEditManual,
  onDeleteManual
}: ChatbotTableRowProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-blue-50/30 transition-all duration-200 hover:cursor-pointer">
      <td className="px-6 py-5 text-center text-gray-600 font-medium">{index + 1}</td>
      <td className="px-6 py-5 text-center text-gray-800 font-semibold">
        {chatbot.name}
      </td>
      <td className="px-6 py-5 text-center text-gray-600">
        {chatbot.description || <span className="text-gray-400">-</span>}
      </td>
      <td className="px-6 py-5">
        <ChatbotActions
          chatbotId={chatbot.chatbot_id}
          hasManual={!!chatbot.description}
          onAddManual={onAddManual}
          onEditManual={onEditManual}
          onDeleteManual={onDeleteManual}
        />
      </td>
    </tr>
  );
}

export default ChatbotTableRow;
