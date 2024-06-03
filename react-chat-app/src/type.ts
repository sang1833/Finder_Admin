//* PROPS
export interface IShowDetailConversationFnProps {
  conversationId: number;
  userId: number;
  avatar: string;
  displayName: string;
}

export interface IChatMessageProps {
  id: number;
  createdDate: string;
  isEdited: boolean;
  message: string;
  senderId: number;
  currentUserId: number;
}

export interface IChatSectionProps {
  startTime: string;
  children: React.ReactNode;
}

export interface IChatClusMessageProps {
  senderId: number;
  currentUserId: number;
  avatar?: string;
  children: React.ReactNode;
}

export interface IMessageBadgeProps {
  unreadCount: number;
}

//* Data
export interface IConversationSummary {
  conversationId: number;
  userId: number;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  userName: string;
  unreadCount: number;
  onClick: (props: IShowDetailConversationFnProps) => void;
}

export interface IConversations {
  conversations: IConversationSummary[];
  onClickChildren: (props: IShowDetailConversationFnProps) => void;
}

export interface IMessage {
  id: number;
  createdDate: string;
  isEdited: boolean;
  message: string;
}

export interface IClusMessage {
  id: number;
  createdDate: string;
  senderId: number;
  messages: IMessage[];
}

export interface ISection {
  id: number;
  createdDate: string;
  clusMessages: IClusMessage[];
}

export interface IUserPartner {
  id?: number;
  displayName?: string;
  avatar?: string;
}
