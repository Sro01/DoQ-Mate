import { useState } from 'react';
import { apiClient } from '../../api/client';
import type { ApiResponse } from '../../types/api';
import type { ChatResponse } from '../../types/chat';

/**
 * 사용자 메시지를 전송하고 봇 응답을 받아오는 커스텀 훅
 */
export function usePostUserMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postUserMessage = async (
    question: string,
    chatbotId: string,
    sessionId: string
  ): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<ApiResponse<ChatResponse>>(
        '/api/chats',
        {
          question,
          chatbot_id: chatbotId,
          session_id: sessionId,
        }
      );

      if (!response.data.success || !response.data.data) {
        throw new Error('API 응답이 실패했습니다.');
      }

      return response.data.data.answer;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('메시지 전송 실패:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    postUserMessage,
    isLoading,
    error,
  };
}
