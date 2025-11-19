export interface Chatbot {
  chatbot_id: string;
  name: string;
  description?: string;
  is_public: boolean;
}

export type ChatbotListResponse = Chatbot[];
