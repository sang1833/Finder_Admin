export interface IPropData {
  conversationId: number;
  userId: number;
  avatar: string;
  displayName: string;
}

export interface IConversationSummary {
  conversationId: number;
  userId: number;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  userName: string;
  unreadCount: number;
  onClick: (props: IPropData) => void;
}

export interface IConversations {
  conversations: IConversationSummary[];
  onClickChildren: (props: IPropData) => void;
}
