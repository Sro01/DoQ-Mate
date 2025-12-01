import { SquarePen } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useChatContext } from '../../contexts/ChatContext';
import { updateSessionTitle, togglePinSession } from '../../utils/chatStorage';
import ChatListItem from './ChatListItem';
import { ROUTES } from '../../constants/routes';
import TextLink from '../common/TextLink';
import { isAuthenticated } from '../../utils/permissions';
import { clearAuthData } from '../../utils/authStorage';

interface NewChatButtonProps {
  isCollapsed: boolean;
  onClick: () => void;
}

function NewChatButton({ isCollapsed, onClick }: NewChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center py-3 text-left transition-all duration-200 rounded-lg ${
        isCollapsed ? 'justify-center' : 'gap-3 px-4'
      } text-gray-700 hover:bg-blue-50`}
      title={isCollapsed ? '새 채팅' : undefined}
    >
      <SquarePen size={20} className="text-gray-600" />
      {!isCollapsed && <span className="font-medium whitespace-nowrap">새 채팅</span>}
    </button>
  );
}

interface ChatSidebarContentProps {
  isCollapsed: boolean;
}

function ChatSidebarContent({
  isCollapsed,
}: ChatSidebarContentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    chatHistories,
    currentSessionId,
    deleteChat,
    refreshChatHistories,
  } = useChatContext();

  const handleNewChat = () => {
    // 홈으로 이동 (새 채팅 시작 화면)
    navigate(ROUTES.HOME);
  };

  const handleChatSelect = (sessionId: string) => {
    // 해당 세션 URL로 이동
    navigate(ROUTES.CHAT(sessionId));
  };

  const handleRename = (sessionId: string, newTitle: string) => {
    updateSessionTitle(sessionId, newTitle);
    refreshChatHistories();
  };

  const handleDelete = (sessionId: string) => {
    if (window.confirm('이 채팅을 삭제하시겠습니까?')) {
      deleteChat(sessionId);
    }
  };

  const handlePin = (sessionId: string) => {
    togglePinSession(sessionId);
    refreshChatHistories();
  };

  const handleLogout = () => {
    clearAuthData();
    navigate(ROUTES.HOME);
  };

  const sortedChats = [...chatHistories].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <>
      <NewChatButton isCollapsed={isCollapsed} onClick={handleNewChat} />

      <nav className="mt-6 flex-1 overflow-y-auto">
        <div className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {!isCollapsed && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 px-2 mb-3">최근 채팅</h3>
              {sortedChats.length === 0 ? (
                <p className="text-sm text-gray-400 px-2 py-4 text-center">
                  채팅 기록이 없습니다
                </p>
              ) : (
                sortedChats.map((chat) => {
                  const lastMessage = chat.messages.length > 0
                    ? chat.messages[chat.messages.length - 1].content
                    : '';

                  return (
                    <ChatListItem
                      key={chat.session_id}
                      title={chat.title}
                      lastMessage={lastMessage}
                      isSelected={currentSessionId === chat.session_id}
                      isPinned={chat.isPinned}
                      onClick={() => handleChatSelect(chat.session_id)}
                      onPin={() => handlePin(chat.session_id)}
                      onRename={(newTitle) => handleRename(chat.session_id, newTitle)}
                      onDelete={() => handleDelete(chat.session_id)}
                    />
                  );
                })
              )}
            </div>
          )}
        </div>
      </nav>

      <div className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {!isCollapsed && (
          <div className="px-4 py-2 border-t border-gray-200">
            {isAuthenticated() ? (
              <TextLink
                color="blue"
                onClick={handleLogout}
              >
                관리자 로그아웃
              </TextLink>
            ) : (
              <TextLink
                color="blue"
                onClick={() => navigate(ROUTES.AUTH.LOGIN, { state: { from: location } })}
              >
                관리자 로그인
              </TextLink>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ChatSidebarContent;
