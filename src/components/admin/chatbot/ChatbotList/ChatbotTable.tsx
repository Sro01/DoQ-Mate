import type { Chatbot } from '../../../../types/admin/chatbot';
import ChatbotTableRow from './ChatbotTableRow';

interface ChatbotTableProps {
  chatbots: Chatbot[];
}

function ChatbotTable({ chatbots }: ChatbotTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full table-fixed">
        <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
          <tr>
            <th className="px-6 py-4 text-center font-bold text-black-700 w-20">
              ID
            </th>
            <th className="px-6 py-4 text-center font-bold text-black-700 w-48">
              챗봇 명칭
            </th>
            <th className="px-6 py-4 text-center font-bold text-black-700 w-32">
              태그
            </th>
            <th className="px-6 py-4 text-center font-bold text-black-700">
              설명
            </th>
            <th className="px-6 py-4 text-center font-bold text-black-700 w-40">
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
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ChatbotTable;
