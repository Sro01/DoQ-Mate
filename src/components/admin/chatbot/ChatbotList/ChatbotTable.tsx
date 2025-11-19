import type { Chatbot } from '../../../../types/admin/chatbot';
import ChatbotTableRow from './ChatbotTableRow';

interface ChatbotTableProps {
  chatbots: Chatbot[];
  onAddManual?: (chatbotId: string) => void;
  onEditManual?: (chatbotId: string) => void;
  onDeleteManual?: (chatbotId: string) => void;
}

function ChatbotTable({
  chatbots,
  onAddManual,
  onEditManual,
  onDeleteManual
}: ChatbotTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
          <tr>
            <th className="px-6 py-4 text-center font-bold text-black-700">
              ID
            </th>
            <th className="px-6 py-4 text-center font-bold text-black-700">
              챗봇 명칭
            </th>
            <th className="px-6 py-4 text-center font-bold text-black-700">
              메뉴얼
            </th>
            <th className="px-6 py-4 text-center font-bold text-black-700">
              상태
            </th>
          </tr>
        </thead>
        <tbody>
          {chatbots.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                등록된 챗봇이 없습니다.
              </td>
            </tr>
          ) : (
            chatbots.map((chatbot, index) => (
              <ChatbotTableRow
                key={chatbot.chatbot_id}
                chatbot={chatbot}
                index={index}
                onAddManual={onAddManual}
                onEditManual={onEditManual}
                onDeleteManual={onDeleteManual}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ChatbotTable;
