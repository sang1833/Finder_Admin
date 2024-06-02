export interface IConversationSummary {
  conversationId: number;
  userId: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  userName: string;
}

export interface IConversations {
  conversations: IConversationSummary[];
}
